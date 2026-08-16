/**
 * ===================================================================
 * GOOGLE APPS SCRIPT - HỆ THỐNG ĐĂNG KÝ & KHẢO SÁT HỌC VIÊN
 * Khóa học: LẬP TRÌNH GAMES CẤP TỐC K01 2026 - ETA SCHOOL
 * 
 * Bảng 1: DanhSachHocVien (Đăng ký & Chống trùng Email / Zalo)
 * Bảng 2: KhaoSatHocVien (10 câu khảo sát & Tính % Realtime)
 * ===================================================================
 */

var SHEET_REGISTRATION = "DanhSachHocVien";
var SHEET_SURVEY = "KhaoSatHocVien";

/**
 * 1. Hàm khởi tạo cả 2 Sheet với định dạng chuẩn (Khầy có thể bấm Run hàm này)
 */
function initAllSheets() {
  getOrCreateRegistrationSheet();
  getOrCreateSurveySheet();
  Logger.log("✅ Đã khởi tạo thành công 2 sheet: DanhSachHocVien và KhaoSatHocVien!");
}

/**
 * 2. Xử lý yêu cầu POST từ Web App
 */
function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(15000);

  try {
    var data = {};
    if (e && e.postData && e.postData.contents) {
      try {
        data = JSON.parse(e.postData.contents);
      } catch (err) {
        data = e.parameter || {};
      }
    } else if (e && e.parameter) {
      data = e.parameter;
    }

    var action = data.action || (e && e.parameter ? e.parameter.action : "") || "register";

    // 1. Kiểm tra trùng lặp email / zalo
    if (action === "check") {
      return checkDuplicateOnly(data);
    }

    // 2. Gửi phiếu khảo sát học viên (10 câu)
    if (action === "survey_submit") {
      return handleSurveySubmit(data);
    }

    // 3. Lấy thống kê tỷ lệ % khảo sát realtime
    if (action === "survey_stats") {
      return getSurveyStats();
    }

    // 4. Đăng ký thông tin học viên (Mặc định)
    return handleRegistration(data);

  } catch (error) {
    return createJsonResponse({
      success: false,
      message: "Lỗi xử lý máy chủ Google Apps Script: " + error.toString()
    });
  } finally {
    lock.releaseLock();
  }
}

/**
 * 3. Xử lý yêu cầu GET
 */
function doGet(e) {
  var params = (e && e.parameter) ? e.parameter : {};
  
  if (params.action === "survey_stats") {
    return getSurveyStats();
  }
  
  if (params.action === "init") {
    initAllSheets();
    return createJsonResponse({
      success: true,
      message: "Đã tạo sẵn 2 sheet DanhSachHocVien và KhaoSatHocVien!"
    });
  }

  return createJsonResponse({
    success: true,
    message: "Google Apps Script Đăng Ký & Khảo Sát đang hoạt động hoàn hảo!"
  });
}

/**
 * ===================================================================
 * MODULE 1: ĐĂNG KÝ HỌC VIÊN (CHỐNG TRÙNG LẶP EMAIL & SỐ ZALO)
 * ===================================================================
 */
function handleRegistration(data) {
  var fullName = (data.fullName || "").toString().trim();
  var email = (data.email || "").toString().trim().toLowerCase();
  var zalo = (data.zalo || "").toString().trim().replace(/[\s\.\-\+]/g, "");

  if (!fullName || !email || !zalo) {
    return createJsonResponse({
      success: false,
      message: "Vui lòng điền đầy đủ Họ tên, Email và Số Zalo!"
    });
  }

  if (zalo.startsWith("84")) zalo = "0" + zalo.substring(2);

  var sheet = getOrCreateRegistrationSheet();
  var lastRow = sheet.getLastRow();

  // Kiểm tra trùng lặp
  if (lastRow > 1) {
    var values = sheet.getRange(2, 1, lastRow - 1, 4).getValues();
    for (var i = 0; i < values.length; i++) {
      var rowEmail = (values[i][2] || "").toString().trim().toLowerCase();
      var rowZalo = (values[i][3] || "").toString().trim().replace(/[\s\.\-\+]/g, "");
      if (rowZalo.startsWith("84")) rowZalo = "0" + rowZalo.substring(2);

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

  var timestamp = Utilities.formatDate(new Date(), "Asia/Ho_Chi_Minh", "dd/MM/yyyy HH:mm:ss");
  var newRow = [
    timestamp,
    fullName,
    email,
    "'" + zalo,
    "Đã xác nhận"
  ];

  sheet.appendRow(newRow);
  var newRowIndex = sheet.getLastRow();
  sheet.getRange(newRowIndex, 1).setHorizontalAlignment("center");
  sheet.getRange(newRowIndex, 4).setHorizontalAlignment("center");
  sheet.getRange(newRowIndex, 5).setHorizontalAlignment("center");

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

function checkDuplicateOnly(data) {
  var email = (data.email || "").toString().trim().toLowerCase();
  var zalo = (data.zalo || "").toString().trim().replace(/[\s\.\-\+]/g, "");
  if (zalo.startsWith("84")) zalo = "0" + zalo.substring(2);

  var sheet = getOrCreateRegistrationSheet();
  var lastRow = sheet.getLastRow();

  if (lastRow <= 1) {
    return createJsonResponse({ success: true, isDuplicate: false });
  }

  var values = sheet.getRange(2, 1, lastRow - 1, 4).getValues();
  for (var i = 0; i < values.length; i++) {
    var rowEmail = (values[i][2] || "").toString().trim().toLowerCase();
    var rowZalo = (values[i][3] || "").toString().trim().replace(/[\s\.\-\+]/g, "");
    if (rowZalo.startsWith("84")) rowZalo = "0" + rowZalo.substring(2);

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
 * ===================================================================
 * MODULE 2: KHẢO SÁT HỌC VIÊN (10 CÂU HỎI & THỐNG KÊ REALTIME %)
 * ===================================================================
 */
function handleSurveySubmit(data) {
  var fullName = (data.fullName || "").toString().trim();
  var zalo = (data.zalo || "").toString().trim().replace(/[\s\.\-\+]/g, "");
  if (zalo.startsWith("84")) zalo = "0" + zalo.substring(2);

  var answers = data.answers || {};

  if (!fullName || !zalo) {
    return createJsonResponse({
      success: false,
      message: "Vui lòng nhập Họ Tên và Số Zalo để gửi phiếu khảo sát!"
    });
  }

  var sheet = getOrCreateSurveySheet();
  var timestamp = Utilities.formatDate(new Date(), "Asia/Ho_Chi_Minh", "dd/MM/yyyy HH:mm:ss");

  var rowData = [
    timestamp,
    fullName,
    "'" + zalo,
    answers.q1 || "",
    answers.q2 || "",
    answers.q3 || "",
    answers.q4 || "",
    answers.q5 || "",
    answers.q6 || "",
    answers.q7 || "",
    answers.q8 || "",
    answers.q9 || "",
    answers.q10 || ""
  ];

  sheet.appendRow(rowData);
  var newRowIndex = sheet.getLastRow();
  sheet.getRange(newRowIndex, 1).setHorizontalAlignment("center");
  sheet.getRange(newRowIndex, 3).setHorizontalAlignment("center");

  // Trả về dữ liệu thống kê % mới nhất sau khi thêm phiếu
  return getSurveyStats(true);
}

/**
 * Tính toán tỷ lệ % và số lượt chọn realtime của 10 câu hỏi
 */
function getSurveyStats(isAfterSubmit) {
  var sheet = getOrCreateSurveySheet();
  var lastRow = sheet.getLastRow();

  var stats = {
    totalResponses: 0,
    questions: {}
  };

  for (var q = 1; q <= 10; q++) {
    stats.questions["q" + q] = { total: 0, options: {}, percentages: {} };
  }

  if (lastRow > 1) {
    var values = sheet.getRange(2, 1, lastRow - 1, 13).getValues();
    stats.totalResponses = values.length;

    for (var i = 0; i < values.length; i++) {
      var row = values[i];
      for (var q = 1; q <= 10; q++) {
        var ans = (row[q + 2] || "").toString().trim();
        if (ans) {
          var qKey = "q" + q;
          stats.questions[qKey].total = (stats.questions[qKey].total || 0) + 1;
          stats.questions[qKey].options[ans] = (stats.questions[qKey].options[ans] || 0) + 1;
        }
      }
    }

    // Tính phần trăm (%)
    for (var qKey in stats.questions) {
      var qData = stats.questions[qKey];
      var percentages = {};
      if (qData.total > 0) {
        for (var opt in qData.options) {
          var count = qData.options[opt];
          percentages[opt] = Math.round((count / qData.total) * 1000) / 10; // Làm tròn 1 chữ số thập phân
        }
      }
      qData.percentages = percentages;
    }
  }

  return createJsonResponse({
    success: true,
    message: isAfterSubmit ? "Gửi phiếu khảo sát thành công!" : "Lấy thống kê khảo sát thành công!",
    data: stats
  });
}

/**
 * ===================================================================
 * HELPER: TẠO VÀ ĐỊNH DẠNG TỰ ĐỘNG CÁC SHEET
 * ===================================================================
 */
function getOrCreateRegistrationSheet() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_REGISTRATION);
  if (!sheet) {
    var sheets = ss.getSheets();
    if (sheets.length === 1 && sheets[0].getName() === "Sheet1" || sheets[0].getName() === "Trang tính1") {
      sheet = sheets[0];
      sheet.setName(SHEET_REGISTRATION);
    } else {
      sheet = ss.insertSheet(SHEET_REGISTRATION, 0);
    }
  }

  if (sheet.getLastRow() === 0) {
    var headers = ["Thời Gian", "Họ Và Tên", "Email Học Viên", "Số Zalo / Phone", "Trạng Thái"];
    sheet.appendRow(headers);
    var headerRange = sheet.getRange(1, 1, 1, headers.length);
    headerRange.setBackground("#1E3A8A"); // Màu xanh dương sang trọng
    headerRange.setFontColor("#FFFFFF");
    headerRange.setFontWeight("bold");
    headerRange.setHorizontalAlignment("center");
    sheet.setRowHeight(1, 38);
    sheet.setFrozenRows(1);
    sheet.setColumnWidth(1, 170);
    sheet.setColumnWidth(2, 220);
    sheet.setColumnWidth(3, 260);
    sheet.setColumnWidth(4, 160);
    sheet.setColumnWidth(5, 140);
  }
  return sheet;
}

function getOrCreateSurveySheet() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_SURVEY);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_SURVEY, 1);
  }

  if (sheet.getLastRow() === 0) {
    var headers = [
      "Thời Gian",
      "Họ Và Tên",
      "Số Zalo",
      "Q1: Kinh Nghiệm AI",
      "Q2: Hiểu Biết Agnes AI",
      "Q3: Tư Duy Lập Trình",
      "Q4: Rào Cản AI",
      "Q5: Thời Gian Học/Tuần",
      "Q6: Mục Tiêu Game",
      "Q7: Thể Loại Game Muốn Học",
      "Q8: Đối Tượng Học Sinh",
      "Q9: Yếu Tố Quan Trọng Nhất",
      "Q10: Kỳ Vọng Khóa Học"
    ];
    sheet.appendRow(headers);
    var headerRange = sheet.getRange(1, 1, 1, headers.length);
    headerRange.setBackground("#881337"); // Màu đỏ sơn mài sang trọng
    headerRange.setFontColor("#FFFFFF");
    headerRange.setFontWeight("bold");
    headerRange.setHorizontalAlignment("center");
    sheet.setRowHeight(1, 38);
    sheet.setFrozenRows(1);
    sheet.setColumnWidth(1, 170);
    sheet.setColumnWidth(2, 200);
    sheet.setColumnWidth(3, 150);
    for (var col = 4; col <= 13; col++) {
      sheet.setColumnWidth(col, 250);
    }
  }
  return sheet;
}

function createJsonResponse(data) {
  return ContentService.createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
