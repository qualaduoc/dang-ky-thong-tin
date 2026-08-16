# 🧪 BỘ CHECKLIST PHÉP THỬ SCHEMA AUDIT & BẮT LỖI EDGE CASES

> Tài liệu hướng dẫn quy trình kiểm thử sơ đồ dữ liệu trước khi bàn giao cho Lập trình viên hoặc AI coding.

---

## 1. PHÉP THỬ 1: NGƯỜI LẠ ĐỌC SƠ ĐỒ (UNFAMILIAR READER TEST)
- **Cách thực hiện:** Giả định bạn là một người hoàn toàn không tham gia thiết kế dự án.
- **Tiêu chuẩn đạt:**
  - [ ] Nhìn vào tên bảng và tên cột là hiểu ngay bảng đó lưu cái gì mà không cần mở từ điển.
  - [ ] Tìm thấy đầy đủ thông tin cho từng màn hình hiển thị.
  - [ ] Không có cột thông tin bị "mồ côi" (không biết từ đâu sinh ra).

## 2. PHÉP THỬ 2: BIẾN ĐỘNG DÒNG THỜI GIAN (TIME WARP TEST)
- **Cách thực hiện:** Đặt câu hỏi: "Nếu 1 năm sau, 3 năm sau hoặc 5 năm sau các thông tin thay đổi thì dữ liệu cũ ra sao?"
- **Tiêu chuẩn đạt:**
  - [ ] Giá tiền sản phẩm / Học phí thay đổi ➔ Đơn hàng cũ vẫn giữ đúng giá tiền tại thời điểm mua (`don_gia_snapshot`).
  - [ ] Học sinh lên lớp mới ➔ Vẫn giữ lại Lịch sử lớp học các năm trước.
  - [ ] Nhân viên nghỉ việc hoặc đổi chức vụ ➔ Các hợp đồng/biên bản cũ nhân viên đó ký vẫn giữ nguyên giá trị pháp lý.

## 3. PHÉP THỬ 3: XÓA DÂY CHUYỀN AN TOÀN (CASCADING SAFETY TEST)
- **Cách thực hiện:** Đặt câu hỏi: "Nếu người quản trị bấm nút XÓA một dòng ở Bảng Cha thì Bảng Con sẽ xử lý thế nào?"
- **Tiêu chuẩn đạt:**
  - [ ] Nếu xóa 1 Danh mục chính (VD: Xóa 1 Môn học) ➔ Không được xóa mất Điểm số cũ của học sinh. Dùng `ON DELETE SET NULL` hoặc dùng `Soft Delete` (`is_deleted = TRUE`).
  - [ ] Nếu xóa 1 Đơn hàng ➔ Xóa dây chuyền các Chi tiết đơn hàng thuộc về đơn đó (`ON DELETE CASCADE`).

## 4. PHÉP THỬ 4: TRÙNG LẶP & NHẤT QUÁN DỮ LIỆU (DATA INTEGRITY TEST)
- **Cách thực hiện:** Kiểm tra xem có dữ liệu văn bản nào bị gõ đi gõ lại nhiều lần ở nhiều bảng không.
- **Tiêu chuẩn đạt:**
  - [ ] Tên Học sinh, Tên Giáo viên, Tên Món ăn chỉ lưu duy nhất ở 1 Bảng Master Data.
  - [ ] Các bảng khác muốn dùng thông tin này CHỈ ĐƯỢC phép gọi qua **Khóa ngoại (🔗 Foreign Key)**.

## 5. PHÉP THỬ 5: HIỆU NĂNG TẢI LỚN & ĐÁNH CHỈ MỤC INDEX (HIGH VOLUME TEST)
- **Cách thực hiện:** Giả định bảng phát sinh dữ liệu chạm ngưỡng 1.000.000 dòng.
- **Tiêu chuẩn đạt:**
  - [ ] Đã khai báo chỉ mục `INDEX` cho các cột hay dùng trong mệnh đề `WHERE`, `ORDER BY`, `JOIN` (VD: `ma_hoc_sinh`, `ngay_tao`, `trang_thai`).
  - [ ] Đã chuẩn bị sẵn cấu trúc phân trang (`limit`, `page`).
