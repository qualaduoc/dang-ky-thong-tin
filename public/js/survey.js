/**
 * ===================================================================
 * LOGIC TRANG KHẢO SÁT & HIỂN THỊ KẾT QUẢ REALTIME (%)
 * ===================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Cấu hình danh mục 10 câu hỏi & các lựa chọn để đối soát
  const QUESTIONS_DATA = [
    {
      id: 'q1',
      badge: '01',
      title: 'Mức độ sử dụng các công cụ AI (ChatGPT, Claude, Gemini...) của bạn?',
      options: [
        'Mới bắt đầu / Chưa từng sử dụng',
        'Thỉnh thoảng tra cứu thông tin / hỏi đáp đơn giản',
        'Dùng thường xuyên để soạn giáo án, viết nội dung',
        'Đã thành thạo kỹ thuật viết Prompt nâng cao (Role, Context, Chain-of-thought)'
      ],
      keyMap: {
        'Chưa từng dùng': 'Mới bắt đầu / Chưa từng sử dụng',
        'Thỉnh thoảng tra cứu': 'Thỉnh thoảng tra cứu thông tin / hỏi đáp đơn giản',
        'Dùng thường xuyên': 'Dùng thường xuyên để soạn giáo án, viết nội dung',
        'Thành thạo Prompt nâng cao': 'Đã thành thạo kỹ thuật viết Prompt nâng cao (Role, Context, Chain-of-thought)'
      }
    },
    {
      id: 'q2',
      badge: '02',
      title: 'Bạn đã từng biết hoặc sử dụng nền tảng Agnes AI chưa?',
      options: [
        'Chưa từng nghe tới Agnes AI',
        'Đã nghe giới thiệu nhưng chưa thử tạo game bao giờ',
        'Đã dùng thử để tạo một vài game/ứng dụng mẫu cơ bản',
        'Đã thành thạo tạo game và tùy biến logic với Agnes AI'
      ],
      keyMap: {
        'Chưa từng nghe': 'Chưa từng nghe tới Agnes AI',
        'Đã nghe nhưng chưa dùng': 'Đã nghe giới thiệu nhưng chưa thử tạo game bao giờ',
        'Đã tạo thử game mẫu': 'Đã dùng thử để tạo một vài game/ứng dụng mẫu cơ bản',
        'Đã thành thạo Agnes AI': 'Đã thành thạo tạo game và tùy biến logic với Agnes AI'
      }
    },
    {
      id: 'q3',
      badge: '03',
      title: 'Khả năng tư duy logic và nền tảng kỹ thuật hiện tại của bạn:',
      options: [
        'Hoàn toàn là người mới, chưa từng học lập trình',
        'Đã từng dùng công cụ No-code kéo thả (Scratch, Canva, AppSheet...)',
        'Đã có nền tảng cơ bản về HTML/CSS/JavaScript hoặc Python'
      ],
      keyMap: {
        'Hoàn toàn mới': 'Hoàn toàn là người mới, chưa từng học lập trình',
        'Đã dùng No-code kéo thả': 'Đã từng dùng công cụ No-code kéo thả (Scratch, Canva, AppSheet...)',
        'Đã biết lập trình cơ bản': 'Đã có nền tảng cơ bản về HTML/CSS/JavaScript hoặc Python'
      }
    },
    {
      id: 'q4',
      badge: '04',
      title: 'Rào cản lớn nhất của bạn khi ứng dụng AI vào công việc / giảng dạy?',
      options: [
        'Chưa biết cách viết câu lệnh (Prompt) để AI làm đúng ý mình',
        'Sợ kết quả AI không chính xác, khó kiểm soát chất lượng',
        'Thiếu ý tưởng sáng tạo và phương pháp ứng dụng thực tế vào bài dạy'
      ],
      keyMap: {
        'Chưa biết viết Prompt chuẩn': 'Chưa biết cách viết câu lệnh (Prompt) để AI làm đúng ý mình',
        'Sợ AI trả kết quả sai': 'Sợ kết quả AI không chính xác, khó kiểm soát chất lượng',
        'Thiếu ý tưởng ứng dụng': 'Thiếu ý tưởng sáng tạo và phương pháp ứng dụng thực tế vào bài dạy'
      }
    },
    {
      id: 'q5',
      badge: '05',
      title: 'Thời gian bạn có thể dành để thực hành làm Game AI mỗi tuần:',
      options: [
        'Dưới 2 giờ / tuần (Chỉ có thời gian xem video bài giảng)',
        'Từ 2 đến 5 giờ / tuần (Vừa học vừa hoàn thành bài tập)',
        'Trên 5 giờ / tuần (Quyết tâm làm chủ công cụ và xuất bản game)'
      ],
      keyMap: {
        'Dưới 2 giờ/tuần': 'Dưới 2 giờ / tuần (Chỉ có thời gian xem video bài giảng)',
        '2 đến 5 giờ/tuần': 'Từ 2 đến 5 giờ / tuần (Vừa học vừa hoàn thành bài tập)',
        'Trên 5 giờ/tuần': 'Trên 5 giờ / tuần (Quyết tâm làm chủ công cụ và xuất bản game)'
      }
    },
    {
      id: 'q6',
      badge: '06',
      title: 'Mục tiêu lớn nhất của bạn khi học làm Game giáo dục:',
      options: [
        'Tạo trò chơi khởi động, chống buồn ngủ cho học sinh trong tiết học',
        'Số hóa bài tập về nhà thành game thử thách để học sinh tự giác học',
        'Tổ chức các cuộc thi/sự kiện đố vui trực tuyến cho trường học',
        'Đóng gói sản phẩm Game tương tác để kinh doanh hoặc làm dịch vụ'
      ],
      keyMap: {
        'Tăng tương tác trên lớp': 'Tạo trò chơi khởi động, chống buồn ngủ cho học sinh trong tiết học',
        'Số hóa bài tập về nhà': 'Số hóa bài tập về nhà thành game thử thách để học sinh tự giác học',
        'Tổ chức sự kiện đố vui': 'Tổ chức các cuộc thi/sự kiện đố vui trực tuyến cho trường học',
        'Kinh doanh sản phẩm EdTech': 'Đóng gói sản phẩm Game tương tác để kinh doanh hoặc làm dịch vụ'
      }
    },
    {
      id: 'q7',
      badge: '07',
      title: 'Thể loại Game giáo dục bạn mong muốn tự tay tạo ra nhất:',
      options: [
        'Game Trắc nghiệm: Vòng quay may mắn, Chiếc nón kỳ diệu, Ai là triệu phú',
        'Game Trí nhớ: Lật thẻ bài, Ghép đôi hình - chữ, Nối từ nhanh',
        'Game Phiêu lưu: Vượt chướng ngại vật, Giải cứu thế giới qua câu hỏi',
        'Game Mô phỏng: Tương tác giải quyết tình huống theo cốt truyện'
      ],
      keyMap: {
        'Game Trắc nghiệm & Vòng quay': 'Game Trắc nghiệm: Vòng quay may mắn, Chiếc nón kỳ diệu, Ai là triệu phú',
        'Game Lật thẻ & Từ vựng': 'Game Trí nhớ: Lật thẻ bài, Ghép đôi hình - chữ, Nối từ nhanh',
        'Game Phiêu lưu & Giải đố': 'Game Phiêu lưu: Vượt chướng ngại vật, Giải cứu thế giới qua câu hỏi',
        'Game Mô phỏng tình huống': 'Game Mô phỏng: Tương tác giải quyết tình huống theo cốt truyện'
      }
    },
    {
      id: 'q8',
      badge: '08',
      title: 'Đối tượng người học (học sinh) mà bạn hướng tới phục vụ:',
      options: [
        'Mầm non & Tiểu học (Cần hình ảnh bắt mắt, âm thanh vui nhộn)',
        'THCS & THPT (Cần tính thử thách, cạnh tranh bảng xếp hạng)',
        'Sinh viên & Người đi làm (Cần tình huống thực tế, gamification đào tạo)'
      ],
      keyMap: {
        'Mầm non & Tiểu học': 'Mầm non & Tiểu học (Cần hình ảnh bắt mắt, âm thanh vui nhộn)',
        'THCS & THPT': 'THCS & THPT (Cần tính thử thách, cạnh tranh bảng xếp hạng)',
        'Sinh viên & Người đi làm': 'Sinh viên & Người đi làm (Cần tình huống thực tế, gamification đào tạo)'
      }
    },
    {
      id: 'q9',
      badge: '09',
      title: 'Yếu tố nào trong Game giáo dục bạn đánh giá là quan trọng nhất?',
      options: [
        'Học sinh chơi được ngay trên web điện thoại/máy tính không cần cài app',
        'Có tính năng tính điểm, bảng xếp hạng (Leaderboard) vinh danh học sinh',
        'Dễ dàng thay đổi bộ câu hỏi bài học sau này mà không cần code lại'
      ],
      keyMap: {
        'Chơi mượt không cần cài app': 'Học sinh chơi được ngay trên web điện thoại/máy tính không cần cài app',
        'Tính điểm & Bảng xếp hạng': 'Có tính năng tính điểm, bảng xếp hạng (Leaderboard) vinh danh học sinh',
        'Dễ đổi nội dung bài học': 'Dễ dàng thay đổi bộ câu hỏi bài học sau này mà không cần code lại'
      }
    },
    {
      id: 'q10',
      badge: '10',
      title: 'Kỳ vọng lớn nhất của bạn sau khi kết thúc khóa học cùng Thầy Được:',
      options: [
        'Tự tay xuất bản ít nhất 2–3 Game hoàn chỉnh đưa vào giảng dạy ngay',
        'Hiểu sâu bản chất để tự thiết kế bất kỳ ý tưởng game nào trong tương lai',
        'Được tham gia cộng đồng giáo viên ứng dụng AI và hỗ trợ kỹ thuật lâu dài'
      ],
      keyMap: {
        'Xuất bản 2-3 game đưa vào dạy ngay': 'Tự tay xuất bản ít nhất 2–3 Game hoàn chỉnh đưa vào giảng dạy ngay',
        'Làm chủ tự thiết kế mọi game': 'Hiểu sâu bản chất để tự thiết kế bất kỳ ý tưởng game nào trong tương lai',
        'Đồng hành hỗ trợ kỹ thuật lâu dài': 'Được tham gia cộng đồng giáo viên ứng dụng AI và hỗ trợ kỹ thuật lâu dài'
      }
    }
  ];

  // 2. Tham chiếu DOM
  const tabFormBtn = document.getElementById('tabFormBtn');
  const tabStatsBtn = document.getElementById('tabStatsBtn');
  const viewForm = document.getElementById('viewForm');
  const viewStats = document.getElementById('viewStats');

  const surveyForm = document.getElementById('surveyForm');
  const fullNameInput = document.getElementById('fullName');
  const zaloInput = document.getElementById('zalo');
  const progressText = document.getElementById('progressText');
  const progressBar = document.getElementById('progressBar');
  const submitSurveyBtn = document.getElementById('submitSurveyBtn');
  const btnText = submitSurveyBtn.querySelector('.btn-text');
  const btnLoader = submitSurveyBtn.querySelector('.btn-loader');

  const statsTotalCount = document.getElementById('statsTotalCount');
  const statsListContainer = document.getElementById('statsListContainer');
  const refreshStatsBtn = document.getElementById('refreshStatsBtn');
  const toastContainer = document.getElementById('toastContainer');

  let isSubmitting = false;
  let pollInterval = null;

  // 3. Xử lý Chuyển Tab (Form ⟷ Stats)
  tabFormBtn.addEventListener('click', () => switchTab('form'));
  tabStatsBtn.addEventListener('click', () => switchTab('stats'));

  function switchTab(tabName) {
    if (tabName === 'form') {
      tabFormBtn.classList.add('active');
      tabStatsBtn.classList.remove('active');
      viewForm.classList.add('active');
      viewStats.classList.remove('active');
      if (pollInterval) clearInterval(pollInterval);
    } else {
      tabStatsBtn.classList.add('active');
      tabFormBtn.classList.remove('active');
      viewStats.classList.add('active');
      viewForm.classList.remove('active');
      loadRealtimeStats();
      // Bật polling tự động 12s/lần khi ở tab Stats
      if (!pollInterval) {
        pollInterval = setInterval(loadRealtimeStats, 12000);
      }
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // 4. Theo dõi Tiến độ hoàn thành 10 câu hỏi
  const radioInputs = surveyForm.querySelectorAll('input[type="radio"]');
  radioInputs.forEach(radio => {
    radio.addEventListener('change', (e) => {
      // Highlight option được chọn
      const parentCard = radio.closest('.question-card');
      if (parentCard) {
        parentCard.querySelectorAll('.option-item').forEach(el => el.classList.remove('selected'));
        const label = radio.closest('.option-item');
        if (label) label.classList.add('selected');
      }
      updateProgress();
    });
  });

  function updateProgress() {
    let answered = 0;
    for (let i = 1; i <= 10; i++) {
      const selected = surveyForm.querySelector(`input[name="q${i}"]:checked`);
      if (selected) answered++;
    }
    progressText.textContent = `${answered}/10 câu`;
    const percent = (answered / 10) * 100;
    progressBar.style.width = `${percent}%`;
  }

  // 5. Toast Thông Báo
  function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;

    let iconHtml = '<i data-lucide="check-circle" class="toast-icon"></i>';
    if (type === 'error') iconHtml = '<i data-lucide="alert-circle" class="toast-icon"></i>';
    else if (type === 'warning') iconHtml = '<i data-lucide="alert-triangle" class="toast-icon"></i>';

    toast.innerHTML = `${iconHtml}<div class="toast-content">${message}</div>`;
    toastContainer.appendChild(toast);
    if (window.lucide) lucide.createIcons();

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(30px)';
      setTimeout(() => toast.remove(), 300);
    }, 4500);
  }

  // 6. Gửi Phiếu Khảo Sát (Submit)
  surveyForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    const fullName = fullNameInput.value.trim();
    let zalo = zaloInput.value.trim().replace(/[\s\.\-\+]/g, '');
    if (zalo.startsWith('84')) zalo = '0' + zalo.substring(2);

    if (!fullName || fullName.length < 2) {
      showToast('Vui lòng nhập đầy đủ Họ và Tên của bạn.', 'error');
      fullNameInput.focus();
      return;
    }

    const phoneRegex = /^(03|05|07|08|09)\d{8}$/;
    if (!phoneRegex.test(zalo)) {
      showToast('Số Zalo không hợp lệ (cần là số điện thoại VN 10 số).', 'error');
      zaloInput.focus();
      return;
    }

    // Thu thập câu trả lời
    const answers = {};
    let missingQuestions = [];
    for (let i = 1; i <= 10; i++) {
      const selected = surveyForm.querySelector(`input[name="q${i}"]:checked`);
      if (selected) {
        answers[`q${i}`] = selected.value;
      } else {
        missingQuestions.push(i);
      }
    }

    if (missingQuestions.length > 0) {
      showToast(`Bạn còn câu số [${missingQuestions.join(', ')}] chưa chọn. Vui lòng hoàn thành đủ 10 câu!`, 'warning');
      const firstMissingCard = surveyForm.querySelector(`.question-card[data-q="q${missingQuestions[0]}"]`);
      if (firstMissingCard) {
        firstMissingCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    // Tiến hành gửi lên Server
    isSubmitting = true;
    submitSurveyBtn.disabled = true;
    btnText.style.display = 'none';
    btnLoader.style.display = 'flex';

    try {
      const response = await fetch('/api/survey-submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fullName, zalo, answers })
      });

      const result = await response.json();

      if (result.success) {
        showToast('Cảm ơn bạn! Phiếu khảo sát đã được gửi và ghi nhận.', 'success');
        // Reset form & chuyển sang tab xem kết quả realtime
        surveyForm.reset();
        surveyForm.querySelectorAll('.option-item').forEach(el => el.classList.remove('selected'));
        updateProgress();

        if (result.data) {
          renderStatsView(result.data);
        }
        setTimeout(() => switchTab('stats'), 600);
      } else {
        showToast(result.message || 'Không thể gửi phiếu. Vui lòng thử lại!', 'error');
      }
    } catch (err) {
      console.error('Lỗi khi gửi phiếu khảo sát:', err);
      showToast('Lỗi mất kết nối mạng. Vui lòng kiểm tra internet và thử lại!', 'error');
    } finally {
      isSubmitting = false;
      submitSurveyBtn.disabled = false;
      btnText.style.display = 'flex';
      btnLoader.style.display = 'none';
    }
  });

  // 7. Tải và Render Kết Quả Thống Kê Realtime (%)
  async function loadRealtimeStats() {
    try {
      const res = await fetch('/api/survey-stats');
      const result = await res.json();
      if (result.success && result.data) {
        renderStatsView(result.data);
      }
    } catch (err) {
      console.error('Lỗi khi tải kết quả realtime:', err);
    }
  }

  refreshStatsBtn.addEventListener('click', () => {
    const icon = refreshStatsBtn.querySelector('.refresh-icon');
    if (icon) icon.style.animation = 'spin 0.6s linear infinite';
    loadRealtimeStats().then(() => {
      setTimeout(() => {
        if (icon) icon.style.animation = '';
      }, 600);
      showToast('Đã cập nhật số liệu mới nhất!', 'success');
    });
  });

  function renderStatsView(statsData) {
    statsTotalCount.textContent = statsData.totalResponses || 0;
    statsListContainer.innerHTML = '';

    QUESTIONS_DATA.forEach(q => {
      const qStats = (statsData.questions && statsData.questions[q.id]) || { total: 0, options: {}, percentages: {} };
      const totalQVotes = qStats.total || 0;

      // Tìm tỷ lệ cao nhất để highlight
      let maxPercent = -1;
      for (const optKey in q.keyMap) {
        const pct = (qStats.percentages && qStats.percentages[optKey]) || 0;
        if (pct > maxPercent && pct > 0) maxPercent = pct;
      }

      const card = document.createElement('div');
      card.className = 'stat-card';

      let optionsHtml = '';
      for (const [shortKey, fullLabel] of Object.entries(q.keyMap)) {
        const votes = (qStats.options && qStats.options[shortKey]) || 0;
        const percent = (qStats.percentages && qStats.percentages[shortKey]) || 0;
        const isHighest = percent > 0 && percent === maxPercent;

        optionsHtml += `
          <div class="stat-bar-row ${isHighest ? 'highest' : ''}">
            <div class="stat-bar-info">
              <span class="stat-opt-label">
                ${fullLabel}
                ${isHighest ? '<span class="highest-tag">🌟 Dẫn đầu</span>' : ''}
              </span>
              <div class="stat-opt-metric">
                <span class="stat-percent">${percent}%</span>
                <span class="stat-votes">(${votes} phiếu)</span>
              </div>
            </div>
            <div class="stat-bar-track">
              <div class="stat-bar-fill" style="width: ${percent}%;"></div>
            </div>
          </div>
        `;
      }

      card.innerHTML = `
        <div class="stat-q-header">
          <span class="stat-q-badge">${q.badge}</span>
          <h3 class="stat-q-title">${q.title}</h3>
        </div>
        <div class="stat-options-list">
          ${optionsHtml}
        </div>
      `;

      statsListContainer.appendChild(card);
    });

    if (window.lucide) lucide.createIcons();
  }

  // Tải dữ liệu stats sẵn sàng
  loadRealtimeStats();
});
