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

// تهيئة localStorage إذا لم تكن موجودة (حسابات افتراضية)
if (!localStorage.getItem('accounts')) {
    const defaultAccounts = [
        { username: 'student', password: '1234', role: 'student' },
        { username: 'teacher', password: '1234', role: 'teacher' },
        { username: 'admin', password: '1234', role: 'admin' }
    ];
    localStorage.setItem('accounts', JSON.stringify(defaultAccounts));
}
if (!localStorage.getItem('codes')) {
    localStorage.setItem('codes', JSON.stringify([]));
}

// دالة تسجيل الدخول بالحساب
function login() {
    const u = document.getElementById('username').value.trim();
    const p = document.getElementById('password').value.trim();
    const accounts = JSON.parse(localStorage.getItem('accounts')) || [];
    const user = accounts.find(acc => acc.username === u && acc.password === p);
    if (user) {
        hideAll();
        document.getElementById(`${user.role}Page`).style.display = 'block';
    } else {
        alert('بيانات غير صحيحة');
    }
}

// دالة تسجيل عبر كود
function signup() {
    const code = document.getElementById('code').value.trim();
    const codes = JSON.parse(localStorage.getItem('codes')) || [];
    if (codes.includes(code)) {
        hideAll();
        document.getElementById('studentPage').style.display = 'block'; // افتراضيًا كطالب
    } else {
        alert('كود غير صحيح');
    }
}

// دالة إنشاء كود جديد (عشوائي 6 أرقام)
function generateCode() {
    const newCode = Math.floor(100000 + Math.random() * 900000).toString(); // 6 أرقام
    const codes = JSON.parse(localStorage.getItem('codes')) || [];
    codes.push(newCode);
    localStorage.setItem('codes', JSON.stringify(codes));
    document.getElementById('generatedCode').textContent = `الكود الجديد: ${newCode} (انسخه للاستخدام)`;
}

// دالة إنشاء حساب جديد (من صفحة المعلم أو الإداري)
function createAccount(page) {
    const newU = document.getElementById(`newUsername${page.charAt(0).toUpperCase() + page.slice(1)}`).value.trim();
    const newP = document.getElementById(`newPassword${page.charAt(0).toUpperCase() + page.slice(1)}`).value.trim();
    if (newU && newP) {
        const accounts = JSON.parse(localStorage.getItem('accounts')) || [];
        if (accounts.find(acc => acc.username === newU)) {
            alert('اسم المستخدم موجود بالفعل');
            return;
        }
        accounts.push({ username: newU, password: newP, role: 'student' }); // افتراضيًا طالب
        localStorage.setItem('accounts', JSON.stringify(accounts));
        alert('تم إنشاء الحساب بنجاح!');
    } else {
        alert('أدخل البيانات كاملة');
    }
}

// إزالة hidden في البداية لصفحة الدخول
document.getElementById('loginPage').classList.remove('hidden');
