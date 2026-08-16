/**
 * ===================================================================
 * XỬ LÝ GIAO DIỆN & VALIDATION FORM ĐĂNG KÝ HỌC VIÊN
 * Chức năng: Validate dữ liệu, Kiểm tra trùng lặp realtime, Submit API
 * ===================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Tham chiếu các phần tử DOM
  const form = document.getElementById('registrationForm');
  const fullNameInput = document.getElementById('fullName');
  const emailInput = document.getElementById('email');
  const zaloInput = document.getElementById('zalo');
  const submitBtn = document.getElementById('submitBtn');
  const btnText = submitBtn.querySelector('.btn-text-content') || submitBtn.querySelector('.btn-text');
  const btnLoader = submitBtn.querySelector('.btn-loader-content') || submitBtn.querySelector('.btn-loader');

  const successModal = document.getElementById('successModal');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const successStudentName = document.getElementById('successStudentName');
  const successStudentEmail = document.getElementById('successStudentEmail');
  const successStudentZalo = document.getElementById('successStudentZalo');
  const successStudentTime = document.getElementById('successStudentTime');
  const toastContainer = document.getElementById('toastContainer');

  let isSubmitting = false;

  // 2. Các hàm kiểm tra tính hợp lệ (Validation Rules)
  const validators = {
    fullName: (value) => {
      const trimmed = (value || '').trim();
      if (!trimmed) return 'Vui lòng nhập họ và tên của bạn.';
      if (trimmed.length < 2) return 'Họ và tên cần có ít nhất 2 ký tự.';
      return null;
    },

    email: (value) => {
      const trimmed = (value || '').trim();
      if (!trimmed) return 'Vui lòng nhập địa chỉ Email.';
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailRegex.test(trimmed)) {
        return 'Email không hợp lệ (Ví dụ đúng: hocvien@gmail.com).';
      }
      return null;
    },

    zalo: (value) => {
      let clean = (value || '').toString().trim().replace(/[\s\.\-\+]/g, '');
      if (!clean) return 'Vui lòng nhập số điện thoại Zalo.';
      if (clean.startsWith('84')) {
        clean = '0' + clean.substring(2);
      }
      const phoneRegex = /^(03|05|07|08|09)\d{8}$/;
      if (!phoneRegex.test(clean)) {
        return 'Số Zalo không hợp lệ (cần là số điện thoại VN 10 số, bắt đầu bằng 03, 05, 07, 08, 09).';
      }
      return null;
    }
  };

  // 3. Hiển thị / Xóa thông báo lỗi cho từng ô nhập
  function setFieldState(fieldId, errorMsg = null) {
    const group = document.getElementById(`group-${fieldId}`);
    const msgElement = document.getElementById(`msg-${fieldId}`);
    if (!group) return;

    if (errorMsg) {
      group.classList.remove('has-success');
      group.classList.add('has-error');
      if (msgElement) msgElement.textContent = errorMsg;
    } else {
      group.classList.remove('has-error');
      group.classList.add('has-success');
      if (msgElement) msgElement.textContent = '';
    }
  }

  function clearFieldState(fieldId) {
    const group = document.getElementById(`group-${fieldId}`);
    const msgElement = document.getElementById(`msg-${fieldId}`);
    if (!group) return;
    group.classList.remove('has-error', 'has-success');
    if (msgElement) msgElement.textContent = '';
  }

  // 4. Tự động chuẩn hóa Họ Tên (Viết hoa chữ cái đầu)
  function formatFullName(str) {
    return str
      .toLowerCase()
      .split(' ')
      .filter(word => word.trim().length > 0)
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  fullNameInput.addEventListener('blur', () => {
    if (fullNameInput.value.trim()) {
      fullNameInput.value = formatFullName(fullNameInput.value.trim());
      const err = validators.fullName(fullNameInput.value);
      setFieldState('fullName', err);
    }
  });

  fullNameInput.addEventListener('input', () => {
    if (document.getElementById('group-fullName').classList.contains('has-error')) {
      const err = validators.fullName(fullNameInput.value);
      setFieldState('fullName', err);
    }
  });

  // 5. Kiểm tra Email khi rời ô nhập (Blur)
  emailInput.addEventListener('blur', async () => {
    const val = emailInput.value.trim();
    if (!val) return;
    const err = validators.email(val);
    if (err) {
      setFieldState('email', err);
      return;
    }
    // Check trùng lặp nhanh phía server
    await checkDuplicateField('email', val);
  });

  emailInput.addEventListener('input', () => {
    if (document.getElementById('group-email').classList.contains('has-error')) {
      const err = validators.email(emailInput.value);
      if (!err) clearFieldState('email');
    }
  });

  // 6. Kiểm tra Số Zalo khi rời ô nhập (Blur)
  zaloInput.addEventListener('blur', async () => {
    let val = zaloInput.value.trim().replace(/[\s\.\-\+]/g, '');
    if (val.startsWith('84')) val = '0' + val.substring(2);
    if (!val) return;

    const err = validators.zalo(val);
    if (err) {
      setFieldState('zalo', err);
      return;
    }
    // Check trùng lặp nhanh phía server
    await checkDuplicateField('zalo', val);
  });

  zaloInput.addEventListener('input', () => {
    if (document.getElementById('group-zalo').classList.contains('has-error')) {
      const err = validators.zalo(zaloInput.value);
      if (!err) clearFieldState('zalo');
    }
  });

  // 7. Hàm gọi API kiểm tra trùng lặp nhẹ
  async function checkDuplicateField(fieldName, value) {
    try {
      const payload = {};
      payload[fieldName] = value;
      const res = await fetch('/api/check-duplicate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (data.isDuplicate) {
        setFieldState(fieldName, data.message || `${fieldName === 'email' ? 'Email' : 'Số Zalo'} này đã được đăng ký trước đó!`);
        showToast(`Cảnh báo: ${data.message || 'Thông tin đã tồn tại trong danh sách!'}`, 'warning');
      } else {
        setFieldState(fieldName, null);
      }
    } catch (e) {
      // Nếu mất mạng hoặc lỗi kết nối, tạm thời bỏ qua check nền
      console.warn('Lỗi kiểm tra trùng nền:', e);
    }
  }

  // 8. Toast thông báo nhanh (Floating Toast)
  function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;

    let iconHtml = '<i data-lucide="check-circle" class="toast-icon"></i>';
    if (type === 'error') {
      iconHtml = '<i data-lucide="alert-circle" class="toast-icon"></i>';
    } else if (type === 'warning') {
      iconHtml = '<i data-lucide="alert-triangle" class="toast-icon"></i>';
    }

    toast.innerHTML = `
      ${iconHtml}
      <div class="toast-content">${message}</div>
    `;

    toastContainer.appendChild(toast);
    if (window.lucide) lucide.createIcons();

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(30px)';
      setTimeout(() => toast.remove(), 300);
    }, 4500);
  }

  // 9. Xử lý gửi Form (Submit)
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (isSubmitting) return;

    // Validate toàn bộ các trường bắt buộc
    const nameErr = validators.fullName(fullNameInput.value);
    const emailErr = validators.email(emailInput.value);
    const zaloErr = validators.zalo(zaloInput.value);

    setFieldState('fullName', nameErr);
    setFieldState('email', emailErr);
    setFieldState('zalo', zaloErr);

    if (nameErr || emailErr || zaloErr) {
      showToast('Vui lòng kiểm tra và điền đúng các thông tin bắt buộc!', 'error');
      // Scroll tới lỗi đầu tiên
      const firstError = form.querySelector('.has-error');
      if (firstError) {
        firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    // Chuẩn bị dữ liệu gửi lên Server
    let cleanZalo = zaloInput.value.trim().replace(/[\s\.\-\+]/g, '');
    if (cleanZalo.startsWith('84')) cleanZalo = '0' + cleanZalo.substring(2);

    const postData = {
      fullName: fullNameInput.value.trim(),
      email: emailInput.value.trim().toLowerCase(),
      zalo: cleanZalo
    };

    // Chuyển sang trạng thái đang tải (Loading State)
    isSubmitting = true;
    submitBtn.disabled = true;
    btnText.style.display = 'none';
    btnLoader.style.display = 'flex';

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(postData)
      });

      const result = await response.json();

      if (result.success) {
        // ĐĂNG KÝ THÀNH CÔNG
        form.reset();
        clearFieldState('fullName');
        clearFieldState('email');
        clearFieldState('zalo');

        // Điền thông tin vào Modal Chúc Mừng
        successStudentName.textContent = result.data?.fullName || postData.fullName;
        successStudentEmail.textContent = result.data?.email || postData.email;
        successStudentZalo.textContent = result.data?.zalo || postData.zalo;
        successStudentTime.textContent = result.data?.registeredAt || new Date().toLocaleString('vi-VN');

        // Mở Modal
        successModal.style.display = 'flex';
        showToast('Đăng ký thành công! Dữ liệu đã được lưu vào Google Sheet.', 'success');
      } else {
        // CẢNH BÁO LỖI HOẶC TRÙNG LẶP DỮ LIỆU
        if (result.duplicate) {
          if (result.duplicateType === 'EMAIL') {
            setFieldState('email', result.message);
          } else if (result.duplicateType === 'ZALO') {
            setFieldState('zalo', result.message);
          } else {
            setFieldState('email', 'Email này đã đăng ký.');
            setFieldState('zalo', 'Số Zalo này đã đăng ký.');
          }
          showToast(result.message || 'Thông tin đăng ký đã tồn tại trong hệ thống!', 'warning');
        } else {
          showToast(result.message || 'Không thể đăng ký. Vui lòng thử lại.', 'error');
        }
      }
    } catch (err) {
      console.error('Lỗi kết nối máy chủ:', err);
      showToast('Lỗi mất kết nối mạng. Vui lòng kiểm tra internet và thử lại!', 'error');
    } finally {
      // Khôi phục trạng thái nút bấm
      isSubmitting = false;
      submitBtn.disabled = false;
      btnText.style.display = 'flex';
      btnLoader.style.display = 'none';
    }
  });

  // 10. Đóng Modal Thành Công
  modalCloseBtn.addEventListener('click', () => {
    successModal.style.display = 'none';
  });

  successModal.addEventListener('click', (e) => {
    if (e.target === successModal) {
      successModal.style.display = 'none';
    }
  });

  // Kiểm tra trạng thái Google Sheet khi tải trang
  fetch('/api/config-status')
    .then(r => r.json())
    .then(st => {
      if (!st.hasGoogleSheetConfigured) {
        console.info('💡 Gợi ý: Gắn link Google Apps Script Web App vào .env để lưu dữ liệu vào Google Sheet thật.');
      }
    })
    .catch(() => {});
});
