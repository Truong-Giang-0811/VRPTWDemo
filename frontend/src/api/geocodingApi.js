import { apiUrl, GEOCODER_URL } from "./apiConfig";

async function searchPublicNominatim(query) {
  const params = new URLSearchParams({
    q: query,
    format: "jsonv2",
    limit: "5",
    addressdetails: "1",
    countrycodes: "vn",
    "accept-language": "vi",
  });
  const response = await fetch(`${GEOCODER_URL}/search?${params}`);
  if (!response.ok) throw new Error("Không thể kết nối dịch vụ tìm địa chỉ.");
  return (await response.json()).map((item) => ({
    label: item.display_name,
    lat: Number(item.lat),
    lng: Number(item.lon),
  }));
}

export async function searchAddresses(query) {
  try {
    const response = await fetch(apiUrl(`/geocode?q=${encodeURIComponent(query)}`));
    const data = await response.json().catch(() => ({}));
    if (response.ok) return data.results || [];
    if (response.status < 500) throw new Error(data.error || "Không thể tìm địa chỉ.");
  } catch (error) {
    if (error.message && !error.message.includes("Failed to fetch")) throw error;
  }
  return searchPublicNominatim(query);
}
