# 📚 THƯ VIỆN 12 MẪU SCHEMA HỆ THỐNG THỰC TẾ (ADVANCED SCHEMA CATALOG)

> Bộ 12 mẫu Schema được thiết kế chuẩn Production-ready cho các hệ thống giáo dục, doanh nghiệp, thương mại điện tử, booking dịch vụ và quản trị.

---

## 🎓 NHÓM 1: CÁC HỆ THỐNG GIÁO DỤC & NHÀ TRƯỜNG

### 1. Quản lý Thư viện Trường học
- `hoc_sinh` (ma_hoc_sinh, ho_ten, lop_hoc)
- `danh_muc_sach` (ma_sach, ten_sach, tac_gia, so_luong)
- `phieu_muon` (ma_phieu, ma_hoc_sinh, ngay_muon, ngay_hen_tra)
- `chi_tiet_muon` (ma_phieu, ma_sach, trang_thai, tien_phat)

### 2. Sổ Điểm & Báo Giảng Điện tử
- `lop_hoc` (ma_lop, ten_lop, nam_hoc)
- `buoi_hoc` (ma_buoi_hoc, ma_lop, ngay_hoc, tiet_hoc, ten_bai_giang)
- `hoc_sinh` (ma_hoc_sinh, ma_lop, ho_ten, ngay_sinh)
- `diem_danh` (ma_buoi_hoc, ma_hoc_sinh, trang_thai, ly_do_vang)

### 3. App Căng tin Quẹt thẻ Thông minh
- `the_hoc_sinh` (ma_the, ma_hoc_sinh, so_du_tien, trang_thai)
- `don_hang` (ma_don_hang, ma_the, thoi_gian, tong_tien, trang_thai)
- `danh_muc_mon` (ma_mon, ten_mon, gia_tien, so_luong_ton)
- `chi_tiet_don` (ma_don_hang, ma_mon, so_luong, don_gia_snapshot, thanh_tien)

### 4. Hệ thống Khóa học Trực tuyến LMS (E-Learning)
- `khoa_hoc` (ma_khoa_hoc, ten_khoa_hoc, giao_vien, gia_tien)
- `bai_giang` (ma_video, ma_khoa_hoc, ten_video, link_video, thoi_luong)
- `hoc_sinh` (ma_hoc_sinh, ho_ten, email)
- `dang_ky_lms` (ma_hoc_sinh, ma_khoa_hoc, ngay_dang_ky, tien_do_ptram, da_cap_chung_chi)

### 5. Quản lý Xe Bus Đưa đón Smart Bus
- `tuyen_xe` (ma_tuyen, bien_so_xe, lai_xe, giam_sat)
- `diem_don` (ma_diem, ma_tuyen, dia_chi, gio_don_du_kien)
- `hoc_sinh_bus` (ma_hoc_sinh, ma_tuyen, sdt_phu_huynh)
- `lich_su_bus` (ma_luot, ma_hoc_sinh, ma_diem, thoi_gian, trang_thai_quet)

### 6. Quản lý Câu lạc bộ & Điểm Rèn luyện
- `cau_lac_bo` (ma_clb, ten_clb, co_van, phong_hinh)
- `su_kien_clb` (ma_su_kien, ma_clb, ten_su_kien, ngay_to_chuc)
- `thanh_vien` (ma_hoc_sinh, ma_clb, chuc_vu)
- `diem_ren_luyen` (ma_su_kien, ma_hoc_sinh, trang_thai, diem_cong)

### 7. Gia sư & Quản lý Lớp học thêm
- `giao_vien` (ma_gv, ho_ten, sdt_zalo, chuyen_mon)
- `lop_hoc_them` (ma_lop, ma_gv, ten_lop, hoc_phi_thang)
- `hoc_sinh` (ma_hs, ho_ten, truong_hoc, sdt_phu_huynh)
- `dang_ky_hoc_phi` (ma_dk, ma_hs, ma_lop, ngay_dang_ky, trang_thai_hoc_phi)

---

## 💼 NHÓM 2: DOANH NGHIỆP, THƯƠNG MẠI & QUẢN TRỊ

### 8. App Đặt lịch hẹn Service Booking (Spa / Phòng khám / Tư vấn)
- `chuyen_gia` (ma_cg, ho_ten, chuyen_khoa, gia_dich_vu)
- `khach_hang` (ma_kh, ho_ten, sdt, email)
- `khung_gio_ranh` (ma_khung_gio, ma_cg, ngay_lam_viec, gio_bat_dau, gio_ket_thuc, da_dat)
- `lich_hen_booking` (ma_lich_hen, ma_kh, ma_cg, ma_khung_gio, trang_thai_booking, tong_tien)

### 9. Bán hàng Thương mại Điện tử E-Commerce
- `khach_hang` (ma_kh, ho_ten, sdt, dia_chi_giao)
- `danh_muc_san_pham` (ma_sp, ten_sp, gia_niem_yet, so_luong_kho)
- `don_hang` (ma_don, ma_kh, ngay_dat, tong_tien, trang_thai_don_hang)
- `chi_tiet_don_hang` (ma_don, ma_sp, so_luong, don_gia_snapshot, thanh_tien)
- `thanh_toan_payment` (ma_giao_dich, ma_don, phuong_thuc, so_tien, trang_thai_pay)

### 10. Hệ thống Phân quyền RBAC & Nhật ký Audit Log
- `users` (id, username, password_hash, email, is_active)
- `roles` (id, role_name, description)
- `permissions` (id, permission_name, resource_name)
- `user_roles` (user_id, role_id)
- `role_permissions` (role_id, permission_id)
- `audit_logs` (id, ma_truong, user_id, action, table_name, old_data, new_data, created_at)

### 11. Quản lý Tài chính Cá nhân & Ví Điện tử
- `tai_khoan_vi` (ma_vi, user_id, so_du_hien_tai, loai_tien)
- `danh_muc_thu_chi` (ma_danh_muc, ten_danh_muc, loai_chi_phi)
- `giao_dich_vi` (ma_giao_dich, ma_vi, ma_danh_muc, so_tien, ghi_chu, thoi_gian)

### 12. Quản lý Kho Hàng & Nhập Xuất Tồn
- `kho_hang` (ma_kho, ten_kho, dia_chi, ma_quan_ly)
- `vong_doi_vattu` (ma_vat_tu, ten_vat_tu, don_vi_tinh)
- `phieu_nhap_xuat` (ma_phieu, ma_kho, loai_phieu, ngay_lap, nguoi_lap)
- `chi_tiet_nhap_xuat` (ma_phieu, ma_vat_tu, so_luong, don_gia, thanh_tien)
