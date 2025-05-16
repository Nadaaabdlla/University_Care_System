document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('resetForm');
  const errorMessage = document.getElementById('errorMessage');
  const toggleIcons = document.querySelectorAll('.toggle-password');

  // Toggle password visibility
  toggleIcons.forEach(icon => {
    icon.addEventListener('click', () => {
      const targetId = icon.getAttribute('data-target');
      const passwordInput = document.getElementById(targetId);
      const isPassword = passwordInput.type === 'password';
      passwordInput.type = isPassword ? 'text' : 'password';
      icon.innerHTML = isPassword
        ? '<i class="fa-solid fa-eye"></i>'
        : '<i class="fa-solid fa-eye-slash"></i>';
    });
  });

  // Submit form
  form.addEventListener('submit', async function (e) {
    e.preventDefault();

    const code = document.getElementById('code').value.trim();
    const newPassword = document.getElementById('newPassword').value.trim();
    const confirmPassword = document.getElementById('confirmPassword').value.trim();

    // Validate matching passwords
    if (newPassword !== confirmPassword) {
      errorMessage.textContent = 'Passwords do not match.';
      errorMessage.className = 'message error';
      return;
    }

    try {
      // Send data to the backend
      const response = await fetch('https://your-backend-api.com/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          code: code,
          newPassword: newPassword
        })
      });

      const result = await response.json();

      if (response.ok) {
        // Redirect to login after success
        errorMessage.textContent = 'Password reset successful! Redirecting...';
        errorMessage.className = 'message success';
        setTimeout(() => {
          window.location.href = 'login.html';
        }, 2000);
      } else {
        // Show backend error message
        errorMessage.textContent = result.message || 'Reset failed.';
        errorMessage.className = 'message error';
      }

    } catch (err) {
      errorMessage.textContent = 'An error occurred. Please try again later.';
      errorMessage.className = 'message error';
    }
  });
});
