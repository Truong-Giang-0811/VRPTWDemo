import { useState } from "react";
import Icon from "../ui/Icon";

function getIds(route) {
  return route?.customer_ids || route?.customers || route?.sequence || [];
}

function getDistance(route) {
  const n = Number(route?.distance_km);
  return Number.isFinite(n) ? `${n.toFixed(2)} km` : "";
}

function getDuration(route) {
  const n = Number(route?.duration_min);
  return Number.isFinite(n) ? `${Math.round(n)} phút` : "";
}

export default function RouteMenu({ result, selectedRouteIndex, onSelectRoute }) {
  const [collapsed, setCollapsed] = useState(false);
  if (!result?.routes?.length) return null;

  return (
    <div className="route-menu">
      <div className="route-menu-heading">
        <button
          type="button"
          className="route-menu-toggle"
          onClick={() => setCollapsed((value) => !value)}
          title={collapsed ? "Mở danh sách tuyến" : "Thu gọn danh sách tuyến"}
        >
          <span className="route-menu-title">
            <Icon name="route" size={14} />
            Tuyến đường
          </span>

          <span className="route-menu-count">
            {result.routes.length} xe
          </span>

          <Icon
            name="chevron"
            size={13}
            className={collapsed ? "collapsed" : ""}
          />
        </button>
      </div>

      {!collapsed && (
        <>
          <div className="route-menu-list">
            {result.routes.map((route, index) => {
              const ids = getIds(route);
              const selected = selectedRouteIndex === index;
              const meta = [getDistance(route), getDuration(route)]
                .filter(Boolean)
                .join(" · ");

              return (
                <button
                  type="button"
                  key={index}
                  className={`route-menu-row ${selected ? "active" : ""}`}
                  onClick={() => onSelectRoute?.(index)}
                  title={`Xem tuyến Xe ${index + 1} trên bản đồ`}
                >
                  <span className="route-menu-vehicle">
                    <span className="route-menu-dot">{index + 1}</span>
                    <span>Xe {index + 1}</span>
                  </span>

                  <span className="route-menu-sequence">
                    <b>D</b>

                    {ids.map((id, stopIndex) => (
                      <span
                        className="route-menu-stop-group"
                        key={`${id}-${stopIndex}`}
                      >
                        <span className="route-menu-arrow">→</span>

                        <span className="route-menu-stop">
                          <span className="route-menu-order">
                            {stopIndex + 1}
                          </span>
                          <span>{id}</span>
                        </span>
                      </span>
                    ))}

                    <span className="route-menu-arrow">→</span>
                    <b>D</b>
                  </span>

                  {meta && (
                    <span className="route-menu-meta">
                      {meta}
                    </span>
                  )}

                  <Icon
                    name={selected ? "eye" : "chevron"}
                    size={13}
                  />
                </button>
              );
            })}
          </div>

          <div className="route-menu-hint">
            <Icon name="info" size={12} />
            <span>
              Số trong tuyến là thứ tự khách hàng xe sẽ phục vụ.
            </span>
          </div>
        </>
      )}

      <div className="route-menu-hint">
        <Icon name="info" size={12} />
        <span>Số trong tuyến là thứ tự khách hàng xe sẽ phục vụ.</span>
      </div>
    </div>
  );
}
