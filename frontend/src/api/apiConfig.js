export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? (
  import.meta.env.DEV ? "/api" : "http://localhost:5001/api"
);

export const ROUTING_URL = import.meta.env.VITE_ROUTING_URL ?? "https://router.project-osrm.org";
export const GEOCODER_URL = import.meta.env.VITE_GEOCODER_URL ?? "https://nominatim.openstreetmap.org";

export function apiUrl(path) {
  return `${API_BASE_URL}${path}`;
}
