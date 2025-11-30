function login() {
  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value.trim();
  const message = document.getElementById('message');

  if (username === "student" && password === "1234") {
    message.style.color = "green";
    message.textContent = "تم تسجيل الدخول كطالب!";
    // لاحقاً نعمل Redirect لصفحة الطالب
    // window.location.href = "student.html";
  } 
  
  else if (username === "teacher" && password === "1234") {
    message.style.color = "green";
    message.textContent = "تم تسجيل الدخول كمُعلّم!";
    // window.location.href = "teacher.html";
  } 
  
  else if (username === "admin" && password === "1234") {
    message.style.color = "green";
    message.textContent = "تم تسجيل الدخول كمدير النظام!";
    // window.location.href = "admin.html";
  } 
  
  else {
    message.style.color = "red";
    message.textContent = "اسم المستخدم أو كلمة السر غير صحيحة.";
  }
}
