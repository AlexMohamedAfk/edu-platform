// إنشاء الحروف العشوائية المتحركة (حسنتها)
const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
for (let i = 0; i < 70; i++) { // زدت العدد لأكثر حيوية
    const span = document.createElement('span');
    span.className = 'letter';
    span.style.left = Math.random() * window.innerWidth + 'px';
    span.style.top = Math.random() * window.innerHeight + 'px';
    span.textContent = letters[Math.floor(Math.random() * letters.length)];
    span.style.fontSize = (15 + Math.random() * 25) + 'px';
    span.style.animationDelay = Math.random() * 5 + 's'; // تأخير عشوائي
    span.style.color = `hsl(${Math.random() * 360}, 50%, 80%)`; // ألوان خفيفة متنوعة
    document.body.appendChild(span);
}

// دالة إخفاء جميع الصفحات
function hideAll() {
    document.querySelectorAll('.page').forEach(p => p.style.display = 'none');
}

// دالة عرض النموذج مع انتقال ديناميكي
function showForm(type) {
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    const loginBtn = document.querySelector('.choice-btn[onclick="showForm(\'login\')"]');
    const signupBtn = document.querySelector('.choice-btn[onclick="showForm(\'signup\')"]');

    loginForm.classList.remove('active');
    signupForm.classList.remove('active');
    loginBtn.classList.remove('active');
    signupBtn.classList.remove('active');

    if (type === 'login') {
        loginForm.classList.add('active');
        loginBtn.classList.add('active');
    } else if (type === 'signup') {
        signupForm.classList.add('active');
        signupBtn.classList.add('active');
    }
}

// دالة تسجيل الدخول (مثال بسيط، يمكن تعديلها)
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

// دالة تسجيل عبر كود (مثال بسيط، يمكن إضافة وظيفة حقيقية)
function signup() {
    const email = document.getElementById('email').value.trim();
    const code = document.getElementById('code').value.trim();
    if (email && code === '1234') { // مثال: كود افتراضي
        alert('تم التسجيل بنجاح!');
        // هنا يمكن إضافة انتقال لصفحة أخرى
    } else {
        alert('بيانات غير صحيحة');
    }
}
