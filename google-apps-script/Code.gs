/**
 * ===================================================================
 * GOOGLE APPS SCRIPT - HỆ THỐNG ĐĂNG KÝ & KHẢO SÁT HỌC VIÊN
 * Chức năng: 
 * 1. Lưu thông tin đăng ký & chống trùng lặp (Sheet: DanhSachHocVien)
 * 2. Lưu kết quả khảo sát & tính toán tỷ lệ % realtime (Sheet: KhaoSatHocVien)
 * ===================================================================
 */

var SHEET_REGISTRATION = "DanhSachHocVien";
var SHEET_SURVEY = "KhaoSatHocVien";

/**
 * Xử lý yêu cầu POST
 */
function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(10000);

  try {
    var rawData = e.postData ? e.postData.contents : "{}";
    var data = JSON.parse(rawData);
    var action = data.action || "register";

    // 1. Kiểm tra trùng lặp nhanh
    if (action === "check") {
      return checkDuplicateOnly(data);
    }

    // 2. Gửi kết quả khảo sát
    if (action === "survey_submit") {
      return handleSurveySubmit(data);
    }

    // 3. Lấy thống kê khảo sát realtime
    if (action === "survey_stats") {
      return getSurveyStats();
    }

    // 4. Đăng ký học viên mặc định
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
 * Xử lý yêu cầu GET
 */
function doGet(e) {
  var params = e.parameter || {};
  if (params.action === "survey_stats") {
    return getSurveyStats();
  }
  if (params.action === "ping") {
    return createJsonResponse({
      success: true,
      message: "Kết nối Google Sheet Web App hoạt động tốt!"
    });
  }
  return createJsonResponse({
    success: true,
    message: "Google Apps Script Đăng Ký & Khảo Sát đang sẵn sàng tiếp nhận dữ liệu."
  });
}

/**
 * ===================================================================
 * MODULE 1: ĐĂNG KÝ HỌC VIÊN (Chống trùng lặp Email, Số Zalo)
 * ===================================================================
 */
function handleRegistration(data) {
  var fullName = (data.fullName || "").trim();
  var email = (data.email || "").trim().toLowerCase();
  var zalo = (data.zalo || "").trim();

  if (!fullName || !email || !zalo) {
    return createJsonResponse({
      success: false,
      message: "Vui lòng điền đầy đủ Họ tên, Email và Số Zalo!"
    });
  }

  zalo = zalo.replace(/[\s\.\-\+]/g, "");
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
  var email = (data.email || "").trim().toLowerCase();
  var zalo = (data.zalo || "").trim().replace(/[\s\.\-\+]/g, "");
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
 * MODULE 2: KHẢO SÁT HỌC VIÊN & TÍNH TOÁN REALTIME %
 * ===================================================================
 */
function handleSurveySubmit(data) {
  var fullName = (data.fullName || "").trim();
  var zalo = (data.zalo || "").trim().replace(/[\s\.\-\+]/g, "");
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

  // Trả về thống kê realtime mới nhất
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
    stats.questions["q" + q] = { total: 0, options: {} };
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
 * HELPER: TẠO VÀ ĐỊNH DẠNG SHEET TỰ ĐỘNG
 * ===================================================================
 */
function getOrCreateRegistrationSheet() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_REGISTRATION);
  if (!sheet) {
    sheet = ss.getSheets()[0];
    sheet.setName(SHEET_REGISTRATION);
  }

  if (sheet.getLastRow() === 0) {
    var headers = ["Thời Gian", "Họ Và Tên", "Email Học Viên", "Số Zalo / Phone", "Trạng Thái"];
    sheet.appendRow(headers);
    var headerRange = sheet.getRange(1, 1, 1, headers.length);
    headerRange.setBackground("#1E3A8A");
    headerRange.setFontColor("#FFFFFF");
    headerRange.setFontWeight("bold");
    headerRange.setHorizontalAlignment("center");
    sheet.setRowHeight(1, 36);
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
    sheet = ss.insertSheet(SHEET_SURVEY);
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
    sheet.setRowHeight(1, 36);
    sheet.setFrozenRows(1);
    sheet.setColumnWidth(1, 170);
    sheet.setColumnWidth(2, 200);
    sheet.setColumnWidth(3, 150);
    for (var col = 4; col <= 13; col++) {
      sheet.setColumnWidth(col, 240);
    }
  }
  return sheet;
}

function createJsonResponse(data) {
  return ContentService.createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
