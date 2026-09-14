"""
Interface chung cho việc lấy ma trận khoảng cách/thời gian giữa các điểm.

- EuclideanProvider: dùng khi chưa có OSRM, tính khoảng cách chim bay (haversine)
  rồi quy đổi thời gian qua 1 tốc độ trung bình cố định. Đủ để chạy demo nhanh.
- OSRMProvider: gọi OSRM /table để lấy khoảng cách + thời gian đi thực tế theo đường.

Chọn qua biến DISTANCE_PROVIDER trong config.py (env var DISTANCE_PROVIDER).
"""
from math import radians, sin, cos, asin, sqrt
import numpy as np

from config import DISTANCE_PROVIDER, DEFAULT_SPEED_KMH
from routing.osrm_client import get_osrm_table


class EuclideanProvider:
    def build_matrix(self, points):
        n = len(points)
        distance_matrix = np.zeros((n, n))

        for i in range(n):
            for j in range(n):
                if i != j:
                    distance_matrix[i][j] = _haversine_km(points[i], points[j])

        duration_matrix = distance_matrix / DEFAULT_SPEED_KMH * 60  # phút
        return distance_matrix, duration_matrix


class OSRMProvider:
    def build_matrix(self, points):
        distance_matrix_m, duration_matrix_sec = get_osrm_table(points)
        distance_matrix_km = distance_matrix_m / 1000.0
        duration_matrix_min = duration_matrix_sec / 60.0
        return distance_matrix_km, duration_matrix_min


def _haversine_km(p1, p2):
    R = 6371
    lat1, lng1, lat2, lng2 = map(radians, [p1["lat"], p1["lng"], p2["lat"], p2["lng"]])
    dlat = lat2 - lat1
    dlng = lng2 - lng1
    a = sin(dlat / 2) ** 2 + cos(lat1) * cos(lat2) * sin(dlng / 2) ** 2
    return 2 * R * asin(sqrt(a))


def get_distance_provider():
    if DISTANCE_PROVIDER == "osrm":
        return OSRMProvider()
    return EuclideanProvider()
