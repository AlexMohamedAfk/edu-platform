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
        if (user.role === 'teacher' || user.role === 'admin') {
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
            return;
        }
    }
    document.getElementById('generatedCode').textContent = `الكود الجديد: ${newCode} (انسخه للاستخدام)`;
    showNotification('تم إنشاء كود جديد!');
}

// دالة إنشاء حساب جديد من المودال (مع تحقق الباسورد)
let currentRole = 'student';
function createAccount() {
    const newU = document.getElementById('newUsername').value.trim();
    const newP = document.getElementById('newPassword').value.trim();
    const confirmP = document.getElementById('confirmPassword').value.trim();
    const arabicRegex = /[\u0600-\u06FF]/;
    if (newU && newP && confirmP && newP === confirmP && newP.length >= 8 && !arabicRegex.test(newP)) {
        const accounts = JSON.parse(localStorage.getItem('accounts')) || [];
        if (accounts.find(acc => acc.username === newU)) {
            showNotification('اسم المستخدم موجود بالفعل', 'error');
            return;
        }
        accounts.push({ username: newU, password: newP, role: currentRole });
        localStorage.setItem('accounts', JSON.stringify(accounts));
        showNotification('تم إنشاء الحساب بنجاح!');
        closeModal();
        // تحديث الجدول لو مفتوح
        if (document.getElementById('teacher-manage-accounts').style.display === 'block') {
            loadAccounts('teacher');
        } else if (document.getElementById('admin-manage-accounts').style.display === 'block') {
            loadAccounts('admin');
        }
    } else {
        let errorMsg = 'أدخل البيانات كاملة أو تحقق من تطابق كلمة السر';
        if (newP.length < 8) errorMsg = 'كلمة السر يجب أن تكون 8 حروف على الأقل';
        if (arabicRegex.test(newP)) errorMsg = 'كلمة السر يجب أن تكون بالإنجليزية فقط';
        showNotification(errorMsg, 'error');
    }
}

// دالة فتح المودال مع تحديد الـ role
function openCreateAccountModal(page, role) {
    currentRole = role;
    document.getElementById('createAccountModal').style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// دالة إغلاق المودال
function closeModal() {
    document.getElementById('createAccountModal').style.display = 'none';
    document.body.style.overflow = 'auto';
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
    const targetContent = document.getElementById(tabName);
    targetContent.style.display = 'block';
    setTimeout(() => {
        targetContent.classList.add('active');
    }, 10);
    evt.currentTarget.classList.add('active');
    // تحميل الحسابات أو الأكواد لو التب إدارة
    if (tabName.includes('manage-accounts')) {
        loadAccounts(tabName.split('-')[0]);
    } else if (tabName.includes('manage-codes')) {
        loadCodes(tabName.split('-')[0]);
    }
}

// دالة سكرول الـ tabs بالأسهم
function scrollTabs(direction, role) {
    const tabs = document.getElementById(`${role}Tabs`);
    const scrollAmount = 100;
    tabs.scrollLeft += (direction === 'left' ? -scrollAmount : scrollAmount);
}

// عرض الأسهم لو في سكرول (ديناميكي)
document.addEventListener('DOMContentLoaded', () => {
    const containers = document.querySelectorAll('.nav-tabs-container');
    containers.forEach(container => {
        const tabs = container.querySelector('.nav-tabs');
        const leftArrow = container.querySelector('.tab-arrow.left');
        const rightArrow = container.querySelector('.tab-arrow.right');
        function checkScroll() {
            leftArrow.style.display = tabs.scrollLeft > 0 ? 'block' : 'none';
            rightArrow.style.display = tabs.scrollLeft < tabs.scrollWidth - tabs.clientWidth ? 'block' : 'none';
        }
        tabs.addEventListener('scroll', checkScroll);
        checkScroll();
    });
});

// دالة تحميل الحسابات في الجدول
function loadAccounts(role) {
    const accounts = JSON.parse(localStorage.getItem('accounts')) || [];
    const tableBody = document.getElementById(`accountsTable${role.charAt(0).toUpperCase() + role.slice(1)}`).querySelector('tbody');
    tableBody.innerHTML = '';
    accounts.forEach((acc, index) => {
        if (acc.role === 'student' || acc.role === 'assistant') { // عرض الطلاب والأسيستنت فقط
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${acc.username}</td>
                <td>${acc.role}</td>
                <td>
                    <button onclick="editAccount(${index})">تعديل</button>
                    <button onclick="openDeleteConfirm(${index}, '${role}')">حذف</button>
                </td>
            `;
            tableBody.appendChild(row);
        }
    });
}

// دالة تحميل الأكواد في الجدول
function loadCodes(role) {
    const codes = JSON.parse(localStorage.getItem('codes')) || [];
    const tableBody = document.getElementById(`codesTable${role.charAt(0).toUpperCase() + role.slice(1)}`).querySelector('tbody');
    tableBody.innerHTML = '';
    codes.forEach((code, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${code}</td>
            <td>
                <button onclick="deleteCode(${index}, '${role}')">حذف</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

// دالة فتح تأكيد الحذف
let deletingIndex = -1;
let deletingRole = '';
function openDeleteConfirm(index, role) {
    deletingIndex = index;
    deletingRole = role;
    document.getElementById('deleteConfirmModal').style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// دالة تأكيد الحذف
function confirmDelete() {
    const accounts = JSON.parse(localStorage.getItem('accounts')) || [];
    accounts.splice(deletingIndex, 1);
    localStorage.setItem('accounts', JSON.stringify(accounts));
    showNotification('تم حذف الحساب!');
    closeDeleteModal();
    loadAccounts(deletingRole);
}

// دالة إغلاق modal التأكيد
function closeDeleteModal() {
    document.getElementById('deleteConfirmModal').style.display = 'none';
    document.body.style.overflow = 'auto';
    deletingIndex = -1;
    deletingRole = '';
}

// دالة حذف كود
function deleteCode(index, role) {
    if (confirm('هل أنت متأكد من حذف هذا الكود؟')) {
        const codes = JSON.parse(localStorage.getItem('codes')) || [];
        codes.splice(index, 1);
        localStorage.setItem('codes', JSON.stringify(codes));
        showNotification('تم حذف الكود!');
        loadCodes(role);
    }
}

// دالة تعديل حساب
let editingIndex = -1;
function editAccount(index) {
    const accounts = JSON.parse(localStorage.getItem('accounts')) || [];
    const acc = accounts[index];
    document.getElementById('editUsername').value = acc.username;
    document.getElementById('editPassword').value = '';
    document.getElementById('editConfirmPassword').value = '';
    editingIndex = index;
    document.getElementById('editAccountModal').style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// دالة حفظ التعديل
function saveEditedAccount() {
    const newU = document.getElementById('editUsername').value.trim();
    const newP = document.getElementById('editPassword').value.trim();
    const confirmP = document.getElementById('editConfirmPassword').value.trim();
    const arabicRegex = /[\u0600-\u06FF]/;
    if (newU && (newP === '' || (newP === confirmP && newP.length >= 8 && !arabicRegex.test(newP)))) {
        const accounts = JSON.parse(localStorage.getItem('accounts')) || [];
        const existing = accounts.find((acc, idx) => acc.username === newU && idx !== editingIndex);
        if (existing) {
            showNotification('اسم المستخدم موجود بالفعل', 'error');
            return;
        }
        accounts[editingIndex].username = newU;
        if (newP) accounts[editingIndex].password = newP;
        localStorage.setItem('accounts', JSON.stringify(accounts));
        showNotification('تم تعديل الحساب بنجاح!');
        closeEditModal();
        loadAccounts(accounts[editingIndex].role); // تحديث الجدول
    } else {
        let errorMsg = 'تحقق من البيانات';
        if (newP && newP.length < 8) errorMsg = 'كلمة السر يجب أن تكون 8 حروف على الأقل';
        if (newP && arabicRegex.test(newP)) errorMsg = 'كلمة السر غير متاحة بالعربية';
        if (newP !== confirmP) errorMsg = 'كلمة السر غير متطابقة';
        showNotification(errorMsg, 'error');
    }
}

// دالة إغلاق modal التعديل
function closeEditModal() {
    document.getElementById('editAccountModal').style.display = 'none';
    document.body.style.overflow = 'auto';
    editingIndex = -1;
}

// دالة بحث في الحسابات
function searchAccounts(role) {
    const input = document.getElementById(`searchAccounts${role.charAt(0).to
