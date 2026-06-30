const loginForm = document.getElementById("loginForm");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const errorMessage = document.getElementById("error-message");
const eyeIcon = document.getElementById("eye-icon");

eyeIcon.addEventListener("click", () => {
  if (passwordInput.type === "password") {
    passwordInput.type = "text";
    eyeIcon.src = "asset/eye-open.png";
  } else {
    passwordInput.type = "password";
    eyeIcon.src = "asset/eye-close.png";
  }
});

loginForm.addEventListener("submit", validateForm);

function showError(message) {
  errorMessage.textContent = message;
  errorMessage.style.display = "rgb(255, 216, 216)";
  errorMessage.style.padding = "10px";
}

function clearError() {
  errorMessage.textContent = "";
  errorMessage.style.background = "transparent";
}

function validateForm(event) {
  event.preventDefault();

  clearError();
  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();

  if (!email || !password) {
    showError("Please fill in all fields.");
    return;
  }

  if (!email.includes("@")) {
    showError("Please enter a valid email address.");
    return;
  }
  console.log(email)
  console.log(password)
}
