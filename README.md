# VRPTW Demo — dữ liệu thực tế (OpenStreetMap)

Cấu trúc: `backend/` (Flask, Python) + `frontend/` (React, Vite, Leaflet).
Phần thuật toán GA/PSO/ACO/K-means gốc vẫn nằm trong repo `VRPTW_CGHN` —
backend này chỉ là lớp API bọc quanh, chưa copy code thuật toán sang.

## Chạy backend

```
cd backend
python -m venv .venv
.venv\Scripts\activate        # Windows
pip install -r requirements.txt
python app.py                 # chạy ở http://localhost:5001
```

## Chạy frontend

```
cd frontend
npm install
npm run dev                   # chạy ở http://localhost:5173, proxy /api -> :5001
```

Frontend và backend là hai tiến trình riêng; cần giữ cả hai lệnh đang chạy
trước khi bấm **Tối ưu tuyến đường**. Trong lúc phát triển, Vite chuyển
`/api/optimize` sang Flask qua proxy. Với `npm run preview` hoặc bản build
cục bộ, frontend mặc định gọi `http://localhost:5001/api` trực tiếp. Nếu
backend chạy ở máy/cổng khác, sao chép `frontend/.env.example` thành
`frontend/.env.local`, thay `VITE_API_BASE_URL`, rồi chạy lại frontend.

## Cách bộ giải hoạt động

`backend/core/solver.py` đã dùng trực tiếp `duration_matrix` (phút) để kiểm
tra tải trọng, cửa sổ thời gian và thời gian quay về kho; `distance_matrix`
(km) dùng để tối ưu và báo cáo quãng đường. Bộ giải hỗ trợ các chế độ `GA`,
`PSO`, `ACO` ở API; mỗi chế độ dùng tiêu chí chọn điểm kế tiếp khác nhau, rồi
cải thiện thứ tự dừng bằng 2-opt. Không gọi lại các lớp thử nghiệm cũ trong
`backend/core/algorithm/` vì chúng giả định tọa độ Solomon và đơn vị Euclidean.

## Đường bộ và tìm địa chỉ

Mặc định, backend dùng OSRM công cộng để tính ma trận thời gian, quãng đường
và geometry bám theo đường bộ. Vì vậy cần có Internet khi tối ưu. Có thể đặt
`OSRM_URL=http://<osrm-server>` để dùng OSRM tự host; hoặc đặt
`DISTANCE_PROVIDER=euclidean` chỉ khi muốn chạy offline (kết quả sẽ là đường
chim bay).

Frontend có ô tìm địa chỉ dùng OpenStreetMap Nominatim: lần tìm đầu đặt kho,
các lần sau mở biểu mẫu thêm khách tại vị trí đã chọn. API tìm kiếm giới hạn
theo Việt Nam để kết quả gọn hơn.
