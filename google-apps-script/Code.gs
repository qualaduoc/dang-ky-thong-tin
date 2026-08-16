/**
 * ===================================================================
 * GOOGLE APPS SCRIPT - HỆ THỐNG ĐĂNG KÝ HỌC VIÊN TỰ ĐỘNG
 * Chức năng: Lưu thông tin học viên, chống đăng ký trùng lặp (Email, Số Zalo)
 * ===================================================================
 */

// Tên Sheet lưu dữ liệu (Mặc định là Sheet1 hoặc DanhSachHocVien)
var SHEET_NAME = "DanhSachHocVien";

/**
 * Xử lý yêu cầu POST (Đăng ký mới hoặc kiểm tra trùng lặp)
 */
function doPost(e) {
  var lock = LockService.getScriptLock();
  // Chờ tối đa 10 giây để tránh xung đột khi nhiều người bấm cùng lúc
  lock.tryLock(10000);

  try {
    var rawData = e.postData ? e.postData.contents : "{}";
    var data = JSON.parse(rawData);

    var action = data.action || "register";

    if (action === "check") {
      return checkDuplicateOnly(data);
    }

    return handleRegistration(data);
  } catch (error) {
    return createJsonResponse({
      success: false,
      message: "Lỗi xử lý máy chủ: " + error.toString()
    });
  } finally {
    lock.releaseLock();
  }
}

/**
 * Xử lý yêu cầu GET (Kiểm tra trạng thái kết nối Web App)
 */
function doGet(e) {
  var params = e.parameter || {};
  if (params.action === "ping") {
    return createJsonResponse({
      success: true,
      message: "Kết nối Google Sheet Web App hoạt động tốt!"
    });
  }
  return createJsonResponse({
    success: true,
    message: "Google Apps Script Đăng Ký Học Viên đang sẵn sàng tiếp nhận dữ liệu."
  });
}

/**
 * Xử lý đăng ký mới và kiểm tra trùng lặp
 */
function handleRegistration(data) {
  var fullName = (data.fullName || "").trim();
  var email = (data.email || "").trim().toLowerCase();
  var zalo = (data.zalo || "").trim();
  var note = (data.note || "").trim();
  var course = (data.course || "Khóa học mặc định").trim();

  // 1. Kiểm tra các trường bắt buộc
  if (!fullName || !email || !zalo) {
    return createJsonResponse({
      success: false,
      message: "Vui lòng điền đầy đủ Họ tên, Email và Số Zalo!"
    });
  }

  // Chuẩn hóa số Zalo (loại bỏ khoảng trắng, dấu chấm, dấu gạch ngang)
  zalo = zalo.replace(/[\s\.\-\+]/g, "");
  if (zalo.startsWith("84")) {
    zalo = "0" + zalo.substring(2);
  }

  var sheet = getOrCreateSheet();
  var lastRow = sheet.getLastRow();

  // 2. Kiểm tra trùng lặp trong Google Sheet
  if (lastRow > 1) {
    // Lấy toàn bộ dữ liệu từ dòng 2 (bỏ qua hàng tiêu đề)
    // Cột 1: Thời gian, Cột 2: Họ Tên, Cột 3: Email, Cột 4: Số Zalo
    var values = sheet.getRange(2, 1, lastRow - 1, 6).getValues();

    for (var i = 0; i < values.length; i++) {
      var rowEmail = (values[i][2] || "").toString().trim().toLowerCase();
      var rowZalo = (values[i][3] || "").toString().trim().replace(/[\s\.\-\+]/g, "");
      if (rowZalo.startsWith("84")) {
        rowZalo = "0" + rowZalo.substring(2);
      }

      if (rowEmail === email && rowZalo === zalo) {
        return createJsonResponse({
          success: false,
          duplicate: true,
          duplicateType: "BOTH",
          message: "Email và Số Zalo này đã được đăng ký trước đó rồi ạ!"
        });
      }

      if (rowEmail === email) {
        return createJsonResponse({
          success: false,
          duplicate: true,
          duplicateType: "EMAIL",
          message: "Email (" + email + ") đã tồn tại trong danh sách học viên!"
        });
      }

      if (rowZalo === zalo) {
        return createJsonResponse({
          success: false,
          duplicate: true,
          duplicateType: "ZALO",
          message: "Số Zalo (" + zalo + ") đã tồn tại trong danh sách học viên!"
        });
      }
    }
  }

  // 3. Ghi dữ liệu học viên mới vào Sheet
  var timestamp = Utilities.formatDate(new Date(), "Asia/Ho_Chi_Minh", "dd/MM/yyyy HH:mm:ss");
  var newRow = [
    timestamp,    // Cột A: Thời gian đăng ký
    fullName,     // Cột B: Họ và tên
    email,        // Cột C: Email
    "'" + zalo,   // Cột D: Số Zalo (thêm ' để giữ số 0 ở đầu)
    course,       // Cột E: Khóa học quan tâm
    note,         // Cột F: Ghi chú / Mục tiêu
    "Đã xác nhận" // Cột G: Trạng thái
  ];

  sheet.appendRow(newRow);

  // Định dạng lại dòng vừa thêm (căn lề giữa cho thời gian và SĐT)
  var newRowIndex = sheet.getLastRow();
  sheet.getRange(newRowIndex, 1).setHorizontalAlignment("center");
  sheet.getRange(newRowIndex, 4).setHorizontalAlignment("center");
  sheet.getRange(newRowIndex, 7).setHorizontalAlignment("center");

  return createJsonResponse({
    success: true,
    message: "Chúc mừng " + fullName + ", bạn đã đăng ký thành công!",
    data: {
      fullName: fullName,
      email: email,
      zalo: zalo,
      registeredAt: timestamp
    }
  });
}

/**
 * Chỉ kiểm tra trùng lặp (không ghi vào Sheet)
 */
function checkDuplicateOnly(data) {
  var email = (data.email || "").trim().toLowerCase();
  var zalo = (data.zalo || "").trim().replace(/[\s\.\-\+]/g, "");
  if (zalo.startsWith("84")) {
    zalo = "0" + zalo.substring(2);
  }

  var sheet = getOrCreateSheet();
  var lastRow = sheet.getLastRow();

  if (lastRow <= 1) {
    return createJsonResponse({ success: true, isDuplicate: false });
  }

  var values = sheet.getRange(2, 1, lastRow - 1, 4).getValues();
  for (var i = 0; i < values.length; i++) {
    var rowEmail = (values[i][2] || "").toString().trim().toLowerCase();
    var rowZalo = (values[i][3] || "").toString().trim().replace(/[\s\.\-\+]/g, "");
    if (rowZalo.startsWith("84")) {
      rowZalo = "0" + rowZalo.substring(2);
    }

    if (email && rowEmail === email) {
      return createJsonResponse({
        success: true,
        isDuplicate: true,
        field: "email",
        message: "Email này đã được đăng ký trước đó."
      });
    }
    if (zalo && rowZalo === zalo) {
      return createJsonResponse({
        success: true,
        isDuplicate: true,
        field: "zalo",
        message: "Số Zalo này đã được đăng ký trước đó."
      });
    }
  }

  return createJsonResponse({ success: true, isDuplicate: false });
}

/**
 * Lấy hoặc tự động tạo Sheet với Header định dạng chuyên nghiệp
 */
function getOrCreateSheet() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_NAME);

  if (!sheet) {
    // Nếu chưa có, đổi tên sheet đầu tiên hoặc tạo sheet mới
    sheet = ss.getSheets()[0];
    sheet.setName(SHEET_NAME);
  }

  // Nếu hàng 1 chưa có tiêu đề, tạo bộ tiêu đề chuẩn
  if (sheet.getLastRow() === 0) {
    var headers = [
      "Thời Gian", 
      "Họ Và Tên", 
      "Email Học Viên", 
      "Số Zalo / Phone", 
      "Khóa Học Đăng Ký", 
      "Ghi Chú / Nguyện Vọng", 
      "Trạng Thái"
    ];
    sheet.appendRow(headers);

    // Trang trí Header chuyên nghiệp (Navy Blue chuẩn Giáo Dục)
    var headerRange = sheet.getRange(1, 1, 1, headers.length);
    headerRange.setBackground("#1E3A8A"); // Màu xanh Navy
    headerRange.setFontColor("#FFFFFF"); // Chữ trắng
    headerRange.setFontWeight("bold");
    headerRange.setHorizontalAlignment("center");
    headerRange.setVerticalAlignment("middle");
    sheet.setRowHeight(1, 36);

    // Cố định dòng tiêu đề
    sheet.setFrozenRows(1);

    // Độ rộng các cột
    sheet.setColumnWidth(1, 160); // Thời gian
    sheet.setColumnWidth(2, 200); // Họ tên
    sheet.setColumnWidth(3, 240); // Email
    sheet.setColumnWidth(4, 150); // Số Zalo
    sheet.setColumnWidth(5, 200); // Khóa học
    sheet.setColumnWidth(6, 250); // Ghi chú
    sheet.setColumnWidth(7, 140); // Trạng thái
  }

  return sheet;
}

/**
 * Trả về kết quả JSON với Header CORS đầy đủ
 */
function createJsonResponse(data) {
  return ContentService.createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
