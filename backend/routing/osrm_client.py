"""
Client gọi tới 1 server OSRM (tự host bằng Docker hoặc dùng demo server để test).
"""
import requests
import numpy as np

from config import OSRM_URL


def get_osrm_table(points):
    """Trả về (distance_matrix mét, duration_matrix giây) cho toàn bộ danh sách điểm."""
    coords = ";".join(f"{p['lng']},{p['lat']}" for p in points)
    url = f"{OSRM_URL}/table/v1/driving/{coords}?annotations=distance,duration"

    resp = requests.get(url, timeout=30)
    resp.raise_for_status()
    data = resp.json()

    distance_matrix = np.array(data["distances"])
    duration_matrix = np.array(data["durations"])
    return distance_matrix, duration_matrix


def get_osrm_route(points):
    """Lấy geometry GeoJSON đi theo đường thực tế cho 1 route cụ thể, để vẽ lên bản đồ."""
    coords = ";".join(f"{p['lng']},{p['lat']}" for p in points)
    url = f"{OSRM_URL}/route/v1/driving/{coords}?overview=full&geometries=geojson"

    resp = requests.get(url, timeout=30)
    resp.raise_for_status()
    data = resp.json()

    return data["routes"][0]["geometry"]["coordinates"]  # [[lng, lat], ...]
