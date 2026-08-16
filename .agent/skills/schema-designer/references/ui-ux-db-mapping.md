# 🔗 ÁNH XẠ TAM GIÁC: UI / UX ➔ DATABASE SCHEMA DESIGN

> Tài liệu hướng dẫn phương pháp ánh xạ từ Giao diện màn hình (UI) và Hành trình trải nghiệm người dùng (UX) sang Sơ đồ cơ sở dữ liệu (DB Schema).

---

## 1. NGUYÊN TẮC ÁNH XẠ MÀN HÌNH UI SANG BẢNG SCHEMA

### 🟢 Màn hình 1: Danh sách & Bảng dữ liệu (Data Table / Dashboard List)
- **UI Elements:** Bảng hiển thị danh sách dòng (Rows), Nút Lọc (Filter), Ô Tìm kiếm (Search Bar), Nút Phân trang (Pagination 1, 2, 3...).
- **DB Schema Requirements:**
  - Cần một **Bảng chính** lưu trữ các dòng này (Master hoặc Transaction Table).
  - Cần đánh chỉ mục **INDEX** cho các cột hay dùng để Tìm kiếm / Lọc (VD: `ho_ten`, `trang_thai`, `ngay_tao`).
  - Mọi dòng BẮT BUỘC có **Khóa chính duy nhất (🔑 Primary Key)** để làm định danh khi bấm xem chi tiết hoặc sửa/xóa.

### 🟣 Màn hình 2: Form Nhập Liệu / Đăng Ký (Create & Edit Form)
- **UI Elements:** Ô nhập chữ (Input text), Ô nhập số (Number input), Ô chọn ngày (Datepicker), Ô chọn thả xuống (Dropdown Select), Ô đánh dấu (Checkbox/Radio).
- **DB Schema Requirements:**
  - Ô nhập chữ ➔ Cột kiểu `VARCHAR(255)` hoặc `TEXT`. Nếu bắt buộc nhập ➔ Ràng buộc `NOT NULL`.
  - Ô nhập số ➔ Cột kiểu `INT` hoặc `DECIMAL(10,2)`. Ràng buộc `CHECK (so_luong >= 0)`.
  - Ô chọn ngày ➔ Cột kiểu `DATE` hoặc `DATETIME`.
  - Ô chọn thả xuống Dropdown ➔ **Khóa ngoại (🔗 Foreign Key)** nối sang Bảng danh mục tương ứng.

### 📙 Màn hình 3: Thẻ Thống Kê / Chỉ Số Thống Kê (Metric Card / Counter)
- **UI Elements:** Con số lớn trên góc màn hình (VD: "Tổng doanh thu: 150.000.000 VNĐ", "Tổng số học sinh: 1,200 em").
- **DB Schema Requirements:**
  - Nếu dữ liệu nhỏ ➔ Dùng câu lệnh đếm/cộng trực tiếp (`COUNT(*)`, `SUM(tong_tien)`).
  - Nếu dữ liệu > 100,000 dòng ➔ BẮT BUỘC lưu một **Cột tính toán sẵn (Cached Column)** ở bảng cha để UI render tức thì (< 10ms) mà không làm lag máy chủ.

---

## 2. NGUYÊN TẮC ÁNH XẠ HÀNH TRÌNH UX SANG CỖ MÁY TRẠNG THÁI (STATE MACHINE)

Mọi thao tác bấm nút của người dùng trên UI đều là hành động đổi trạng thái dữ liệu trong DB:

```
[Bấm nút 'Nộp Bài']      ➔ Đổi trang_thai = 'DA_NOP'        ➔ Ghi nhận ngay_nop = NOW()
[Bấm nút 'Chấm Điểm']     ➔ Đổi trang_thai = 'DA_CHAM'       ➔ Cập nhật diem_so & loi_phe
[Bấm nút 'Hủy Bài Nộp']   ➔ Đổi trang_thai = 'DA_HUY'        ➔ Ghi nhận ly_do_huy
```

### Bảng Thiết Kế Cỗ Máy Trạng Thái Mẫu (State Transition Matrix)

| Trạng thái hiện tại | Hành động người dùng (UX) | Trạng thái mới | Điều kiện hợp lệ (Validation) |
| :--- | :--- | :--- | :--- |
| `DRAFT` (Nháp) | Bấm "Gửi duyệt" | `PENDING` (Chờ duyệt) | Phải có file đính kèm |
| `PENDING` | Giáo viên bấm "Duyệt" | `APPROVED` (Đã duyệt) | Phải có chữ ký số/Xác nhận |
| `PENDING` | Giáo viên bấm "Từ chối" | `REJECTED` (Từ chối) | Bắt buộc nhập Lý do từ chối |
| `APPROVED` | Bấm "Hủy đơn" | `CANCELLED` (Đã hủy) | Chỉ cho phép hủy trước 24h |
