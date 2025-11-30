// إنشاء الحروف العشوائية المتحركة
const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
for (let i = 0; i < 50; i++) {
    const span = document.createElement('span');
    span.className = 'letter';
    span.style.left = Math.random() * window.innerWidth + 'px';
    span.style.top = Math.random() * window.innerHeight + 'px';
    span.textContent = letters[Math.floor(Math.random() * letters.length)];
    span.style.fontSize = (10 + Math.random() * 20) + 'px';
    document.body.appendChild(span);
}

// دالة إخفاء جميع الصفحات
function hideAll() {
    document.querySelectorAll('.page').forEach(p => p.style.display = 'none');
}

// دالة تسجيل الدخول
function login() {
    const u = document.getElementById('username').value.trim();
    const p = document.getElementById('password').value.trim();
    if (u === 'student' && p === '1234') {
        hideAll();
        document.getElementById('studentPage').style.display = 'block';
    } else if (u === 'teacher' && p === '1234') {
        hideAll();
        document.getElementById('teacherPage').style.display = 'block';
    } else if (u === 'admin' && p === '1234') {
        hideAll();
        document.getElementById('adminPage').style.display = 'block';
    } else {
        alert('بيانات غير صحيحة');
    }
}
