"""Tra cứu địa chỉ qua Nominatim; chỉ gọi khi người dùng gửi tìm kiếm."""

import requests

from config import NOMINATIM_URL, NOMINATIM_USER_AGENT


def search_addresses(query: str, limit: int = 5) -> list[dict]:
    query = query.strip()
    if len(query) < 2:
        raise ValueError("Hãy nhập ít nhất 2 ký tự để tìm địa chỉ.")
    if len(query) > 200:
        raise ValueError("Từ khóa tìm kiếm quá dài.")

    response = requests.get(
        f"{NOMINATIM_URL}/search",
        params={
            "q": query,
            "format": "jsonv2",
            "limit": max(1, min(limit, 10)),
            "addressdetails": 1,
            "countrycodes": "vn",
        },
        headers={"User-Agent": NOMINATIM_USER_AGENT, "Accept-Language": "vi"},
        timeout=15,
    )
    response.raise_for_status()
    return [
        {"label": item["display_name"], "lat": float(item["lat"]), "lng": float(item["lon"])}
        for item in response.json()
    ]
