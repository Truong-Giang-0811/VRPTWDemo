"""
Định dạng dữ liệu JSON mà frontend gửi lên (không bắt buộc dùng pydantic,
để dataclass đơn giản cho dễ đọc — có thể đổi sang pydantic nếu cần validate chặt).
"""
from dataclasses import dataclass


@dataclass
class DepotInput:
    lat: float
    lng: float
    open_time: str   # "HH:MM"
    close_time: str  # "HH:MM"


@dataclass
class VehicleInput:
    number: int
    capacity: float


@dataclass
class CustomerInput:
    id: int
    lat: float
    lng: float
    demand: float
    ready_time: str    # "HH:MM"
    due_time: str       # "HH:MM"
    service_time: int   # phút
