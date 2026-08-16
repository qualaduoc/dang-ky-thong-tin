# 📋 Hướng Dẫn Kết Nối Ứng Dụng Với Google Sheets (Chỉ Mất 1 Phút)

Hệ thống sử dụng **Google Apps Script Web App** để kết nối trực tiếp với Google Sheets của Khầy một cách an toàn, miễn phí 100% và không giới hạn lượt gửi.

---

## 🚀 Bước 1: Tạo Bảng Google Sheets Mới

1. Mở trình duyệt và truy cập: [https://sheets.new](https://sheets.new) để tạo 1 file Google Sheet mới.
2. Đặt tên cho file Google Sheet (Ví dụ: `Danh Sách Đăng Ký Học Viên - Thầy Được`).

---

## 📝 Bước 2: Dán Mã Nguồn Google Apps Script

1. Trên thanh menu của Google Sheet, bấm vào **Tiện ích mở rộng** (Extensions) > **Apps Script**.
2. Một cửa sổ code mới sẽ hiện ra. Khầy xóa hết các đoạn mã mặc định có sẵn trong file `Code.gs`.
3. Mở file [google-apps-script/Code.gs](file:///d:/Nodejs/dang-ky-thong-tin/google-apps-script/Code.gs) trong dự án này, copy toàn bộ nội dung và dán vào cửa sổ Apps Script.
4. Bấm biểu tượng **💾 Lưu** (Save - phím tắt `Ctrl + S`).

---

## 🌐 Bước 3: Triển Khai Web App (Deploy)

1. Bấm nút **Triển khai** (Deploy) màu xanh ở góc trên bên phải > Chọn **Lần triển khai mới** (New deployment).
2. Tại mục *Chọn loại* (bấm biểu tượng bánh răng ⚙️ bên trái) > Chọn **Ứng dụng web** (Web app).
3. Điền các thông số như sau:
   - **Mô tả** (Description): `API Đăng Ký Học Viên`
   - **Thực thi dưới dạng** (Execute as): **Tôi** (Me - email của Khầy)
   - **Ai có quyền truy cập** (Who has access): **Bất kỳ ai** (Anyone) *(Lưu ý: Bắt buộc chọn "Bất kỳ ai" để trang web có thể gửi dữ liệu vào Sheet)*.
4. Bấm nút **Triển khai** (Deploy).
5. Nếu Google yêu cầu cấp quyền (Authorize access):
   - Chọn tài khoản Google của Khầy.
   - Bấm **Nâng cao** (Advanced) ở góc dưới > Bấm **Đi tới... (không an toàn)** (Go to... unsafe) > Bấm **Cho phép** (Allow).
6. Copy đường link tại mục **Ứng dụng web URL** (Web App URL) dạng:  
   `https://script.google.com/macros/s/AKfycbx.../exec`

---

## ⚙️ Bước 4: Gắn Link Vào Ứng Dụng Node.js

1. Mở file `.env` ở thư mục gốc của dự án.
2. Dán đường link Web App vừa copy vào biến `GOOGLE_SHEET_WEBAPP_URL`:

```env
PORT=3000
GOOGLE_SHEET_WEBAPP_URL=https://script.google.com/macros/s/AKfycbx.../exec
```

3. Lưu file `.env` và chạy lại server:
```bash
npm start
```

---

## 📊 Cấu Trúc Bảng Dữ Liệu Tự Động Tạo Trên Google Sheet

### 1. Bảng Đăng Ký Học Viên (`DanhSachHocVien`):
| Cột A | Cột B | Cột C | Cột D | Cột E |
|---|---|---|---|---|
| **Thời Gian** | **Họ Và Tên** | **Email Học Viên** | **Số Zalo / Phone** | **Trạng Thái** |

### 2. Bảng Khảo Sát Học Viên (`KhaoSatHocVien`):
| Cột A | Cột B | Cột C | Cột D -> M (10 Câu Khảo Sát) |
|---|---|---|---|
| **Thời Gian** | **Họ Và Tên** | **Số Zalo** | **Q1 .. Q10 (Kết quả bình chọn)** |

---

## 🔍 Câu Lệnh Truy Vấn Dữ Liệu Nâng Cao (Google Sheet Query Formula)

Nếu Khầy muốn lọc hoặc đếm dữ liệu theo thời gian, có thể dùng công thức sau ở 1 Sheet báo cáo mới:

```sql
-- 1. Lọc danh sách đăng ký học viên (Xếp theo thời gian đăng ký mới nhất):
=QUERY(DanhSachHocVien!A:E, "SELECT B, C, D, A WHERE A IS NOT NULL ORDER BY A DESC", 1)

-- 2. Lọc danh sách khảo sát và thể loại Game học viên quan tâm (Cột Q7 - Cột J):
=QUERY(KhaoSatHocVien!A:M, "SELECT B, C, J, A WHERE A IS NOT NULL ORDER BY A DESC", 1)

-- 3. Thống kê thể loại Game được học viên mong muốn học nhất:
=QUERY(KhaoSatHocVien!A:M, "SELECT J, COUNT(B) WHERE J IS NOT NULL GROUP BY J ORDER BY COUNT(B) DESC", 1)
```
