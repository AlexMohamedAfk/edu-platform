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

// دالة إنشاء حساب جديد من المودال
function createAccount() {
    const newU = document.getElementById('newUsername').value.trim();
    const newP = document.getElementById('newPassword').value.trim();
    const confirmP = document.getElementById('confirmPassword').value.trim();
    if (newU && newP && newP === confirmP) {
        const accounts = JSON.parse(localStorage.getItem('accounts')) || [];
        if (accounts.find(acc => acc.username === newU)) {
            alert('اسم المستخدم موجود بالفعل');
            return;
        }
        accounts.push({ username: newU, password: newP, role: 'student' }); // افتراضيًا طالب
        localStorage.setItem('accounts', JSON.stringify(accounts));
        alert('تم إنشاء الحساب بنجاح!');
        closeModal();
    } else {
        alert('أدخل البيانات كاملة أو تحقق من تطابق كلمة السر');
    }
}

// دالة فتح المودال
function openCreateAccountModal(page) {
    document.getElementById('createAccountModal').style.display = 'block';
    // يمكن تخصيص بناءً على الصفحة إذا لزم، لكن حاليًا عام
}

// دالة إغلاق المودال
function closeModal() {
    document.getElementById('createAccountModal').style.display = 'none';
    // مسح الحقول
    document.getElementById('newUsername').value = '';
    document.getElementById('newPassword').value = '';
    document.getElementById('confirmPassword').value = '';
}

// دالة تبديل إظهار/إخفاء الباسورد
function togglePassword(id) {
    const input = document.getElementById(id);
    const icon = input.nextElementSibling;
    if (input.type === 'password') {
        input.type = 'text';
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
    } else {
        input.type = 'password';
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
    }
}

// دالة تسجيل خروج
function logout() {
    hideAll();
    document.getElementById('loginPage').style.display = 'flex';
    document.getElementById('loginPage').classList.remove('hidden');
}

// إزالة hidden في البداية لصفحة الدخول
document.getElementById('loginPage').classList.remove('hidden');
