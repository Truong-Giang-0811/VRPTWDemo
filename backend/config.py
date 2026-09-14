import os

# "euclidean" (fallback, không cần OSRM) hoặc "osrm" (định tuyến thực)
DISTANCE_PROVIDER = os.environ.get("DISTANCE_PROVIDER", "osrm")

OSRM_URL = os.environ.get("OSRM_URL", "https://router.project-osrm.org")

NOMINATIM_URL = os.environ.get("NOMINATIM_URL", "https://nominatim.openstreetmap.org")
NOMINATIM_USER_AGENT = os.environ.get(
    "NOMINATIM_USER_AGENT", "vrptw-web-local-demo/1.0 (academic project)"
)

# Chỉ dùng khi DISTANCE_PROVIDER = "euclidean"
DEFAULT_SPEED_KMH = float(os.environ.get("DEFAULT_SPEED_KMH", 30))
