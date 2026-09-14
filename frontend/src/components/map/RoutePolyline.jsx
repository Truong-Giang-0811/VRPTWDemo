import { useMemo } from "react";
import { Marker, Polyline, CircleMarker, Tooltip } from "react-leaflet";
import L from "leaflet";

const COLORS = ["#2563eb", "#16a34a", "#dc2626", "#ca8a04", "#7c3aed", "#0891b2"];

function directionIcon(angle, color) {
  const svg = `
    <svg width="22" height="22" viewBox="0 0 22 22" xmlns="http://www.w3.org/2000/svg"
      style="transform:rotate(${angle}deg);filter:drop-shadow(0 1px 2px rgba(0,0,0,.25))">
      <path d="M11 2 L18 15 L11 12.5 L4 15 Z" fill="${color}" stroke="white" stroke-width="1.8" stroke-linejoin="round"/>
    </svg>
  `;
  return L.divIcon({
    className: "route-direction-arrow",
    html: svg,
    iconSize: [22, 22],
    iconAnchor: [11, 11],
  });
}

function bearing(a, b) {
  const lat1 = (a[0] * Math.PI) / 180;
  const lat2 = (b[0] * Math.PI) / 180;
  const dLng = ((b[1] - a[1]) * Math.PI) / 180;
  const y = Math.sin(dLng) * Math.cos(lat2);
  const x =
    Math.cos(lat1) * Math.sin(lat2) -
    Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLng);
  return ((Math.atan2(y, x) * 180) / Math.PI + 360) % 360;
}

function arrowPoints(geometry) {
  if (!geometry || geometry.length < 3) return [];

  // Không đặt quá dày: khoảng 1 mũi tên mỗi 8-12 điểm geometry.
  const step = Math.max(8, Math.floor(geometry.length / 9));
  const points = [];

  for (let i = step; i < geometry.length - 1; i += step) {
    const a = geometry[i - 1];
    const b = geometry[i];
    points.push({
      position: b,
      angle: bearing(a, b),
    });
  }

  return points;
}

export default function RoutePolyline({ routes, selectedRouteIndex = null, onSelectRoute }) {
  const arrowsByRoute = useMemo(
    () => (routes || []).map((route) => arrowPoints(route.geometry)),
    [routes]
  );

  if (!routes?.length) return null;

  return routes.map((route, idx) => {
    const color = COLORS[idx % COLORS.length];
    const selected = selectedRouteIndex === idx;
    const positions = route.geometry || [];

    return (
      <span key={idx}>
        <Polyline
          positions={positions}
          pathOptions={{
            color,
            weight: selected ? 7 : 4,
            opacity: selectedRouteIndex === null || selected ? 0.92 : 0.22,
            lineCap: "round",
            lineJoin: "round",
          }}
          eventHandlers={onSelectRoute ? { click: () => onSelectRoute(idx) } : undefined}
        />

        {arrowsByRoute[idx].map((arrow, arrowIndex) => (
          <Marker
            key={`${idx}-arrow-${arrowIndex}`}
            position={arrow.position}
            icon={directionIcon(arrow.angle, color)}
            interactive={false}
            zIndexOffset={300}
          />
        ))}

        {route.customer_ids?.map((customerId, stopIndex) => {
          const customerPoint =
            route.stop_coordinates?.[stopIndex] ||
            route.stops?.[stopIndex]?.coordinates;

          if (!customerPoint) return null;

          return (
            <CircleMarker
              key={`${idx}-stop-${customerId}-${stopIndex}`}
              center={customerPoint}
              radius={selected ? 6 : 4}
              pathOptions={{
                color: "#fff",
                weight: 2,
                fillColor: color,
                fillOpacity: selectedRouteIndex === null || selected ? 1 : 0.35,
              }}
              interactive={false}
            >
              <Tooltip direction="top" offset={[0, -5]} permanent={selected}>
                <span className="route-stop-tooltip">
                  <b>{stopIndex + 1}</b> · KH #{customerId}
                </span>
              </Tooltip>
            </CircleMarker>
          );
        })}
      </span>
    );
  });
}
