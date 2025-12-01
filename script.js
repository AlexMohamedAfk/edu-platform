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

// دالة عرض إشعار
function showNotification(message, type = 'success') {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.classList.remove('error');
    if (type === 'error') notification.classList.add('error');
    notification.style.display = 'block';
    setTimeout(() => {
        notification.style.display = 'none';
    }, 3000);
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
        showNotification('تم تسجيل الدخول بنجاح!');
    } else {
        showNotification('بيانات غير صحيحة', 'error');
    }
}

// دالة تسجيل عبر كود
function signup() {
    const code = document.getElementById('code').value.trim();
    const codes = JSON.parse(localStorage.getItem('codes')) || [];
    if (codes.includes(code)) {
        hideAll();
        document.getElementById('studentPage').style.display = 'block';
        showNotification('تم التسجيل بنجاح عبر الكود!');
    } else {
        showNotification('كود غير صحيح', 'error');
    }
}

// دالة إنشاء كود جديد (عشوائي 6 أرقام)
function generateCode() {
    const newCode = Math.floor(100000 + Math.random() * 900000).toString();
    const codes = JSON.parse(localStorage.getItem('codes')) || [];
    codes.push(newCode);
    localStorage.setItem('codes', JSON.stringify(codes));
    // عرض الكود في الصفحة المناسبة
    const generatedCodeElements = {
        'teacher': 'teacherGeneratedCode',
        'assistant': 'assistantGeneratedCode',
        'admin': 'adminGeneratedCode'
    };
    for (const role in generatedCodeElements) {
        const elem = document.getElementById(generatedCodeElements[role]);
        if (elem) {
            elem.textContent = `الكود الجديد: ${newCode} (انسخه للاستخدام)`;
            showNotification('تم إنشاء كود جديد!');
            return;
        }
    }
    document.getElementById('generatedCode').textContent = `الكود الجديد: ${newCode} (انسخه للاستخدام)`;
    showNotification('تم إنشاء كود جديد!');
}

// دالة إنشاء حساب جديد من المودال (مع دعم role)
let currentRole = 'student';
function createAccount() {
    const newU = document.getElementById('newUsername').value.trim();
    const newP = document.getElementById('newPassword').value.trim();
    const confirmP = document.getElementById('confirmPassword').value.trim();
    if (newU && newP && newP === confirmP) {
        const accounts = JSON.parse(localStorage.getItem('accounts')) || [];
        if (accounts.find(acc => acc.username === newU)) {
            showNotification('اسم المستخدم موجود بالفعل', 'error');
            return;
        }
        accounts.push({ username: newU, password: newP, role: currentRole });
        localStorage.setItem('accounts', JSON.stringify(accounts));
        showNotification('تم إنشاء الحساب بنجاح!');
        closeModal();
    } else {
        showNotification('أدخل البيانات كاملة أو تحقق من تطابق كلمة السر', 'error');
    }
}

// دالة فتح المودال مع تحديد الـ role
function openCreateAccountModal(page, role) {
    currentRole = role;
    document.getElementById('createAccountModal').style.display = 'block';
    document.body.style.overflow = 'hidden'; // منع scroll عند فتح الـ modal
}

// دالة إغلاق المودال
function closeModal() {
    document.getElementById('createAccountModal').style.display = 'none';
    document.body.style.overflow = 'auto'; // إعادة الـ scroll
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
    showNotification('تم تسجيل الخروج!');
}

// دالة فتح التب (التنقل بين الخيارات)
function openTab(evt, tabName) {
    const tabContents = document.querySelectorAll('.tab-content');
    tabContents.forEach(content => {
        content.style.display = 'none';
        content.classList.remove('active');
    });
    const tabLinks = document.querySelectorAll('.tab-link');
    tabLinks.forEach(link => link.classList.remove('active'));
    document.getElementById(tabName).style.display = 'block';
    setTimeout(() => {
        document.getElementById(tabName).classList.add('active');
    }, 10);
    evt.currentTarget.classList.add('active');
}

// دالة سكرول الـ tabs بالأسهم
function scrollTabs(direction, role) {
    const tabs = document.getElementById(`${role}Tabs`);
    const scrollAmount = 100; // كمية السكرول
    tabs.scrollLeft += (direction === 'left' ? -scrollAmount : scrollAmount);
}

// إزالة hidden في البداية لصفحة الدخول
document.getElementById('loginPage').classList.remove('hidden');
