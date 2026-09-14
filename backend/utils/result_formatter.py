"""Chuẩn hóa kết quả solver thành cấu trúc JSON cho frontend."""


def format_result(result: dict, customers: list | None = None) -> dict:
    """Giữ một điểm chuyển đổi duy nhất giữa solver và API."""
    return {
        "algorithm": result["algorithm"],
        "routes": result["routes"],
        "total_distance_km": result["total_distance"],
        "total_duration_min": result["total_duration"],
        "vehicle_count": result["vehicle_count"],
        "process_time_ms": result["process_time_ms"],
    }
