const togglePassword = document.getElementById("togglePassword");
const passwordField = document.getElementById("password");

togglePassword.addEventListener("click", () => {
  const isPassword = passwordField.type === "password";
  passwordField.type = isPassword ? "text" : "password";
  togglePassword.innerHTML = isPassword
    ? `<i class="fa-solid fa-eye"></i>`
    : `<i class="fa-solid fa-eye-slash"></i>`;
});


// التعامل مع تسجيل الدخول
const form = document.getElementById("loginForm");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const password = document.getElementById("password").value;

  try {
    const response = await fetch("https://your-backend.com/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: name,
        password: password
      })
    });

    const data = await response.json();

    if (response.ok && data.success) {
      alert("Login successful!");
      localStorage.setItem("token", data.token);
      window.location.href = "dashboard.html";
    } else {
      alert("Login failed: " + (data.message || "Unknown error"));
    }

  } catch (error) {
    console.error("Login error:", error);
    alert("Something went wrong. Please try again.");
  }
});