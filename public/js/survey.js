/**
 * ===================================================================
 * PHÂN TÍCH BIỂU ĐỒ HÌNH CỘT REALTIME (COMBO BAR & TREND LINE CHART)
 * Tích hợp Chart.js chuẩn phong cách phân tích Dashboard chuyên nghiệp
 * ===================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Cấu hình danh mục 10 câu hỏi & các lựa chọn
  const QUESTIONS_DATA = [
    {
      id: 'q1',
      badge: '01',
      title: 'Mức độ sử dụng các công cụ AI (ChatGPT, Claude, Gemini...) của bạn?',
      shortTitle: 'Mức độ dùng AI',
      options: [
        'Mới bắt đầu / Chưa từng sử dụng',
        'Thỉnh thoảng tra cứu thông tin / hỏi đáp đơn giản',
        'Dùng thường xuyên để soạn giáo án, viết nội dung',
        'Đã thành thạo kỹ thuật viết Prompt nâng cao (Role, Context, Chain-of-thought)'
      ],
      keyMap: {
        'Chưa từng dùng': 'Chưa từng dùng',
        'Thỉnh thoảng tra cứu': 'Thỉnh thoảng',
        'Dùng thường xuyên': 'Dùng hàng ngày',
        'Thành thạo Prompt nâng cao': 'Thành thạo Prompt'
      },
      fullLabels: {
        'Chưa từng dùng': 'Mới bắt đầu / Chưa từng sử dụng',
        'Thỉnh thoảng tra cứu': 'Thỉnh thoảng tra cứu thông tin / hỏi đáp',
        'Dùng thường xuyên': 'Dùng thường xuyên để soạn giáo án',
        'Thành thạo Prompt nâng cao': 'Đã thành thạo kỹ thuật viết Prompt nâng cao'
      }
    },
    {
      id: 'q2',
      badge: '02',
      title: 'Bạn đã từng biết hoặc sử dụng nền tảng Agnes AI chưa?',
      shortTitle: 'Trải nghiệm Agnes AI',
      options: [
        'Chưa từng nghe tới Agnes AI',
        'Đã nghe giới thiệu nhưng chưa thử tạo game bao giờ',
        'Đã dùng thử để tạo một vài game/ứng dụng mẫu cơ bản',
        'Đã thành thạo tạo game và tùy biến logic với Agnes AI'
      ],
      keyMap: {
        'Chưa từng nghe': 'Chưa từng nghe',
        'Đã nghe nhưng chưa dùng': 'Đã nghe qua',
        'Đã tạo thử game mẫu': 'Đã tạo thử mẫu',
        'Đã thành thạo Agnes AI': 'Đã thành thạo'
      },
      fullLabels: {
        'Chưa từng nghe': 'Chưa từng nghe tới Agnes AI',
        'Đã nghe nhưng chưa dùng': 'Đã nghe giới thiệu nhưng chưa thử tạo game',
        'Đã tạo thử game mẫu': 'Đã dùng thử tạo một vài game mẫu',
        'Đã thành thạo Agnes AI': 'Đã thành thạo tạo game với Agnes AI'
      }
    },
    {
      id: 'q3',
      badge: '03',
      title: 'Khả năng tư duy logic và nền tảng kỹ thuật hiện tại của bạn:',
      shortTitle: 'Tư duy lập trình',
      options: [
        'Hoàn toàn là người mới, chưa từng học lập trình',
        'Đã từng dùng công cụ No-code kéo thả (Scratch, Canva, AppSheet...)',
        'Đã có nền tảng cơ bản về HTML/CSS/JavaScript hoặc Python'
      ],
      keyMap: {
        'Hoàn toàn mới': 'Người mới 100%',
        'Đã dùng No-code kéo thả': 'Đã dùng No-Code',
        'Đã biết lập trình cơ bản': 'Đã biết Code cơ bản'
      },
      fullLabels: {
        'Hoàn toàn mới': 'Hoàn toàn là người mới, chưa từng học lập trình',
        'Đã dùng No-code kéo thả': 'Đã từng dùng công cụ No-code kéo thả',
        'Đã biết lập trình cơ bản': 'Đã có nền tảng HTML/CSS/JS/Python'
      }
    },
    {
      id: 'q4',
      badge: '04',
      title: 'Rào cản lớn nhất của bạn khi ứng dụng AI vào công việc / giảng dạy?',
      shortTitle: 'Rào cản khi dùng AI',
      options: [
        'Chưa biết cách viết câu lệnh (Prompt) để AI làm đúng ý mình',
        'Sợ kết quả AI không chính xác, khó kiểm soát chất lượng',
        'Thiếu ý tưởng sáng tạo và phương pháp ứng dụng thực tế vào bài dạy'
      ],
      keyMap: {
        'Chưa biết viết Prompt chuẩn': 'Chưa biết viết Prompt',
        'Sợ AI trả kết quả sai': 'Sợ kết quả sai',
        'Thiếu ý tưởng ứng dụng': 'Thiếu ý tưởng dạy'
      },
      fullLabels: {
        'Chưa biết viết Prompt chuẩn': 'Chưa biết cách viết Prompt đúng ý',
        'Sợ AI trả kết quả sai': 'Sợ kết quả AI không chính xác',
        'Thiếu ý tưởng ứng dụng': 'Thiếu ý tưởng sáng tạo vào bài dạy'
      }
    },
    {
      id: 'q5',
      badge: '05',
      title: 'Thời gian bạn có thể dành để thực hành làm Game AI mỗi tuần:',
      shortTitle: 'Thời gian học/tuần',
      options: [
        'Dưới 2 giờ / tuần (Chỉ có thời gian xem video bài giảng)',
        'Từ 2 đến 5 giờ / tuần (Vừa học vừa hoàn thành bài tập)',
        'Trên 5 giờ / tuần (Quyết tâm làm chủ công cụ và xuất bản game)'
      ],
      keyMap: {
        'Dưới 2 giờ/tuần': '< 2 giờ / tuần',
        '2 đến 5 giờ/tuần': '2 - 5 giờ / tuần',
        'Trên 5 giờ/tuần': '> 5 giờ / tuần'
      },
      fullLabels: {
        'Dưới 2 giờ/tuần': 'Dưới 2 giờ / tuần (Xem video)',
        '2 đến 5 giờ/tuần': 'Từ 2 - 5 giờ / tuần (Làm bài tập)',
        'Trên 5 giờ/tuần': 'Trên 5 giờ / tuần (Làm chủ công cụ)'
      }
    },
    {
      id: 'q6',
      badge: '06',
      title: 'Mục tiêu lớn nhất của bạn khi học làm Game giáo dục:',
      shortTitle: 'Mục tiêu làm Game',
      options: [
        'Tạo trò chơi khởi động, chống buồn ngủ cho học sinh trong tiết học',
        'Số hóa bài tập về nhà thành game thử thách để học sinh tự giác học',
        'Tổ chức các cuộc thi/sự kiện đố vui trực tuyến cho trường học',
        'Đóng gói sản phẩm Game tương tác để kinh doanh hoặc làm dịch vụ'
      ],
      keyMap: {
        'Tăng tương tác trên lớp': 'Tăng tương tác lớp',
        'Số hóa bài tập về nhà': 'Số hóa bài tập',
        'Tổ chức sự kiện đố vui': 'Tổ chức cuộc thi',
        'Kinh doanh sản phẩm EdTech': 'Kinh doanh / Dịch vụ'
      },
      fullLabels: {
        'Tăng tương tác trên lớp': 'Tạo trò chơi chống buồn ngủ trong tiết học',
        'Số hóa bài tập về nhà': 'Số hóa bài tập thành game thử thách',
        'Tổ chức sự kiện đố vui': 'Tổ chức sự kiện đố vui trường học',
        'Kinh doanh sản phẩm EdTech': 'Đóng gói sản phẩm Game để kinh doanh'
      }
    },
    {
      id: 'q7',
      badge: '07',
      title: 'Thể loại Game giáo dục bạn mong muốn tự tay tạo ra nhất:',
      shortTitle: 'Thể loại Game thích nhất',
      options: [
        'Game Trắc nghiệm: Vòng quay may mắn, Chiếc nón kỳ diệu, Ai là triệu phú',
        'Game Trí nhớ: Lật thẻ bài, Ghép đôi hình - chữ, Nối từ nhanh',
        'Game Phiêu lưu: Vượt chướng ngại vật, Giải cứu thế giới qua câu hỏi',
        'Game Mô phỏng: Tương tác giải quyết tình huống theo cốt truyện'
      ],
      keyMap: {
        'Game Trắc nghiệm & Vòng quay': 'Trắc nghiệm / Vòng quay',
        'Game Lật thẻ & Từ vựng': 'Lật thẻ / Trí nhớ',
        'Game Phiêu lưu & Giải đố': 'Phiêu lưu / Vượt ải',
        'Game Mô phỏng tình huống': 'Mô phỏng tình huống'
      },
      fullLabels: {
        'Game Trắc nghiệm & Vòng quay': 'Game Trắc nghiệm / Vòng quay may mắn',
        'Game Lật thẻ & Từ vựng': 'Game Trí nhớ / Lật thẻ bài / Nối từ',
        'Game Phiêu lưu & Giải đố': 'Game Phiêu lưu / Vượt chướng ngại vật',
        'Game Mô phỏng tình huống': 'Game Mô phỏng / Xử lý tình huống'
      }
    },
    {
      id: 'q8',
      badge: '08',
      title: 'Đối tượng người học (học sinh) mà bạn hướng tới phục vụ:',
      shortTitle: 'Đối tượng học sinh',
      options: [
        'Mầm non & Tiểu học (Cần hình ảnh bắt mắt, âm thanh vui nhộn)',
        'THCS & THPT (Cần tính thử thách, cạnh tranh bảng xếp hạng)',
        'Sinh viên & Người đi làm (Cần tình huống thực tế, gamification đào tạo)'
      ],
      keyMap: {
        'Mầm non & Tiểu học': 'Mầm non & Tiểu học',
        'THCS & THPT': 'THCS & THPT',
        'Sinh viên & Người đi làm': 'Người đi làm / SV'
      },
      fullLabels: {
        'Mầm non & Tiểu học': 'Mầm non & Tiểu học (Hình ảnh vui nhộn)',
        'THCS & THPT': 'THCS & THPT (Thử thách & Xếp hạng)',
        'Sinh viên & Người đi làm': 'Sinh viên & Người đi làm (Thực tế)'
      }
    },
    {
      id: 'q9',
      badge: '09',
      title: 'Yếu tố nào trong Game giáo dục bạn đánh giá là quan trọng nhất?',
      shortTitle: 'Yếu tố quan trọng nhất',
      options: [
        'Học sinh chơi được ngay trên web điện thoại/máy tính không cần cài app',
        'Có tính năng tính điểm, bảng xếp hạng (Leaderboard) vinh danh học sinh',
        'Dễ dàng thay đổi bộ câu hỏi bài học sau này mà không cần code lại'
      ],
      keyMap: {
        'Chơi mượt không cần cài app': 'Không cần cài App',
        'Tính điểm & Bảng xếp hạng': 'Bảng xếp hạng',
        'Dễ đổi nội dung bài học': 'Dễ đổi câu hỏi'
      },
      fullLabels: {
        'Chơi mượt không cần cài app': 'Chơi được ngay trên Web không cần cài app',
        'Tính điểm & Bảng xếp hạng': 'Có tính điểm & Bảng xếp hạng (Leaderboard)',
        'Dễ đổi nội dung bài học': 'Dễ dàng thay đổi câu hỏi mà không cần code'
      }
    },
    {
      id: 'q10',
      badge: '10',
      title: 'Kỳ vọng lớn nhất của bạn sau khi kết thúc khóa học cùng Thầy Được:',
      shortTitle: 'Kỳ vọng sau khóa học',
      options: [
        'Tự tay xuất bản ít nhất 2–3 Game hoàn chỉnh đưa vào giảng dạy ngay',
        'Hiểu sâu bản chất để tự thiết kế bất kỳ ý tưởng game nào trong tương lai',
        'Được tham gia cộng đồng giáo viên ứng dụng AI và hỗ trợ kỹ thuật lâu dài'
      ],
      keyMap: {
        'Xuất bản 2-3 game đưa vào dạy ngay': 'Xuất bản 2-3 Game',
        'Làm chủ tự thiết kế mọi game': 'Tự tạo mọi ý tưởng',
        'Đồng hành hỗ trợ kỹ thuật lâu dài': 'Đồng hành lâu dài'
      },
      fullLabels: {
        'Xuất bản 2-3 game đưa vào dạy ngay': 'Tự tay xuất bản ít nhất 2-3 Game dạy ngay',
        'Làm chủ tự thiết kế mọi game': 'Hiểu sâu bản chất để tự thiết kế mọi game',
        'Đồng hành hỗ trợ kỹ thuật lâu dài': 'Tham gia cộng đồng và hỗ trợ kỹ thuật lâu dài'
      }
    }
  ];

  // 2. Tham chiếu DOM
  const surveyForm = document.getElementById('surveyForm');
  const fullNameInput = document.getElementById('fullName');
  const zaloInput = document.getElementById('zalo');
  const progressText = document.getElementById('progressText');
  const progressBar = document.getElementById('progressBar');
  const submitSurveyBtn = document.getElementById('submitSurveyBtn');
  const btnText = submitSurveyBtn.querySelector('.btn-text');
  const btnLoader = submitSurveyBtn.querySelector('.btn-loader');

  const statsTotalCount = document.getElementById('statsTotalCount');
  const chartQuestionSelect = document.getElementById('chartQuestionSelect');
  const refreshStatsBtn = document.getElementById('refreshStatsBtn');
  const insightsBody = document.getElementById('insightsBody');
  const toastContainer = document.getElementById('toastContainer');

  // Mobile elements
  const tabFormBtn = document.getElementById('tabFormBtn');
  const tabStatsBtn = document.getElementById('tabStatsBtn');
  const surveyFormColumn = document.getElementById('surveyFormColumn');
  const surveyChartColumn = document.getElementById('surveyChartColumn');

  let isSubmitting = false;
  let chartInstance = null;
  let cachedStatsData = null;

  // 3. Khởi tạo Biểu đồ Chart.js (Combo Bar & Line Chart)
  function initOrUpdateChart(viewMode = 'overview') {
    const ctx = document.getElementById('surveyAnalyticsChart');
    if (!ctx) return;

    if (!cachedStatsData) return;

    let labels = [];
    let barData = [];
    let lineData = [];
    let fullTooltips = [];
    let chartTitle = '';

    if (viewMode === 'overview') {
      // Chế độ Toàn Cảnh: 10 Cột dọc thể hiện 10 Câu Hỏi
      chartTitle = 'Chỉ số bình chọn nổi bật qua 10 câu hỏi (%)';
      QUESTIONS_DATA.forEach((q, idx) => {
        labels.push(`C${idx + 1}`);
        const qStats = (cachedStatsData.questions && cachedStatsData.questions[q.id]) || { percentages: {} };
        
        // Lấy tỷ lệ phương án cao nhất của câu đó
        let maxPct = 0;
        let topOptionLabel = 'Chưa có phiếu';
        for (const optKey in q.keyMap) {
          const pct = (qStats.percentages && qStats.percentages[optKey]) || 0;
          if (pct >= maxPct && pct > 0) {
            maxPct = pct;
            topOptionLabel = q.fullLabels[optKey] || optKey;
          }
        }
        barData.push(maxPct);
        lineData.push(maxPct);
        fullTooltips.push(`Câu ${q.badge}: ${q.shortTitle}\n🏆 Lựa chọn top 1 (${maxPct}%): ${topOptionLabel}`);
      });
    } else {
      // Chế độ Xem Chi Tiết 1 Câu Hỏi Cụ Thể
      const targetQ = QUESTIONS_DATA.find(q => q.id === viewMode);
      if (targetQ) {
        chartTitle = `Chi tiết Câu ${targetQ.badge}: ${targetQ.shortTitle}`;
        const qStats = (cachedStatsData.questions && cachedStatsData.questions[targetQ.id]) || { percentages: {}, options: {} };

        for (const [shortKey, chartLabel] of Object.entries(targetQ.keyMap)) {
          labels.push(chartLabel);
          const pct = (qStats.percentages && qStats.percentages[shortKey]) || 0;
          const votes = (qStats.options && qStats.options[shortKey]) || 0;
          barData.push(pct);
          lineData.push(pct);
          fullTooltips.push(`${targetQ.fullLabels[shortKey] || shortKey}: ${pct}% (${votes} phiếu)`);
        }
      }
    }

    // Nếu chart đã tồn tại -> hủy để vẽ lại mượt mà
    if (chartInstance) {
      chartInstance.destroy();
    }

    chartInstance = new Chart(ctx, {
      data: {
        labels: labels,
        datasets: [
          {
            type: 'bar',
            label: 'Tỷ lệ bình chọn (%)',
            data: barData,
            backgroundColor: 'rgba(59, 130, 246, 0.82)', // Màu xanh dương chuyên nghiệp như ảnh đính kèm
            borderColor: '#2563EB',
            borderWidth: 1.5,
            borderRadius: 6,
            barPercentage: 0.65,
            categoryPercentage: 0.8
          },
          {
            type: 'line',
            label: 'Đường xu hướng',
            data: lineData,
            borderColor: '#F97316', // Màu cam rực rỡ như ảnh đính kèm
            backgroundColor: '#F97316',
            borderWidth: 3,
            pointBackgroundColor: '#FFFFFF',
            pointBorderColor: '#EA580C',
            pointBorderWidth: 2.5,
            pointRadius: 4.5,
            pointHoverRadius: 7,
            tension: 0.25,
            fill: false
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: {
          duration: 750,
          easing: 'easeOutQuart'
        },
        interaction: {
          mode: 'index',
          intersect: false
        },
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              boxWidth: 14,
              boxHeight: 10,
              font: {
                family: 'Plus Jakarta Sans',
                size: 11.5,
                weight: '600'
              },
              color: '#334155',
              padding: 12
            }
          },
          tooltip: {
            backgroundColor: 'rgba(18, 3, 2, 0.92)',
            titleFont: { family: 'Plus Jakarta Sans', size: 12.5, weight: '700' },
            bodyFont: { family: 'Plus Jakarta Sans', size: 12 },
            padding: 10,
            cornerRadius: 8,
            borderColor: '#D4AF37',
            borderWidth: 1,
            callbacks: {
              label: function(context) {
                return ` ${context.dataset.label}: ${context.parsed.y}%`;
              }
            }
          }
        },
        scales: {
          x: {
            grid: {
              display: false
            },
            ticks: {
              font: {
                family: 'Plus Jakarta Sans',
                size: 11,
                weight: '700'
              },
              color: '#475569'
            }
          },
          y: {
            min: 0,
            max: 100,
            grid: {
              color: '#E2E8F0',
              drawBorder: false
            },
            ticks: {
              stepSize: 20,
              font: {
                family: 'Plus Jakarta Sans',
                size: 11,
                weight: '600'
              },
              color: '#64748B',
              callback: function(value) {
                return value + '%';
              }
            }
          }
        }
      }
    });

    renderInsights(cachedStatsData);
  }

  // 4. Render Bảng Tóm Tắt Phân Tích (Key Insights)
  function renderInsights(statsData) {
    if (!statsData || !insightsBody) return;
    const total = statsData.totalResponses || 0;

    if (total === 0) {
      insightsBody.innerHTML = `
        <p class="insights-item">📝 <em>Chưa có phiếu khảo sát nào. Hãy là người đầu tiên tham gia bình chọn!</em></p>
      `;
      return;
    }

    // Phân tích câu 7: Thể loại Game
    const q7Stats = (statsData.questions && statsData.questions.q7) || { percentages: {} };
    let topGame = 'Game Trắc nghiệm';
    let topGamePct = 0;
    for (const k in q7Stats.percentages) {
      if (q7Stats.percentages[k] > topGamePct) {
        topGamePct = q7Stats.percentages[k];
        topGame = k;
      }
    }

    // Phân tích câu 1: Mức độ dùng AI
    const q1Stats = (statsData.questions && statsData.questions.q1) || { percentages: {} };
    const proAiPct = ((q1Stats.percentages && q1Stats.percentages['Dùng thường xuyên']) || 0) + 
                     ((q1Stats.percentages && q1Stats.percentages['Thành thạo Prompt nâng cao']) || 0);

    insightsBody.innerHTML = `
      <div class="insights-item">
        <span>👥</span>
        <div>Tổng số học viên đã bình chọn: <strong>${total} người</strong>.</div>
      </div>
      <div class="insights-item">
        <span>🎮</span>
        <div>Thể loại Game được mong chờ nhất: <strong>${topGame} (${topGamePct}%)</strong>.</div>
      </div>
      <div class="insights-item">
        <span>🤖</span>
        <div>Tỷ lệ học viên đã quen dùng AI: <strong>${proAiPct}%</strong> (sẵn sàng làm chủ Agnes AI).</div>
      </div>
    `;
  }

  // 5. Sự kiện đổi góc nhìn phân tích trong Dropdown
  if (chartQuestionSelect) {
    chartQuestionSelect.addEventListener('change', (e) => {
      initOrUpdateChart(e.target.value);
    });
  }

  // 6. Mobile View Switcher
  if (tabFormBtn && tabStatsBtn) {
    tabFormBtn.addEventListener('click', () => {
      tabFormBtn.classList.add('active');
      tabStatsBtn.classList.remove('active');
      surveyFormColumn.classList.remove('hidden-mobile');
      surveyChartColumn.classList.remove('active-mobile');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    tabStatsBtn.addEventListener('click', () => {
      tabStatsBtn.classList.add('active');
      tabFormBtn.classList.remove('active');
      surveyFormColumn.classList.add('hidden-mobile');
      surveyChartColumn.classList.add('active-mobile');
      loadRealtimeStats();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // 7. Theo dõi Tiến độ & Tự động đổi biểu đồ sang câu đang chọn
  const radioInputs = surveyForm.querySelectorAll('input[type="radio"]');
  radioInputs.forEach(radio => {
    radio.addEventListener('change', () => {
      const parentCard = radio.closest('.question-card');
      if (parentCard) {
        parentCard.querySelectorAll('.option-item').forEach(el => el.classList.remove('selected'));
        const label = radio.closest('.option-item');
        if (label) label.classList.add('selected');

        // Tự động chuyển dropdown biểu đồ sang câu đó để đối soát tức thì
        const qId = parentCard.getAttribute('data-q');
        if (qId && chartQuestionSelect && chartQuestionSelect.value !== qId) {
          chartQuestionSelect.value = qId;
          initOrUpdateChart(qId);
        }
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

  // 8. Toast Thông Báo
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

  // 9. Gửi Phiếu Khảo Sát (Submit)
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
      showToast(`Bạn còn câu số [${missingQuestions.join(', ')}] chưa chọn. Vui lòng chọn đủ 10 câu!`, 'warning');
      const firstMissingCard = surveyForm.querySelector(`.question-card[data-q="q${missingQuestions[0]}"]`);
      if (firstMissingCard) {
        firstMissingCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

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
        showToast('Cảm ơn bạn! Phiếu khảo sát đã được gửi và cập nhật biểu đồ.', 'success');
        surveyForm.reset();
        surveyForm.querySelectorAll('.option-item').forEach(el => el.classList.remove('selected'));
        updateProgress();

        if (result.data) {
          cachedStatsData = result.data;
          statsTotalCount.textContent = result.data.totalResponses || 0;
          initOrUpdateChart(chartQuestionSelect ? chartQuestionSelect.value : 'overview');
        }

        if (window.innerWidth < 1024 && tabStatsBtn) {
          tabStatsBtn.click();
        }
      } else {
        showToast(result.message || 'Không thể gửi phiếu. Vui lòng thử lại!', 'error');
      }
    } catch (err) {
      console.error('Lỗi khi gửi phiếu khảo sát:', err);
      showToast('Lỗi kết nối mạng. Vui lòng thử lại sau!', 'error');
    } finally {
      isSubmitting = false;
      submitSurveyBtn.disabled = false;
      btnText.style.display = 'flex';
      btnLoader.style.display = 'none';
    }
  });

  // 10. Tải và Cập nhật Biểu Đồ Realtime
  async function loadRealtimeStats() {
    try {
      const res = await fetch('/api/survey-stats');
      const result = await res.json();
      if (result.success && result.data) {
        cachedStatsData = result.data;
        statsTotalCount.textContent = result.data.totalResponses || 0;
        initOrUpdateChart(chartQuestionSelect ? chartQuestionSelect.value : 'overview');
      }
    } catch (err) {
      console.error('Lỗi khi tải kết quả realtime:', err);
    }
  }

  if (refreshStatsBtn) {
    refreshStatsBtn.addEventListener('click', () => {
      const icon = refreshStatsBtn.querySelector('.refresh-icon');
      if (icon) icon.style.animation = 'spin 0.6s linear infinite';
      loadRealtimeStats().then(() => {
        setTimeout(() => {
          if (icon) icon.style.animation = '';
        }, 600);
        showToast('Đã làm mới biểu đồ phân tích!', 'success');
      });
    });
  }

  // Tải dữ liệu ban đầu & lặp 10 giây/lần
  loadRealtimeStats();
  setInterval(loadRealtimeStats, 10000);
});
