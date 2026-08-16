/**
 * ===================================================================
 * SERVER NODE.JS - HỆ THỐNG ĐĂNG KÝ HỌC VIÊN
 * Phục vụ Giao diện & Kết nối Google Sheet qua Web App API
 * ===================================================================
 */

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const rateLimit = require('express-rate-limit');

const app = express();
const PORT = process.env.PORT || 3000;
const GOOGLE_SHEET_WEBAPP_URL = process.env.GOOGLE_SHEET_WEBAPP_URL || '';

// 1. Cấu hình Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Giới hạn tần suất gửi form (Rate Limiting) - tối đa 20 lượt gửi / 10 phút từ 1 IP
const registerLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 20,
  message: {
    success: false,
    message: 'Bạn đã thực hiện quá nhiều yêu cầu trong thời gian ngắn. Vui lòng thử lại sau 10 phút.'
  },
  standardHeaders: true,
  legacyHeaders: false
});

// Phục vụ file tĩnh (Frontend)
app.use(express.static(path.join(__dirname, 'public')));

// File lưu trữ tạm thời khi chưa cấu hình Google Sheet URL (Mock Mode)
const LOCAL_DB_PATH = path.join(__dirname, 'data', 'local_students.json');
if (!fs.existsSync(path.join(__dirname, 'data'))) {
  fs.mkdirSync(path.join(__dirname, 'data'), { recursive: true });
}
if (!fs.existsSync(LOCAL_DB_PATH)) {
  fs.writeFileSync(LOCAL_DB_PATH, JSON.stringify([]));
}

// 2. Helper: Validate định dạng dữ liệu phía Server
function validateStudentData(data) {
  const { fullName, email, zalo } = data;

  if (!fullName || typeof fullName !== 'string' || fullName.trim().length < 2) {
    return 'Họ và tên không hợp lệ (tối thiểu 2 ký tự).';
  }

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!email || !emailRegex.test(email.trim())) {
    return 'Địa chỉ Email không đúng định dạng.';
  }

  // Chuẩn hóa số điện thoại Zalo (VN 10 chữ số)
  let cleanZalo = (zalo || '').toString().trim().replace(/[\s\.\-\+]/g, '');
  if (cleanZalo.startsWith('84')) {
    cleanZalo = '0' + cleanZalo.substring(2);
  }
  const phoneRegex = /^(03|05|07|08|09)\d{8}$/;
  if (!phoneRegex.test(cleanZalo)) {
    return 'Số Zalo/Số điện thoại không hợp lệ (cần là số điện thoại Việt Nam 10 chữ số).';
  }

  return null;
}

// 3. Helper: Xử lý lưu tạm cục bộ khi chưa có Google Sheet URL
function handleLocalRegister(data) {
  const raw = fs.readFileSync(LOCAL_DB_PATH, 'utf-8');
  const students = JSON.parse(raw || '[]');

  const email = data.email.trim().toLowerCase();
  let zalo = data.zalo.trim().replace(/[\s\.\-\+]/g, '');
  if (zalo.startsWith('84')) zalo = '0' + zalo.substring(2);

  // Kiểm tra trùng lặp
  const duplicate = students.find(
    s => s.email.toLowerCase() === email || s.zalo === zalo
  );

  if (duplicate) {
    if (duplicate.email.toLowerCase() === email && duplicate.zalo === zalo) {
      return { success: false, duplicate: true, message: 'Email và Số Zalo này đã được đăng ký trước đó rồi ạ!' };
    }
    if (duplicate.email.toLowerCase() === email) {
      return { success: false, duplicate: true, message: `Email (${email}) đã tồn tại trong danh sách học viên!` };
    }
    return { success: false, duplicate: true, message: `Số Zalo (${zalo}) đã tồn tại trong danh sách học viên!` };
  }

  const newStudent = {
    id: Date.now(),
    fullName: data.fullName.trim(),
    email: email,
    zalo: zalo,
    course: data.course || 'Khóa học cơ bản',
    note: data.note || '',
    registeredAt: new Date().toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' })
  };

  students.push(newStudent);
  fs.writeFileSync(LOCAL_DB_PATH, JSON.stringify(students, null, 2));

  return {
    success: true,
    message: `Chúc mừng ${newStudent.fullName}, bạn đã đăng ký thành công! (Dữ liệu lưu tạm cục bộ - vui lòng gắn Google Sheet URL vào .env)`,
    isLocalMock: true,
    data: newStudent
  };
}

// 4. API Endpoints

// [GET] Trạng thái cấu hình
app.get('/api/config-status', (req, res) => {
  res.json({
    hasGoogleSheetConfigured: Boolean(GOOGLE_SHEET_WEBAPP_URL && GOOGLE_SHEET_WEBAPP_URL.startsWith('https://script.google.com/')),
    serverTime: new Date().toISOString()
  });
});

// [POST] Kiểm tra trùng lặp nhanh (Realtime check)
app.post('/api/check-duplicate', async (req, res) => {
  try {
    const { email, zalo } = req.body;

    if (!email && !zalo) {
      return res.json({ success: true, isDuplicate: false });
    }

    if (GOOGLE_SHEET_WEBAPP_URL) {
      // Gọi sang Google Apps Script
      const response = await fetch(GOOGLE_SHEET_WEBAPP_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'check', email, zalo }),
        redirect: 'follow'
      });
      const result = await response.json();
      return res.json(result);
    } else {
      // Check trong Local Mock DB
      const raw = fs.readFileSync(LOCAL_DB_PATH, 'utf-8');
      const students = JSON.parse(raw || '[]');
      const cleanEmail = (email || '').trim().toLowerCase();
      let cleanZalo = (zalo || '').trim().replace(/[\s\.\-\+]/g, '');
      if (cleanZalo.startsWith('84')) cleanZalo = '0' + cleanZalo.substring(2);

      const existsEmail = cleanEmail && students.some(s => s.email.toLowerCase() === cleanEmail);
      const existsZalo = cleanZalo && students.some(s => s.zalo === cleanZalo);

      if (existsEmail) {
        return res.json({ success: true, isDuplicate: true, field: 'email', message: 'Email này đã đăng ký trước đó.' });
      }
      if (existsZalo) {
        return res.json({ success: true, isDuplicate: true, field: 'zalo', message: 'Số Zalo này đã đăng ký trước đó.' });
      }
      return res.json({ success: true, isDuplicate: false });
    }
  } catch (error) {
    console.error('Lỗi khi kiểm tra trùng lặp:', error);
    return res.status(500).json({ success: false, message: 'Không thể kết nối máy chủ kiểm tra.' });
  }
});

// [POST] Đăng ký thông tin học viên
app.post('/api/register', registerLimiter, async (req, res) => {
  try {
    const { fullName, email, zalo } = req.body;

    // Validate dữ liệu
    const validationError = validateStudentData({ fullName, email, zalo });
    if (validationError) {
      return res.status(400).json({ success: false, message: validationError });
    }

    // Nếu đã cấu hình Google Sheet URL
    if (GOOGLE_SHEET_WEBAPP_URL && GOOGLE_SHEET_WEBAPP_URL.startsWith('https://script.google.com/')) {
      console.log(`[Google Sheet] Đang gửi thông tin học viên ${fullName} (${email})...`);
      
      const response = await fetch(GOOGLE_SHEET_WEBAPP_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'register',
          fullName: fullName.trim(),
          email: email.trim().toLowerCase(),
          zalo: zalo.trim()
        }),
        redirect: 'follow'
      });

      const result = await response.json();
      return res.json(result);
    } else {
      // Nếu chưa có Google Sheet URL -> Dùng Local Mock DB
      console.warn('⚠️ GOOGLE_SHEET_WEBAPP_URL chưa cấu hình, đang lưu tạm vào file data/local_students.json');
      const localResult = handleLocalRegister({ fullName, email, zalo, course, note });
      return res.json(localResult);
    }
  } catch (error) {
    console.error('Lỗi xử lý đăng ký:', error);
    return res.status(500).json({
      success: false,
      message: 'Có lỗi xảy ra trong quá trình xử lý. Vui lòng liên hệ quản trị viên hoặc thử lại sau.'
    });
  }
});

// Khởi động Server
app.listen(PORT, () => {
  console.log(`\n=================================================`);
  console.log(`🎓 HỆ THỐNG ĐĂNG KÝ HỌC VIÊN ĐANG HOẠT ĐỘNG`);
  console.log(`🌐 Truy cập trang web tại: http://localhost:${PORT}`);
  console.log(`📊 Trạng thái Google Sheet: ${GOOGLE_SHEET_WEBAPP_URL ? '✅ Đã kết nối' : '⚠️ Chưa cấu hình URL (Đang dùng Mock DB)'}`);
  console.log(`=================================================\n`);
});
