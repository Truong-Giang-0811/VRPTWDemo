def time_to_minutes(hhmm: str, reference_hhmm: str) -> int:
    """Convert giờ dạng 'HH:MM' thành số phút tính từ reference_hhmm (thường là giờ mở kho)."""
    h, m = map(int, hhmm.split(":"))
    rh, rm = map(int, reference_hhmm.split(":"))
    return (h * 60 + m) - (rh * 60 + rm)


def minutes_to_time(minutes: float, reference_hhmm: str) -> str:
    """Chiều ngược lại — dùng khi trả kết quả (thời điểm đến từng khách) về cho frontend."""
    rh, rm = map(int, reference_hhmm.split(":"))
    total = rh * 60 + rm + minutes
    h, m = divmod(int(total), 60)
    return f"{h:02d}:{m:02d}"
