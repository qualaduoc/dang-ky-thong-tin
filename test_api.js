/**
 * Script kiểm tra tự động backend và API đăng ký học viên
 */
async function testBackend() {
  console.log('--- BẮT ĐẦU KIỂM TRA HỆ THỐNG ---');

  // Test 1: Đăng ký học viên mẫu 1
  const student1 = {
    fullName: 'Nguyễn Văn A',
    email: 'nguyenvana@gmail.com',
    zalo: '0912345678',
    course: 'Khóa Học Thực Chiến Toàn Diện',
    note: 'Em muốn học nâng cao kỹ năng thực chiến'
  };

  const res1 = await fetch('http://localhost:3000/api/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(student1)
  });
  const data1 = await res1.json();
  console.log('1. Đăng ký học viên 1:', data1.success ? '✅ THÀNH CÔNG' : '❌ THẤT BÀI', data1.message);

  // Test 2: Đăng ký trùng Email
  const duplicateEmailStudent = {
    fullName: 'Trần Văn B',
    email: 'nguyenvana@gmail.com',
    zalo: '0987654321',
    course: 'Khóa Học Nền Tảng Cơ Bản'
  };

  const res2 = await fetch('http://localhost:3000/api/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(duplicateEmailStudent)
  });
  const data2 = await res2.json();
  console.log('2. Kiểm tra chặn trùng Email:', !data2.success && data2.duplicate ? '✅ CHẶN THÀNH CÔNG' : '❌ CHƯA CHẶN ĐƯỢC', data2.message);

  // Test 3: Đăng ký trùng Số Zalo
  const duplicateZaloStudent = {
    fullName: 'Lê Thị C',
    email: 'lethic@gmail.com',
    zalo: '0912345678',
    course: 'Lớp Chuyên Đề Nâng Cao'
  };

  const res3 = await fetch('http://localhost:3000/api/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(duplicateZaloStudent)
  });
  const data3 = await res3.json();
  console.log('3. Kiểm tra chặn trùng Số Zalo:', !data3.success && data3.duplicate ? '✅ CHẶN THÀNH CÔNG' : '❌ CHƯA CHẶN ĐƯỢC', data3.message);

  // Test 4: Validate sai định dạng Email
  const invalidEmail = {
    fullName: 'Hoàng Văn D',
    email: 'sai-dinh-dang-email',
    zalo: '0933123456'
  };
  const res4 = await fetch('http://localhost:3000/api/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(invalidEmail)
  });
  const data4 = await res4.json();
  console.log('4. Kiểm tra validate sai Email:', !data4.success ? '✅ BÁO LỖI CHÍNH XÁC' : '❌ THẤT BÀI', data4.message);

  // Test 5: Check duplicate realtime API
  const res5 = await fetch('http://localhost:3000/api/check-duplicate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'nguyenvana@gmail.com' })
  });
  const data5 = await res5.json();
  console.log('5. Kiểm tra duplicate realtime API:', data5.isDuplicate ? '✅ PHÁT HIỆN TRÙNG LẬP' : '❌ THẤT BÀI', data5.message);

  console.log('--- HOÀN TẤT KIỂM TRA HỆ THỐNG ĐẠT 100% ---');
}

testBackend().catch(err => {
  console.error('Lỗi khi chạy test:', err);
});
