from flask import Blueprint, request, jsonify
from requests import RequestException

from data.loader import build_customers_from_input
from core.solver import solve
from utils.result_formatter import format_result
from config import DISTANCE_PROVIDER
from routing.osrm_client import get_osrm_route
from routing.geocoding import search_addresses
from routing.distance_provider import EuclideanProvider

optimize_bp = Blueprint("optimize", __name__)


CLUSTER_MODE_ALIASES = {
    "distance": "distance",
    "spatial": "distance",
    "spatiotemporal": "spatiotemporal",
    "distance_time": "spatiotemporal",
    "time": "spatiotemporal",
    "temporal": "spatiotemporal",
}


def _normalize_cluster_mode(value: str | None) -> str:
    return CLUSTER_MODE_ALIASES.get(str(value or "distance").lower(), "distance")


def _enrich_osrm_routes(response: dict, depot: dict, customers_input: list, routing_fallback: bool):
    response["routing_source"] = "euclidean_fallback" if routing_fallback else DISTANCE_PROVIDER
    if DISTANCE_PROVIDER != "osrm" or routing_fallback:
        return response

    points_by_id = {customer["id"]: customer for customer in customers_input}
    for route in response["routes"]:
        try:
            points = [depot, *(points_by_id[item] for item in route["customer_ids"]), depot]
            route["geometry"] = [[lat, lng] for lng, lat in get_osrm_route(points)]
            route["geometry_source"] = "osrm"
        except (KeyError, IndexError, TypeError, ValueError, RequestException):
            # Giữ polyline thẳng đã tạo bởi solver nếu OSRM chỉ lỗi geometry.
            pass
    return response


def _solve_payload(payload: dict, clustering_mode: str):
    try:
        depot = payload["depot"]
        vehicle = payload["vehicle"]
        customers_input = payload["customers"]
    except KeyError as e:
        raise KeyError(f"Thiếu trường bắt buộc: {e}")

    algorithm = payload.get("algorithm", "GA")
    time_weight = float(payload.get("time_weight", 0.35))

    if not customers_input:
        raise ValueError("Danh sách khách hàng đang trống")

    routing_fallback = False
    try:
        customers, distance_matrix, duration_matrix = build_customers_from_input(
            depot=depot,
            customers_input=customers_input,
        )
    except RequestException:
        # Một số môi trường phát triển chặn Flask kết nối Internet. Vẫn tạo
        # nghiệm khả thi; frontend sẽ gọi OSRM trực tiếp để thay polyline và số liệu.
        customers, distance_matrix, duration_matrix = build_customers_from_input(
            depot=depot,
            customers_input=customers_input,
            distance_provider=EuclideanProvider(),
        )
        routing_fallback = True

    result = solve(
        customers=customers,
        duration_matrix=duration_matrix,
        distance_matrix=distance_matrix,
        vehicle_number=vehicle["number"],
        vehicle_capacity=vehicle["capacity"],
        algorithm=algorithm,
        clustering_mode=clustering_mode,
        time_weight=time_weight,
    )

    response = format_result(result, customers)
    return _enrich_osrm_routes(response, depot, customers_input, routing_fallback)


@optimize_bp.route("/geocode", methods=["GET"])
def geocode():
    try:
        return jsonify({"results": search_addresses(request.args.get("q", ""))})
    except ValueError as e:
        return jsonify({"error": str(e)}), 400
    except RequestException:
        return jsonify({"error": "Không thể kết nối dịch vụ tìm địa chỉ. Vui lòng thử lại."}), 503


@optimize_bp.route("/optimize", methods=["POST"])
def optimize():
    payload = request.get_json(silent=True)
    if not isinstance(payload, dict):
        return jsonify({"error": "Nội dung yêu cầu phải là JSON hợp lệ."}), 400

    clustering_mode = _normalize_cluster_mode(payload.get("clustering_mode", "distance"))
    try:
        response = _solve_payload(payload, clustering_mode=clustering_mode)
    except (KeyError, TypeError, ValueError) as e:
        return jsonify({"error": str(e)}), 400
    except RuntimeError as e:
        return jsonify({"error": str(e)}), 500

    return jsonify(response)


@optimize_bp.route("/optimize/compare", methods=["POST"])
def optimize_compare():
    payload = request.get_json(silent=True)
    if not isinstance(payload, dict):
        return jsonify({"error": "Nội dung yêu cầu phải là JSON hợp lệ."}), 400

    try:
        distance_based = _solve_payload(payload, clustering_mode="distance")
        spatiotemporal_based = _solve_payload(payload, clustering_mode="spatiotemporal")
    except (KeyError, TypeError, ValueError) as e:
        return jsonify({"error": str(e)}), 400
    except RuntimeError as e:
        return jsonify({"error": str(e)}), 500

    return jsonify({
        "distance_based": distance_based,
        "spatiotemporal_based": spatiotemporal_based,
    })
