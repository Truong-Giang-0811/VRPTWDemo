import { useMemo, useRef, useState } from "react";
import MapView from "./components/map/MapView";
import RoutePolyline from "./components/map/RoutePolyline";
import AddressSearch from "./components/map/AddressSearch";
import DepotForm from "./components/forms/DepotForm";
import VehicleForm from "./components/forms/VehicleForm";
import CustomerForm from "./components/forms/CustomerForm";
import CustomerList from "./components/forms/CustomerList";
import RouteSummary from "./components/results/RouteSummary";
import RouteTable from "./components/results/RouteTable";
import Icon from "./components/ui/Icon";
import { useCustomers } from "./state/useCustomers";
import { useOptimizeResult } from "./state/useOptimizeResult";
import { DEMO_PRESETS, clonePreset } from "./data/presets";

function buildClusterMap(result) {
  const map = {};
  if (!result) return map;

  if (result.customer_cluster_map && typeof result.customer_cluster_map === "object") {
    for (const [key, value] of Object.entries(result.customer_cluster_map)) {
      map[Number(key)] = Number(value);
    }
  }

  if (Array.isArray(result.clusters)) {
    for (const cluster of result.clusters) {
      const clusterId = Number(cluster.cluster_id);
      for (const customerId of cluster.customer_ids || []) {
        map[Number(customerId)] = clusterId;
      }
    }
  }

  return map;
}

function formatModeLabel(mode) {
  if (mode === "spatiotemporal") return "Khoảng cách + thời gian";
  if (mode === "distance") return "Khoảng cách";
  return mode || "—";
}

function ResultColumn({ title, depot, customers, result, selectedRouteIndex, onSelectRoute, clusterMap, readOnly = false }) {
  return (
    <section className="compare-column">
      <div className="compare-column-header">
        <div>
          <div className="eyebrow">SO SÁNH</div>
          <h3>{title}</h3>
        </div>
        {result && (
          <span className="compare-badge">
            <Icon name="route" size={13} /> {formatModeLabel(result.clustering_mode)}
          </span>
        )}
      </div>

      {result ? (
        <>
          <RouteSummary result={result} title={title} modeLabel={result.clustering_mode_label} />
          <div className="compare-map-wrap">
            <MapView
              depot={depot}
              customers={customers}
              pendingLatLng={null}
              onMapClick={() => {}}
              target={null}
              interactionMode={readOnly ? "pan" : "addCustomer"}
              selectedRoute={selectedRouteIndex != null ? result.routes?.[selectedRouteIndex] : null}
              customerClusterMap={clusterMap}
            >
              <RoutePolyline
                routes={result.routes}
                selectedRouteIndex={selectedRouteIndex}
                onSelectRoute={onSelectRoute}
              />
            </MapView>
          </div>
          <RouteTable
            result={result}
            selectedRouteIndex={selectedRouteIndex}
            onSelectRoute={onSelectRoute}
          />
        </>
      ) : (
        <div className="empty-state-card">
          <strong>Chưa có kết quả</strong>
          <span>Nhấn nút tối ưu để xem hai phương án đặt cạnh nhau.</span>
        </div>
      )}
    </section>
  );
}

export default function App() {
  const [depot, setDepot] = useState(null);
  const [vehicle, setVehicle] = useState({ number: 3, capacity: 100 });
  const [pendingLatLng, setPendingLatLng] = useState(null);
  const [mapTarget, setMapTarget] = useState(null);
  const [interactionMode, setInteractionMode] = useState("addCustomer");
  const [selectedRouteIndex, setSelectedRouteIndex] = useState(null);
  const [selectedDistanceRouteIndex, setSelectedDistanceRouteIndex] = useState(null);
  const [selectedSpatiotemporalRouteIndex, setSelectedSpatiotemporalRouteIndex] = useState(null);
  const [selectedPresetId, setSelectedPresetId] = useState("");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [viewMode, setViewMode] = useState("compare");
  const [timeWeight, setTimeWeight] = useState(0.35);
  const workspaceRef = useRef(null);
  const { customers, addCustomer, removeCustomer, clearCustomers, setCustomers } = useCustomers();
  const { result, comparisonResult, loading, error, runOptimize, runComparison, clearResult } = useOptimizeResult();

  const totalDemand = useMemo(() => customers.reduce((sum, c) => sum + Number(c.demand || 0), 0), [customers]);
  const isReady = Boolean(depot && customers.length && vehicle.number && vehicle.capacity);

  const singleClusterMap = useMemo(() => buildClusterMap(result), [result]);
  const distanceClusterMap = useMemo(() => buildClusterMap(comparisonResult?.distance_based), [comparisonResult]);
  const spatioClusterMap = useMemo(() => buildClusterMap(comparisonResult?.spatiotemporal_based), [comparisonResult]);

  function handleMapClick(latlng) {
    setMapTarget(latlng);
    if (interactionMode === "setDepot" || !depot) {
      setDepot({ lat: latlng.lat, lng: latlng.lng, open_time: "08:00", close_time: "18:00" });
      setInteractionMode("addCustomer");
      setPendingLatLng(null);
    } else if (interactionMode === "addCustomer") {
      setPendingLatLng(latlng);
    }
  }

  function handleAddressSelect(location) {
    setMapTarget(location);
    if (interactionMode === "setDepot" || !depot) {
      setDepot({ ...location, open_time: "08:00", close_time: "18:00" });
      setInteractionMode("addCustomer");
    } else {
      setPendingLatLng(location);
    }
  }

  function handleAddCustomer(customer) {
    addCustomer(customer);
    clearResult();
    setSelectedRouteIndex(null);
    setSelectedDistanceRouteIndex(null);
    setSelectedSpatiotemporalRouteIndex(null);
    setPendingLatLng(null);
    setInteractionMode("addCustomer");
  }

  function handleOptimize() {
    if (!isReady) return;
    setSelectedRouteIndex(null);
    setSelectedDistanceRouteIndex(null);
    setSelectedSpatiotemporalRouteIndex(null);

    if (viewMode === "compare") {
      runComparison({ depot, vehicle, customers, algorithm: "GA", timeWeight });
      return;
    }

    runOptimize({ depot, vehicle, customers, algorithm: "GA", clusteringMode: viewMode, timeWeight });
  }

  function handleLoadPreset(presetId) {
    const preset = DEMO_PRESETS.find((item) => item.id === presetId);
    if (!preset) return;
    const data = clonePreset(preset);

    setDepot(data.depot);
    setCustomers(data.customers);
    if (typeof setVehicle === "function") setVehicle(data.vehicle);
    clearResult();
    setSelectedRouteIndex(null);
    setSelectedDistanceRouteIndex(null);
    setSelectedSpatiotemporalRouteIndex(null);
    setPendingLatLng(null);
    setMapTarget({ lat: data.depot.lat, lng: data.depot.lng });
    setSelectedPresetId(data.id);
    setInteractionMode("addCustomer");
  }

  function resetMap() {
    setPendingLatLng(null);
    setMapTarget(null);
    setInteractionMode(depot ? "addCustomer" : "setDepot");
  }

  function fitAllPoints() {
    const all = [depot, ...customers].filter(Boolean);
    if (all.length) setMapTarget(all[all.length - 1]);
  }

  function clearAll() {
    setDepot(null);
    clearCustomers();
    clearResult();
    setSelectedRouteIndex(null);
    setSelectedDistanceRouteIndex(null);
    setSelectedSpatiotemporalRouteIndex(null);
    setPendingLatLng(null);
    setMapTarget(null);
    setInteractionMode("setDepot");
  }

  function handleRemoveCustomer(id) {
    removeCustomer(id);
    clearResult();
    setSelectedRouteIndex(null);
    setSelectedDistanceRouteIndex(null);
    setSelectedSpatiotemporalRouteIndex(null);
  }

  const singleResult = result;
  const distanceResult = comparisonResult?.distance_based;
  const spatiotemporalResult = comparisonResult?.spatiotemporal_based;

  return (
    <div className={`app-shell ${sidebarCollapsed ? "sidebar-collapsed" : ""}`}>
      <header className="topbar">
        <div className="brand">
          <div className="brand-mark"><Icon name="route" size={21} /></div>
          <div>
            <strong>VRPTW Studio</strong>
            <span>Vehicle Routing Problem with Time Windows</span>
          </div>
        </div>
        <div className="topbar-actions">
          <span className="system-status"><i /> Demo mode</span>
          <button className="top-icon" title="Thiết lập"><Icon name="settings" /></button>
        </div>
      </header>

      <section className="preset-picker-card">
        <div className="preset-picker-icon">⚡</div>
        <div className="preset-picker-copy">
          <div className="eyebrow">DỮ LIỆU DEMO CÓ SẴN</div>
          <strong>Chọn bộ dữ liệu để chạy nhanh</strong>
          <span>Preset chỉ nạp dữ liệu mẫu; bạn vẫn có thể tự click chọn kho và thêm khách hàng trên bản đồ.</span>
        </div>
        <select
          className="preset-select"
          value={selectedPresetId}
          onChange={(e) => handleLoadPreset(e.target.value)}
          aria-label="Chọn bộ dữ liệu demo"
        >
          <option value="">Chọn dataset…</option>
          {DEMO_PRESETS.map((preset) => (
            <option key={preset.id} value={preset.id}>{preset.name}</option>
          ))}
        </select>
        {selectedPresetId && <span className="preset-loaded">✓ Đã nạp</span>}
        <button
          type="button"
          className="manual-mode-button"
          onClick={() => {
            setSelectedPresetId("");
            setPendingLatLng(null);
            setInteractionMode(depot ? "addCustomer" : "setDepot");
          }}
        >
          Tự chọn trên bản đồ
        </button>
      </section>

      <section className="analysis-controls">
        <div className="mode-switcher">
          <button type="button" className={viewMode === "distance" ? "active" : ""} onClick={() => setViewMode("distance")}>Khoảng cách</button>
          <button type="button" className={viewMode === "spatiotemporal" ? "active" : ""} onClick={() => setViewMode("spatiotemporal")}>Khoảng cách + thời gian</button>
          <button type="button" className={viewMode === "compare" ? "active" : ""} onClick={() => setViewMode("compare")}>So sánh</button>
        </div>
        {viewMode !== "distance" && (
          <label className="time-weight-control">
            <span>Trọng số thời gian</span>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={timeWeight}
              onChange={(e) => setTimeWeight(Number(e.target.value))}
            />
            <strong>{timeWeight.toFixed(2)}</strong>
          </label>
        )}
      </section>

      <main className="workspace" ref={workspaceRef}>
        <section className="map-panel">
          {viewMode === "compare" ? (
            <div className="compare-grid">
              <ResultColumn
                title="Phân cụm theo khoảng cách"
                depot={depot}
                customers={customers}
                result={distanceResult}
                selectedRouteIndex={selectedDistanceRouteIndex}
                onSelectRoute={setSelectedDistanceRouteIndex}
                clusterMap={distanceClusterMap}
                readOnly
              />
              <ResultColumn
                title="Phân cụm theo khoảng cách + thời gian"
                depot={depot}
                customers={customers}
                result={spatiotemporalResult}
                selectedRouteIndex={selectedSpatiotemporalRouteIndex}
                onSelectRoute={setSelectedSpatiotemporalRouteIndex}
                clusterMap={spatioClusterMap}
                readOnly
              />
            </div>
          ) : (
            <>
              <AddressSearch onLocationSelect={handleAddressSelect} />
              <div className="map-toolbar">
                <button className={interactionMode === "setDepot" ? "active" : ""} onClick={() => { setInteractionMode("setDepot"); setPendingLatLng(null); }}><span className="tool-icon depot"><Icon name="warehouse" size={16} /></span> Đặt kho</button>
                <button className={interactionMode === "addCustomer" ? "active" : ""} onClick={() => setInteractionMode("addCustomer")}><span className="tool-icon customer"><Icon name="plus" size={16} /></span> Thêm khách</button>
                <span className="toolbar-divider" />
                <span className="mode-hint"><Icon name="info" size={14} /> {interactionMode === "setDepot" ? "Click bản đồ để đặt kho" : pendingLatLng ? "Đã chọn vị trí · kiểm tra điểm đánh dấu" : "Click bản đồ để thêm điểm"}</span>
              </div>
              <MapView
                depot={depot}
                customers={customers}
                pendingLatLng={pendingLatLng}
                onMapClick={handleMapClick}
                target={mapTarget}
                interactionMode={interactionMode}
                onZoomToFit={fitAllPoints}
                onReset={resetMap}
                selectedRoute={selectedRouteIndex != null ? singleResult?.routes?.[selectedRouteIndex] : null}
                customerClusterMap={singleClusterMap}
              >
                <RoutePolyline
                  routes={singleResult?.routes}
                  selectedRouteIndex={selectedRouteIndex}
                  onSelectRoute={setSelectedRouteIndex}
                />
              </MapView>
              <div className="map-legend">
                <span><i className="legend-dot depot" /> Kho</span>
                <span><i className="legend-dot customer" /> Khách hàng</span>
                {singleResult?.routes?.length ? <span><i className="legend-line" /> Tuyến tối ưu</span> : null}
              </div>
              {pendingLatLng && <CustomerForm pendingLatLng={pendingLatLng} onSubmit={handleAddCustomer} onCancel={() => setPendingLatLng(null)} />}

              {singleResult && (
                <div className="single-results-stack">
                  <RouteSummary result={singleResult} />
                  <RouteTable
                    result={singleResult}
                    selectedRouteIndex={selectedRouteIndex}
                    onSelectRoute={setSelectedRouteIndex}
                  />
                </div>
              )}
            </>
          )}
        </section>

        <aside className="side-panel">
          <div className="side-header">
            <div>
              <div className="eyebrow">MÔ HÌNH VRPTW</div>
              <h1>Thiết lập bài toán</h1>
              <p>{customers.length ? `${customers.length} điểm giao · ${totalDemand} kg nhu cầu` : "Tạo kho và các điểm giao hàng để bắt đầu"}</p>
            </div>
            <button className="collapse-button" title={sidebarCollapsed ? "Mở bảng thiết lập" : "Thu gọn bảng"} onClick={() => setSidebarCollapsed((value) => !value)}><Icon name="chevron" /></button>
          </div>

          <div className="progress-strip">
            <span className={depot ? "done" : "current"}><b>1</b> Kho</span>
            <span className={vehicle ? "current" : ""}><b>2</b> Đội xe</span>
            <span className={customers.length ? "done" : ""}><b>3</b> Điểm giao</span>
            <span className={result || comparisonResult ? "done" : ""}><b>4</b> Tối ưu</span>
          </div>

          <div className="panel-scroll">
            <DepotForm depot={depot} onChange={setDepot} onClear={() => { setDepot(null); setInteractionMode("setDepot"); }} />
            <VehicleForm vehicle={vehicle} onChange={setVehicle} />
            <CustomerList customers={customers} onRemove={handleRemoveCustomer} />

            {error && <div className="error-card"><Icon name="info" size={17} /><div><strong>Không thể tối ưu</strong><span>{error}</span></div></div>}
          </div>

          <div className="action-footer">
            <div className="footer-meta"><span>{customers.length} khách</span><span>{vehicle.number} xe · {vehicle.capacity} kg/xe</span></div>
            <button className="optimize-btn" disabled={!isReady || loading} onClick={handleOptimize}><span className="play-circle"><Icon name={loading ? "refresh" : "play"} size={15} /></span>{loading ? "Đang tối ưu tuyến..." : viewMode === "compare" ? "So sánh hai phương án" : "Tối ưu tuyến đường"}</button>
            <button className="reset-link" onClick={clearAll}><Icon name="refresh" size={14} /> Làm lại mô hình</button>
          </div>
        </aside>
      </main>
    </div>
  );
}
