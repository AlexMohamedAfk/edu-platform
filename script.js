function login() {
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();
  const msg = document.getElementById("message");

  if (username === "student" && password === "1234") {
    window.location.href = "student.html";
  } 
  else if (username === "teacher" && password === "1234") {
    window.location.href = "teacher.html";
  }
  else if (username === "admin" && password === "1234") {
    window.location.href = "admin.html";
  }
  else {
    msg.style.color = "red";
    msg.textContent = "بيانات غير صحيحة.";
  }
}

function logout() {
  window.location.href = "index.html";
}
