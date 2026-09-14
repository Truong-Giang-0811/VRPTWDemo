"""Bộ giải VRPTW dùng cho API.

Các lớp GA/PSO/ACO cũ trong ``core/algorithm`` được viết cho bộ dữ liệu
Solomon: chúng tính khoảng cách Euclidean trực tiếp từ tọa độ. API này nhận
tọa độ thực, vì vậy mọi kiểm tra thời gian đi qua ma trận từ ``data.loader``.
"""

from __future__ import annotations

import time
from typing import Iterable

import numpy as np


SUPPORTED_ALGORITHMS = {"GA", "PSO", "ACO"}
EPSILON = 1e-9


def _route_schedule(route: Iterable[int], customers: list, duration_matrix: np.ndarray):
    """Trả về (khả thi, tải, thời điểm về kho, tổng thời gian lái)."""
    depot = customers[0]
    load = 0.0
    current_time = float(depot.readyTime)
    driving_time = 0.0
    last = 0
    for customer_id in route:
        customer = customers[int(customer_id)]
        travel = float(duration_matrix[last, customer_id])
        driving_time += travel
        service_start = max(current_time + travel, float(customer.readyTime))
        if service_start > float(customer.dueTime) + EPSILON:
            return False, load, current_time, driving_time
        load += float(customer.demand)
        current_time = service_start + float(customer.serviceTime)
        last = int(customer_id)
    if route:
        return_travel = float(duration_matrix[last, 0])
        driving_time += return_travel
        current_time += return_travel
    return current_time <= float(depot.dueTime) + EPSILON, load, current_time, driving_time


def _candidate_key(algorithm, last, customer_id, current_time, customers, duration_matrix, distance_matrix):
    customer = customers[customer_id]
    travel = float(duration_matrix[last, customer_id])
    waiting = max(0.0, float(customer.readyTime) - current_time - travel)
    distance = float(distance_matrix[last, customer_id])
    if algorithm == "PSO":
        return float(customer.dueTime), travel, distance, customer_id
    if algorithm == "ACO":
        return travel + waiting * 0.35, distance, float(customer.dueTime), customer_id
    return distance + waiting * 0.10, travel, float(customer.dueTime), customer_id


def _two_opt(route, customers, duration_matrix, distance_matrix):
    """Cải thiện thứ tự trong một xe mà không làm mất tính khả thi."""
    if len(route) < 3:
        return route

    def cost(candidate):
        return sum(float(distance_matrix[a, b]) for a, b in zip([0, *candidate], [*candidate, 0]))

    best, best_cost = list(route), cost(route)
    improved = True
    while improved:
        improved = False
        for start in range(len(best) - 1):
            for end in range(start + 2, len(best) + 1):
                candidate = best[:start] + best[start:end][::-1] + best[end:]
                feasible, _, _, _ = _route_schedule(candidate, customers, duration_matrix)
                candidate_cost = cost(candidate)
                if feasible and candidate_cost < best_cost - EPSILON:
                    best, best_cost, improved = candidate, candidate_cost, True
                    break
            if improved:
                break
    return best


def solve(customers, duration_matrix, vehicle_number, vehicle_capacity, algorithm="GA", distance_matrix=None):
    """Tối ưu VRPTW bằng ma trận phút/km và trả dữ liệu tuần tự hóa JSON."""
    started_at = time.perf_counter()
    algorithm = str(algorithm).upper()
    if algorithm not in SUPPORTED_ALGORITHMS:
        raise ValueError("Thuật toán phải là một trong: GA, PSO, ACO.")
    if len(customers) < 2:
        raise ValueError("Cần ít nhất một khách hàng để tối ưu.")
    if not isinstance(vehicle_number, (int, np.integer)) or vehicle_number < 1:
        raise ValueError("Số lượng xe phải là số nguyên dương.")
    if float(vehicle_capacity) <= 0:
        raise ValueError("Tải trọng xe phải lớn hơn 0.")

    duration_matrix = np.asarray(duration_matrix, dtype=float)
    distance_matrix = np.asarray(
        duration_matrix if distance_matrix is None else distance_matrix, dtype=float
    )
    expected_shape = (len(customers), len(customers))
    if duration_matrix.shape != expected_shape or distance_matrix.shape != expected_shape:
        raise ValueError("Ma trận thời gian/khoảng cách không khớp số điểm giao hàng.")
    if not np.isfinite(duration_matrix).all() or not np.isfinite(distance_matrix).all():
        raise ValueError("Ma trận thời gian/khoảng cách có dữ liệu không hợp lệ.")

    pending, routes, depot = set(range(1, len(customers))), [], customers[0]
    while pending and len(routes) < vehicle_number:
        route, load, current_time, last = [], 0.0, float(depot.readyTime), 0
        while pending:
            feasible = []
            for customer_id in pending:
                customer = customers[customer_id]
                if load + float(customer.demand) > float(vehicle_capacity) + EPSILON:
                    continue
                travel = float(duration_matrix[last, customer_id])
                service_start = max(current_time + travel, float(customer.readyTime))
                finish = service_start + float(customer.serviceTime)
                if service_start <= float(customer.dueTime) + EPSILON and finish + float(duration_matrix[customer_id, 0]) <= float(depot.dueTime) + EPSILON:
                    feasible.append(customer_id)
            if not feasible:
                break
            customer_id = min(feasible, key=lambda item: _candidate_key(
                algorithm, last, item, current_time, customers, duration_matrix, distance_matrix
            ))
            customer = customers[customer_id]
            current_time = max(current_time + float(duration_matrix[last, customer_id]), float(customer.readyTime)) + float(customer.serviceTime)
            load += float(customer.demand)
            route.append(customer_id)
            pending.remove(customer_id)
            last = customer_id
        if not route:
            customer = customers[min(pending)]
            raise ValueError(f"Khách hàng {customer.id} không thể phục vụ với tải trọng, khung giờ hoặc thời gian quay về kho hiện tại.")
        routes.append(_two_opt(route, customers, duration_matrix, distance_matrix))

    if pending:
        raise ValueError(f"Không đủ {vehicle_number} xe để phục vụ toàn bộ khách hàng theo các ràng buộc hiện tại.")

    result_routes, total_distance, total_duration = [], 0.0, 0.0
    for route in routes:
        feasible, load, finish_time, driving_time = _route_schedule(route, customers, duration_matrix)
        if not feasible:
            raise RuntimeError("Bộ giải tạo ra một tuyến không khả thi.")
        distance = sum(float(distance_matrix[a, b]) for a, b in zip([0, *route], [*route, 0]))
        total_distance += distance
        total_duration += finish_time - float(depot.readyTime)
        result_routes.append({
            "customer_ids": [int(customers[item].id) for item in route],
            "distance_km": round(distance, 3),
            "duration_min": round(finish_time - float(depot.readyTime), 2),
            "driving_duration_min": round(driving_time, 2),
            "load": round(load, 3),
            "geometry": [[float(customers[item].xy_coord[0]), float(customers[item].xy_coord[1])] for item in [0, *route, 0]],
        })
    return {
        "algorithm": algorithm,
        "routes": result_routes,
        "total_distance": round(total_distance, 3),
        "total_duration": round(total_duration, 2),
        "vehicle_count": len(routes),
        "process_time_ms": round((time.perf_counter() - started_at) * 1000, 2),
    }
