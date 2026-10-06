import { useState } from "react";
import Icon from "../ui/Icon";

const COLORS = ["#2563eb", "#16a34a", "#dc2626", "#ca8a04", "#7c3aed", "#0891b2"];

function normalizeIds(route) {
  return route.customer_ids || route.customers || route.sequence || [];
}

export default function RouteTable({ result, selectedRouteIndex, onSelectRoute }) {
  const [collapsed, setCollapsed] = useState(false); // ẩn/hiện cả danh sách
  const [showAll, setShowAll] = useState(false); // false: khung cuộn gọn, true: hiện đủ
  if (!result?.routes?.length) return null;

  return (
    <section className="route-card">
      <div className="route-card-title">
        <div>
          <div className="eyebrow">THỨ TỰ PHỤC VỤ</div>
          <h3>
            Xe sẽ đi đâu trước?
            <span className="route-count-chip">{result.routes.length} xe</span>
          </h3>
        </div>
        <div className="route-card-actions">
          {!collapsed && result.routes.length > 3 && (
            <button type="button" className="route-toggle-btn" onClick={() => setShowAll((v) => !v)}>
              {showAll ? "Thu nhỏ khung" : "Xem đầy đủ"}
            </button>
          )}
          <button
            type="button"
            className="route-toggle-btn primary"
            onClick={() => setCollapsed((v) => !v)}
            aria-expanded={!collapsed}
          >
            {collapsed ? "Mở rộng" : "Thu gọn"}
            <Icon name="chevron" size={13} className={collapsed ? "chev-down" : "chev-up"} />
          </button>
        </div>
      </div>

      {!collapsed && (
        <div className="route-help">
          <Icon name="info" size={13} />
          <span>Chọn một xe để làm nổi bật tuyến và xem thứ tự khách hàng trên bản đồ.</span>
        </div>
      )}

      {!collapsed && (
        <div className={`route-list ${showAll ? "expanded" : "scrollable"}`}>
          {result.routes.map((route, idx) => {
            const ids = normalizeIds(route);
            const selected = selectedRouteIndex === idx;
            const color = COLORS[idx % COLORS.length];
            const waitingLabel = route.waiting_time_min != null ? ` · chờ ${Math.round(route.waiting_time_min)} phút` : "";
            const clusterLabel = route.cluster_id != null ? ` · cụm ${Number(route.cluster_id) + 1}` : "";

            return (
              <button
                type="button"
                className={`route-item route-item-button ${selected ? "selected" : ""}`}
                key={idx}
                onClick={() => onSelectRoute?.(idx)}
                title={`Xem tuyến xe ${idx + 1}`}
              >
                <span className="route-color" style={{ "--route-color": color }} />
                <span className="route-info">
                  <strong>Xe {idx + 1}</strong>
                  <span>
                    {ids.length} điểm · {route.distance_km ?? "—"} km
                    {route.duration_min != null ? ` · ${route.duration_min} phút` : ""}
                    {waitingLabel}
                    {clusterLabel}
                  </span>
                </span>

                <span className="route-sequence">
                  <span className="route-stop depot-stop">D</span>
                  {ids.length ? (
                    ids.map((id, stopIndex) => (
                      <span className="route-sequence-group" key={`${id}-${stopIndex}`}>
                        <span className="route-arrow">→</span>
                        <span className="route-stop">
                          <b>{stopIndex + 1}</b>
                          <small>KH {id}</small>
                        </span>
                      </span>
                    ))
                  ) : (
                    <span className="route-arrow">→</span>
                  )}
                  <span className="route-arrow">→</span>
                  <span className="route-stop depot-stop">D</span>
                </span>

                <span className="route-view-icon">
                  <Icon name={selected ? "eye" : "chevron"} size={15} />
                </span>
              </button>
            );
          })}
        </div>
      )}
    </section>
  );
}
