from flask import Blueprint, request, jsonify

from data.loader import build_customers_from_input
from core.solver import solve
from utils.result_formatter import format_result
from config import DISTANCE_PROVIDER
from routing.osrm_client import get_osrm_route
from routing.geocoding import search_addresses
from routing.distance_provider import EuclideanProvider
from requests import RequestException

optimize_bp = Blueprint("optimize", __name__)


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

    try:
        depot = payload["depot"]
        vehicle = payload["vehicle"]
        customers_input = payload["customers"]
    except KeyError as e:
        return jsonify({"error": f"Thiếu trường bắt buộc: {e}"}), 400

    algorithm = payload.get("algorithm", "GA")

    if not customers_input:
        return jsonify({"error": "Danh sách khách hàng đang trống"}), 400

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

    try:
        result = solve(
            customers=customers,
            duration_matrix=duration_matrix,
            distance_matrix=distance_matrix,
            vehicle_number=vehicle["number"],
            vehicle_capacity=vehicle["capacity"],
            algorithm=algorithm,
        )
    except (KeyError, TypeError, ValueError) as e:
        return jsonify({"error": str(e)}), 400

    response = format_result(result, customers)
    response["routing_source"] = "euclidean_fallback" if routing_fallback else DISTANCE_PROVIDER
    if DISTANCE_PROVIDER == "osrm" and not routing_fallback:
        points_by_id = {customer["id"]: customer for customer in customers_input}
        for route in response["routes"]:
            try:
                points = [depot, *(points_by_id[item] for item in route["customer_ids"]), depot]
                route["geometry"] = [[lat, lng] for lng, lat in get_osrm_route(points)]
                route["geometry_source"] = "osrm"
            except (KeyError, IndexError, TypeError, ValueError, RequestException):
                # Giữ polyline thẳng đã tạo bởi solver nếu OSRM chỉ lỗi geometry.
                pass
    return jsonify(response)
