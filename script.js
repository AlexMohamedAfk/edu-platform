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
        if (user.role === 'teacher' || user.role === 'admin' || user.role === 'assistant') {
            loadAccounts(user.role);
            loadCodes(user.role);
        } else if (user.role === 'student') {
            loadLessons();
        }
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

// دالة إنشاء كود جديد (16 حرف)
function generateCode() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let newCode = '';
    for (let i = 0; i < 16; i++) {
        newCode += characters.charAt(Math.floor(Math.random() * characters.length));
    }
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
            navigator.clipboard.writeText(newCode).then(() => {
                showNotification('تم نسخ الكود إلى الحافظة!');
            });
            return;
        }
    }
    document.getElementById('generatedCode').textContent = `الكود الجديد: ${newCode} (انسخه للاستخدام)`;
    showNotification('تم إنشاء كود جديد!');
    navigator.clipboard.writeText(newCode).then(() => {
        showNotification('تم نسخ الكود إلى الحافظة!');
    });
}

// دالة إنشاء أكواد متعددة
function generateMultipleCodes() {
    const num = parseInt(document.getElementById('numCodes').value) || 1;
    let codesText = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const codes = JSON.parse(localStorage.getItem('codes')) || [];
    for (let j = 0; j < num; j++) {
        let newCode = '';
        for (let i = 0; i < 16; i++) {
            newCode += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        codes.push(newCode);
        codesText += newCode + '\n';
    }
    localStorage.setItem('codes', JSON.stringify(codes));
    document.getElementById('teacherGeneratedCode').textContent = `الأكواد الجديدة
