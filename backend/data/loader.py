"""
Chuyển dữ liệu người dùng nhập (JSON từ frontend) sang định dạng mà
thuật toán GA/PSO/ACO gốc trong VRPTW_CGHN đang dùng (namedtuple Customer).

TODO: copy hoặc symlink `algorithm/` và `ultility/` từ VRPTW_CGHN vào backend/core/,
      rồi import namedtuple Customer thật từ ultility.readDataFile thay vì dict ở đây.
"""
from routing.distance_provider import get_distance_provider
from utils.time_convert import time_to_minutes
from core.ultility.readDataFile import Customer
import numpy as np


def build_customers_from_input(depot: dict, customers_input: list, distance_provider=None):
    open_time = depot["open_time"]

    # Gộp depot (index 0) + khách hàng để tính ma trận khoảng cách 1 lần duy nhất
    points = [{"lat": depot["lat"], "lng": depot["lng"]}] + [
        {"lat": c["lat"], "lng": c["lng"]} for c in customers_input
    ]

    provider = distance_provider or get_distance_provider()
    distance_matrix, duration_matrix = provider.build_matrix(points)

    customers = []
    
    # Add depot as customer 0
    customers.append(Customer(
        id=0,
        xy_coord=np.array([depot["lat"], depot["lng"]]),
        demand=0,
        readyTime=0,
        dueTime=time_to_minutes(depot["close_time"], open_time),
        serviceTime=0
    ))
    
    for idx, c in enumerate(customers_input, start=1):
        customers.append(Customer(
            # Index trong mảng luôn liên tiếp để tra ma trận; id giữ nguyên từ UI
            # để kết quả vẫn trỏ đúng khách hàng sau khi người dùng xóa một dòng.
            id=c.get("id", idx),
            xy_coord=np.array([c["lat"], c["lng"]]),
            demand=c["demand"],
            readyTime=time_to_minutes(c["ready_time"], open_time),
            dueTime=time_to_minutes(c["due_time"], open_time),
            serviceTime=c.get("service_time", 0),
        ))

    return customers, distance_matrix, duration_matrix
