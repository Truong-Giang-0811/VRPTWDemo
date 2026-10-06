# VRPTW Demo — Dữ liệu thực tế với OpenStreetMap

Demo giải bài toán **Vehicle Routing Problem with Time Windows (VRPTW)** sử dụng dữ liệu vị trí thực tế từ **OpenStreetMap**.

Hệ thống gồm:

- **Frontend:** React + Vite + Leaflet
- **Backend:** Flask + Python
- **Geocoding:** OpenStreetMap Nominatim
- **Routing / Distance Matrix:** OSRM
- **Thuật toán:** GA / PSO / ACO / K-Means
- **Bản đồ:** Leaflet
- **Dữ liệu đường bộ:** khoảng cách, thời gian và geometry thực tế

# 2. Chạy Backend

Di chuyển vào thư mục backend:

```bash
cd backend
```

Tạo virtual environment:

```bash
python -m venv .venv
```

Kích hoạt môi trường:

### Windows

```bash
.venv\Scripts\activate
```

Cài đặt thư viện:

```bash
pip install -r requirements.txt
```

Chạy Flask:

```bash
python app.py
```

Backend mặc định chạy tại:

```text
http://localhost:5001
```

---

# 3. Chạy Frontend

Mở terminal thứ hai:

```bash
cd frontend
```

Cài đặt package:

```bash
npm install
```

Chạy Vite:

```bash
npm run dev
```

Frontend mặc định chạy tại:

```text
http://localhost:5173
```

Trong quá trình phát triển, Vite proxy request:

```text
/api
```

sang:

```text
http://localhost:5001
```

Vì vậy cần chạy **đồng thời cả Frontend và Backend**.

Ví dụ:

```text
Terminal 1
──────────
cd backend
.venv\Scripts\activate
python app.py


Terminal 2
──────────
cd frontend
npm run dev
```

Sau đó truy cập:

```text
http://localhost:5173
```

---

# 4. Cấu hình API

Frontend sử dụng API:

```text
POST /api/optimize
```

Trong môi trường development:

```text
Frontend
http://localhost:5173
        │
        │ /api/optimize
        ▼
Vite Proxy
        │
        ▼
Backend
http://localhost:5001
```

---

# 5. Production / Preview

Khi sử dụng:

```bash
npm run preview
```

hoặc build frontend:

```bash
npm run build
```

Frontend có thể gọi trực tiếp:

```text
http://localhost:5001/api
```

Nếu Backend chạy ở máy hoặc port khác, tạo file:

```text
frontend/.env.local
```

từ:

```text
frontend/.env.example
```

Sau đó cấu hình:

```env
VITE_API_BASE_URL=http://localhost:5001/api
```

Sau khi thay đổi `.env.local`, cần khởi động lại frontend.

---

# 6. Bộ giải VRPTW

Bộ giải chính nằm tại:

```text
backend/core/solver.py
```

Bộ giải sử dụng:

```text
distance_matrix
duration_matrix
```

Trong đó:

- `distance_matrix`: khoảng cách giữa các điểm, đơn vị km.
- `duration_matrix`: thời gian di chuyển giữa các điểm, đơn vị phút.

`duration_matrix` được sử dụng để kiểm tra:

- Time Window
- thời gian đến khách hàng
- thời gian chờ
- thời gian phục vụ
- thời gian quay về Depot

`distance_matrix` được sử dụng để:

- tính tổng quãng đường
- đánh giá tuyến đường
- báo cáo kết quả tối ưu

---

# 7. Các chế độ tối ưu

API hỗ trợ ba chế độ:

```text
GA
PSO
ACO
```

Mỗi chế độ sử dụng chiến lược lựa chọn điểm kế tiếp khác nhau.

Sau khi tạo tuyến, hệ thống tiếp tục sử dụng:

```text
2-opt
```

để cải thiện thứ tự các điểm trên tuyến.

Luồng:

```text
Input
  │
  ▼
K-Means
  │
  ▼
Route Construction
  │
  ├── GA
  ├── PSO
  └── ACO
  │
  ▼
2-opt
  │
  ▼
Route Timeline
  │
  ▼
Final Route
```

---

# 8. K-Means

Hệ thống sử dụng hàm:

```text
_simple_kmeans
```

để phân cụm khách hàng.

Việc phân cụm có thể dựa trên:

- vị trí không gian
- hoặc thông tin không gian / thời gian

Mục tiêu là tạo các nhóm khách hàng phù hợp trước khi xây dựng tuyến.

---

# 9. Kiểm tra ràng buộc VRPTW

Bộ giải kiểm tra các ràng buộc chính:

## Capacity

Tổng nhu cầu của khách hàng trên một xe không được vượt quá tải trọng xe.

```text
Total Demand <= Vehicle Capacity
```

## Time Window

Khách hàng phải được phục vụ trong khoảng thời gian cho phép:

```text
Ready Time <= Service Time <= Due Time
```

Nếu xe đến quá sớm:

```text
Waiting Time
```

được cộng vào lịch trình.

Nếu xe đến sau:

```text
Due Time
```

thì tuyến được xem là vi phạm Time Window.

## Depot

Xe phải:

```text
Depot
  ↓
Customers
  ↓
Depot
```

và hệ thống kiểm tra cả thời gian quay về Depot.

---

# 10. Dữ liệu đường bộ thực tế

Mặc định hệ thống sử dụng:

```text
OpenStreetMap
        │
        ▼
      OSRM
```

OSRM được sử dụng để lấy:

- khoảng cách
- thời gian di chuyển
- geometry của đường bộ

Do đó tuyến đường không phải là đường thẳng Euclidean giữa hai điểm.

Ví dụ:

```text
Customer A
     │
     │ đường thực tế
     ▼
  ┌───────┐
  │       │
  │       └──────┐
  │              │
  └──────────────┘
                 │
                 ▼
             Customer B
```

---

# 11. OSRM

Mặc định Backend sử dụng OSRM public.

Do đó cần Internet khi chạy tối ưu.

Có thể cấu hình OSRM server riêng:

```env
OSRM_URL=http://<osrm-server>
```

Ví dụ:

```env
OSRM_URL=http://localhost:5000
```

Nếu muốn chạy offline, có thể sử dụng:

```env
DISTANCE_PROVIDER=euclidean
```

Khi đó hệ thống sử dụng khoảng cách Euclidean / đường chim bay thay vì đường bộ thực tế.

---

# 12. Geocoding với OpenStreetMap

Frontend sử dụng:

```text
OpenStreetMap Nominatim
```

để tìm kiếm địa chỉ.

Luồng nhập địa chỉ:

```text
Người dùng
    │
    ▼
AddressSearch.jsx
    │
    ▼
geocodingApi.js
    │
    ▼
OpenStreetMap Nominatim
    │
    ▼
Latitude / Longitude
    │
    ▼
MapView.jsx
```

Lần tìm kiếm đầu tiên dùng để xác định:

```text
Depot
```

Các lần tiếp theo có thể dùng để thêm:

```text
Customer
```

API tìm kiếm được giới hạn trong phạm vi Việt Nam để giảm số lượng kết quả không liên quan.

---

# 13. API Optimization

Frontend gửi dữ liệu tới:

```http
POST /api/optimize
```

Backend tiếp nhận tại:

```text
app.py
    │
    ▼
routes_optimize.py
```

Sau đó dữ liệu được xử lý qua:

```text
loader.py
schema.py
readDataFile.py
time_convert.py
distance_provider.py
osrm_client.py
```

Sau khi bộ giải hoàn thành, Backend trả về JSON cho Frontend.

---

# 14. Xử lý kết quả

Kết quả từ Solver được đưa qua:

```text
result_formatter.py
```

Sau đó Backend thực hiện làm giàu geometry:

```text
_enrich_osrm_routes
```

để lấy đường bộ thực tế từ OSRM.

Luồng:

```text
Solver
  │
  ▼
Route Timeline
  │
  ▼
result_formatter.py
  │
  ▼
_enrich_osrm_routes
  │
  ▼
OSRM
  │
  ▼
Road Geometry
  │
  ▼
JSON Response
```

---

# 15. Frontend hiển thị kết quả

Frontend nhận JSON từ Backend thông qua:

```text
optimizeApi.js
```

Sau đó cập nhật state thông qua:

```text
useOptimizeResult.js
```

Kết quả được hiển thị bởi:

```text
RouteSummary.jsx
RouteTable.jsx
RouteMenu.jsx
```

Tuyến đường được hiển thị trên:

```text
Leaflet
```

thông qua:

```text
MapView.jsx
RoutePolyline.jsx
```

---

# 16. Luồng dữ liệu hoàn chỉnh

```text
┌─────────────────────┐
│      Người dùng     │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│   React Frontend    │
│  Form + Leaflet Map │
└──────────┬──────────┘
           │
           │ POST /api/optimize
           ▼
┌─────────────────────┐
│     Flask API       │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│ Data Loader /       │
│ Validation /        │
│ Time Conversion     │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│ Distance Provider   │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│        OSRM         │
│ Distance + Duration │
│ + Road Geometry     │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│   Distance Matrix   │
│   Duration Matrix   │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│    VRPTW Solver     │
│                     │
│ K-Means             │
│ GA / PSO / ACO      │
│ 2-opt               │
│ Time Window         │
│ Capacity            │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│   Route Timeline    │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│ Result Formatter    │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│   OSRM Geometry     │
└──────────┬──────────┘
           │
           │ JSON
           ▼
┌─────────────────────┐
│   React Frontend    │
│                     │
│ KPI                 │
│ Route Table         │
│ Route Summary       │
│ Leaflet Polyline    │
└─────────────────────┘
```

---

# 17. Cấu trúc thư mục liên quan

```text
backend/
│
├── app.py
│
├── routes/
│   └── routes_optimize.py
│
├── core/
│   └── solver.py
│
├── services/
│   ├── loader.py
│   ├── schema.py
│   ├── readDataFile.py
│   ├── time_convert.py
│   ├── distance_provider.py
│   └── osrm_client.py
│
└── result_formatter.py


frontend/
│
├── src/
│   │
│   ├── components/
│   │   ├── DepotForm.jsx
│   │   ├── VehicleForm.jsx
│   │   ├── CustomerForm.jsx
│   │   ├── CustomerList.jsx
│   │   ├── MapView.jsx
│   │   ├── AddressSearch.jsx
│   │   ├── RouteSummary.jsx
│   │   ├── RouteTable.jsx
│   │   ├── RouteMenu.jsx
│   │   └── RoutePolyline.jsx
│   │
│   ├── hooks/
│   │   ├── useCustomers.js
│   │   └── useOptimizeResult.js
│   │
│   ├── api/
│   │   ├── optimizeApi.js
│   │   ├── geocodingApi.js
│   │   └── apiConfig.js
│   │
│   └── App.jsx
│
├── package.json
└── vite.config.js
```

---

# 18. Yêu cầu hệ thống

## Backend

```text
Python 3.x
Flask
OSRM
```

Cài dependency:

```bash
pip install -r requirements.txt
```

## Frontend

```text
Node.js
npm
React
Vite
Leaflet
```

Cài dependency:

```bash
npm install
```

---

# 19. Chạy toàn bộ hệ thống

Mở **Terminal 1**:

```bash
cd backend
.venv\Scripts\activate
python app.py
```

Mở **Terminal 2**:

```bash
cd frontend
npm install
npm run dev
```

Mở trình duyệt:

```text
http://localhost:5173
```

Sau đó:

```text
1. Chọn Depot
       ↓
2. Thêm Vehicle
       ↓
3. Thêm Customers
       ↓
4. Thiết lập Time Window
       ↓
5. Chọn GA / PSO / ACO
       ↓
6. Bấm "Tối ưu tuyến đường"
       ↓
7. Backend tạo Distance / Duration Matrix
       ↓
8. Solver tối ưu tuyến
       ↓
9. OSRM lấy Road Geometry
       ↓
10. Frontend hiển thị kết quả
```

---

# 20. Lưu ý

Backend và Frontend là **hai tiến trình riêng biệt**.

Không được chỉ chạy:

```bash
npm run dev
```

mà phải chạy đồng thời:

```bash
python app.py
```

và:

```bash
npm run dev
```

Ngoài ra, khi sử dụng OSRM public và Nominatim cần có Internet.

Nếu sử dụng:

```env
DISTANCE_PROVIDER=euclidean
```

thì hệ thống có thể chạy offline nhưng khoảng cách sẽ là khoảng cách đường chim bay, không phản ánh mạng lưới đường bộ thực tế.