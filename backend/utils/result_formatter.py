"""Chuẩn hóa kết quả solver thành cấu trúc JSON cho frontend."""


from __future__ import annotations


def format_result(result: dict, customers: list | None = None) -> dict:
    """Giữ một điểm chuyển đổi duy nhất giữa solver và API."""
    return {
        "algorithm": result["algorithm"],
        "clustering_mode": result.get("clustering_mode", "distance"),
        "clustering_mode_label": "Không gian - Thời gian" if result.get("clustering_mode") == "spatiotemporal" else "Khoảng cách",
        "time_weight": result.get("time_weight", 0.35),
        "clusters": result.get("clusters", []),
        "customer_cluster_map": result.get("customer_cluster_map", {}),
        "routes": result["routes"],
        "total_distance_km": result["total_distance"],
        "total_duration_min": result["total_duration"],
        "total_waiting_time_min": result.get("total_waiting_time", 0),
        "vehicle_count": result["vehicle_count"],
        "process_time_ms": result["process_time_ms"],
    }
