function login() {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  const message = document.getElementById('message');

  // تسجيل دخول وهمي
  if(username === "student" && password === "1234") {
    message.style.color = "green";
    message.textContent = "تم تسجيل الدخول كطالب!";
  } else if(username === "teacher" && password === "1234") {
    message.style.color = "green";
    message.textContent = "تم تسجيل الدخول كمستر!";
  } else {
    message.style.color = "red";
    message.textContent = "اسم المستخدم أو كلمة السر خاطئة.";
  }
}
