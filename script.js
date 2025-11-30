// إنشاء الحروف العشوائية المتحركة
const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
for (let i = 0; i < 70; i++) {
    const span = document.createElement('span');
    span.className = 'letter';
    span.style.left = Math.random() * window.innerWidth + 'px';
    span.style.top = Math.random() * window.innerHeight + 'px';
    span.textContent = letters[Math.floor(Math.random() * letters.length)];
    span.style.fontSize = (15 + Math.random() * 25) + 'px';
    span.style.animationDelay = Math.random() * 5 + 's';
    span.style.color = `hsl(${Math.random() * 360}, 50%, 80%)`;
    document.body.appendChild(span);
}

// دالة إخفاء جميع الصفحات
function hideAll() {
    document.querySelectorAll('.page').forEach(p => p.style.display = 'none');
}

// دالة التنقل إلى صفحة التسجيل عبر كود مع حركة ديناميكية
function switchToSignup() {
    const loginPage = document.getElementById('loginPage');
    const signupPage = document.getElementById('signupPage');
    loginPage.classList.add('hidden');
    setTimeout(() => {
        loginPage.style.display = 'none';
        signupPage.style.display = 'flex';
        setTimeout(() => {
            signupPage.classList.remove('hidden');
        }, 50);
    }, 500);
}

// دالة التنقل إلى صفحة تسجيل الدخول مع حركة ديناميكية
function switchToLogin() {
    const signupPage = document.getElementById('signupPage');
    const loginPage = document.getElementById('loginPage');
    signupPage.classList.add('hidden');
    setTimeout(() => {
        signupPage.style.display = 'none';
        loginPage.style.display = 'flex';
        setTimeout(() => {
            loginPage.classList.remove('hidden');
        }, 50);
    }, 500);
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

// دالة تسجيل عبر كود (مثال بسيط)
function signup() {
    const code = document.getElementById('code').value.trim();
    if (code === '1234') { // مثال: كود افتراضي
        alert('تم التسجيل بنجاح!');
        // هنا يمكن إضافة انتقال لصفحة أخرى
    } else {
        alert('كود غير صحيح');
    }
}

// إزالة hidden في البداية لصفحة الدخول
document.getElementById('loginPage').classList.remove('hidden');
