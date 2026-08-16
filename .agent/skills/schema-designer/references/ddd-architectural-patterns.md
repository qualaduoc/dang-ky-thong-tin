# 🏛️ TƯ DUY DOMAIN-DRIVEN DESIGN (DDD) TRONG THIẾT KẾ SCHEMA

> Hướng dẫn ứng dụng tư duy Domain-Driven Design (Thiết kế hướng miền nghiệp vụ) vào sơ đồ dữ liệu CSDL.

---

## 1. PHÂN BIỆT ENTITY VÀ VALUE OBJECT TRONG SCHEMA

Trong Domain-Driven Design (DDD), dữ liệu được chia làm 2 loại bản chất khác nhau:

### 🔵 1. Entity (Thực thể có định danh)
- **Bản chất:** Là đối tượng có **Mã định danh duy nhất (🔑 Primary Key)** không bao giờ đổi, dù các thông tin khác có thay đổi.
- **Cách ánh xạ sang Schema:** Được tách thành một **Bảng riêng biệt** có cột Khóa chính (`id` hoặc `ma_dinh_danh`).
- **Ví dụ:** `HỌC SINH` (Có Mã học sinh), `GIÁO VIÊN` (Có Mã giáo viên), `ĐƠN HÀNG` (Có Mã đơn hàng).

### 🟢 2. Value Object (Đối tượng giá trị - Không có định danh riêng)
- **Bản chất:** Là đối tượng được định nghĩa **bởi chính các giá trị thuộc tính của nó**, không có identity riêng. Nếu giá trị thay đổi ➔ Tạo đối tượng mới thay thế.
- **Cách ánh xạ sang Schema:**
  - *Cách 1 (Embedded Columns - Nhúng trực tiếp):* Lưu thành các cột nằm ngay bên trong Bảng của Entity chứa nó.
  - *Cách 2 (Owned Table):* Tách bảng phụ nhưng luôn đi kèm và bị xóa cùng Entity cha.
- **Ví dụ thực tế:**
  - `Địa chỉ` (Gồm: Số nhà, Tên đường, Phường/Xã, Quận/Huyện) ➔ Lưu các cột `dia_chi_so_nha`, `dia_chi_duong`, `dia_chi_quan` ngay trong bảng `HỌC SINH`.
  - `Số tiền & Đơn vị` (Gồm: `so_tien` = 150000, `don_vi_tien` = 'VND') ➔ Lưu chung trong dòng đơn hàng.

---

## 2. AGGREGATE ROOT & ĐƠN VỊ GIAO DỊCH (TRANSACTION BOUNDARY)

- **Aggregate Root (Gốc cụm dữ liệu):** Là Entity chính đóng vai trò cổng vào duy nhất quản lý một cụm các Entity và Value Object con.
- **Quy tắc Vàng khi Lưu dữ liệu:**
  - Khi lưu/sửa một Đơn hàng (Aggregate Root), hệ thống phải lưu/sửa đồng thời Đơn hàng + các dòng Chi tiết đơn hàng trong **Cùng một Giao dịch (Database Transaction)**.
  - Không bao giờ cho phép sửa Chi tiết đơn hàng lẻ loi mà không qua Đơn hàng cha!

---

## 3. AUDIT LOGGING & PHÂN LẬP ĐA TRƯỜNG HỌC (MULTI-TENANT ISOLATION)

### 🔒 1. Phân lập Đa trường học (Multi-Tenant Isolation Pattern)
Đối với các hệ thống SaaS phục vụ hàng trăm trường học/chi nhánh cùng lúc:
- **Cột phân lập (`tenant_id` / `ma_truong`):** Mọi bảng trong Database (từ Học sinh, Lớp học, Điểm số, Đơn hàng) BẮT BUỘC phải có cột `ma_truong`.
- **Mục đích:** Đảm bảo câu lệnh SQL luôn có điều kiện `WHERE ma_truong = 'THPT_A'`, ngăn chặn tuyệt đối việc Trường B xem nhầm dữ liệu của Trường A!

### 📝 2. Lịch sử Thao tác (Audit Log Pattern)
Lưu trữ vết tích ai làm gì, vào lúc nào:
```sql
CREATE TABLE audit_logs (
    id VARCHAR(36) PRIMARY KEY,
    ma_truong VARCHAR(20) NOT NULL,
    ma_nguoi_dung VARCHAR(50) NOT NULL,
    ten_bang VARCHAR(50) NOT NULL, -- Bảng bị thay đổi (VD: diem_so)
    hanh_dong VARCHAR(20) NOT NULL, -- INSERT, UPDATE, DELETE
    du_lieu_cu JSON,               -- Giá trị trước khi sửa
    du_lieu_moi JSON,              -- Giá trị sau khi sửa
    ip_address VARCHAR(45),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```
