import { Fragment, useMemo, useState } from "react";
import {
  Marker,
  Polyline,
  useMap,
  useMapEvents,
} from "react-leaflet";
import L from "leaflet";

const COLORS = ["#2563eb", "#16a34a", "#dc2626", "#ca8a04", "#7c3aed", "#0891b2"];

const ARROW_GAP_PX = 90; // khoảng cách giữa 2 mũi tên TRÊN MÀN HÌNH
const ARROW_LOOK_PX = 14; // đoạn nhìn trước/sau để tính hướng cho mượt
const ARROW_EDGE_PX = 24; // chừa hai đầu tuyến, tránh đè lên marker

/* ---------- Icon (cache theo màu + góc làm tròn 5°) ---------- */

const iconCache = new Map();

function directionIcon(angle, color) {
  const snapped = Math.round(angle / 5) * 5;
  const key = `${color}-${snapped}`;
  if (iconCache.has(key)) return iconCache.get(key);

  const svg = `
    <svg width="22" height="22" viewBox="0 0 22 22" xmlns="http://www.w3.org/2000/svg"
      style="transform:rotate(${snapped}deg);filter:drop-shadow(0 1px 2px rgba(0,0,0,.3))">
      <path d="M11 2 L18 15 L11 12.5 L4 15 Z" fill="${color}" stroke="white"
        stroke-width="1.8" stroke-linejoin="round"/>
    </svg>
  `;
  const icon = L.divIcon({
    className: "route-direction-arrow",
    html: svg,
    iconSize: [22, 22],
    iconAnchor: [11, 11],
  });
  iconCache.set(key, icon);
  return icon;
}

/* ---------- Hình học trên không gian pixel ---------- */

// Trả về điểm (pixel) nằm cách đầu tuyến đúng d pixel dọc theo đường.
function makeSampler(pts, cum) {
  const total = cum[cum.length - 1];
  return (distance) => {
    const d = Math.min(Math.max(distance, 0), total);
    let lo = 0;
    let hi = cum.length - 1;
    while (lo < hi - 1) {
      const mid = (lo + hi) >> 1;
      if (cum[mid] <= d) lo = mid;
      else hi = mid;
    }
    const seg = cum[hi] - cum[lo] || 1;
    const t = (d - cum[lo]) / seg;
    return L.point(
      pts[lo].x + (pts[hi].x - pts[lo].x) * t,
      pts[lo].y + (pts[hi].y - pts[lo].y) * t
    );
  };
}

// Đặt mũi tên đều nhau theo khoảng cách pixel, hướng tính từ đoạn đường quanh điểm đó.
function arrowPoints(map, geometry, zoom) {
  if (!geometry || geometry.length < 2) return [];

  const pts = geometry.map((p) => map.project(p, zoom));
  const cum = [0];
  for (let i = 1; i < pts.length; i++) {
    cum.push(cum[i - 1] + pts[i].distanceTo(pts[i - 1]));
  }
  const total = cum[cum.length - 1];
  if (total < ARROW_EDGE_PX * 2) return [];

  const sample = makeSampler(pts, cum);
  const arrows = [];

  for (
    let d = Math.min(ARROW_GAP_PX / 2, total / 2);
    d <= total - ARROW_EDGE_PX;
    d += ARROW_GAP_PX
  ) {
    const from = sample(d - ARROW_LOOK_PX);
    const to = sample(d + ARROW_LOOK_PX);
    const at = sample(d);
    // Icon hướng lên trên (bắc) khi angle = 0; trục y màn hình hướng xuống nên đảo dấu.
    const angle = (Math.atan2(to.x - from.x, -(to.y - from.y)) * 180) / Math.PI;
    arrows.push({ position: map.unproject(at, zoom), angle });
  }
  return arrows;
}

function useZoomLevel() {
  const map = useMap();
  const [zoom, setZoom] = useState(map.getZoom());
  useMapEvents({ zoomend: () => setZoom(map.getZoom()) });
  return zoom;
}

/* ---------- Component ---------- */

export default function RoutePolyline({ routes, selectedRouteIndex = null, onSelectRoute }) {
  const map = useMap();
  const zoom = useZoomLevel();

  const arrowsByRoute = useMemo(
    () => (routes || []).map((route) => arrowPoints(map, route.geometry, zoom)),
    [routes, map, zoom]
  );

  if (!routes?.length) return null;

  // Tuyến đang chọn vẽ sau cùng để nằm trên các tuyến khác.
  const order = routes
    .map((_, idx) => idx)
    .sort((a, b) => (a === selectedRouteIndex) - (b === selectedRouteIndex));

  return order.map((idx) => {
    const route = routes[idx];
    const color = COLORS[idx % COLORS.length];
    const selected = selectedRouteIndex === idx;
    const dimmed = selectedRouteIndex !== null && !selected;
    const positions = route.geometry || [];
    const weight = selected ? 7 : 4;

    return (
      <Fragment key={idx}>
        {/* Viền trắng bên dưới giúp đường nổi hẳn lên khỏi nền bản đồ */}
        <Polyline
          positions={positions}
          pathOptions={{
            color: "#fff",
            weight: weight + 4,
            opacity: dimmed ? 0.2 : 0.9,
            lineCap: "round",
            lineJoin: "round",
          }}
          interactive={false}
        />
        <Polyline
          positions={positions}
          pathOptions={{
            color,
            weight,
            opacity: dimmed ? 0.3 : 0.95,
            lineCap: "round",
            lineJoin: "round",
          }}
          eventHandlers={onSelectRoute ? { click: () => onSelectRoute(idx) } : undefined}
        />

        {/* Khi đã chọn một tuyến, chỉ tuyến đó có mũi tên để khỏi rối */}
        {!dimmed &&
          arrowsByRoute[idx].map((arrow, arrowIndex) => (
            <Marker
              key={`${idx}-arrow-${arrowIndex}`}
              position={arrow.position}
              icon={directionIcon(arrow.angle, color)}
              interactive={false}
              zIndexOffset={selected ? 500 : 300}
            />
          ))}
      </Fragment>
    );
  });
}
