const signupForm = document.getElementById("signupForm");
const firstName = document.getElementById("firstname");
const lastName = document.getElementById("lastname");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");
const errorMessage = document.getElementById("signup-error");

signupForm.addEventListener("submit", validateSignUpForm);

function showError(message) {
  errorMessage.textContent = message;
  errorMessage.style.backgroundColor = "rgb(255,216,216)";
  errorMessage.style.padding = "10px";
}

function clearError() {
  errorMessage.textContent = "";
  errorMessage.style.backgroundColor = "transparent";
  errorMessage.style.padding = "0";
}

function isStrongPassword(password) {
  return password.length >= 8;
}

function validateSignUpForm(event) {
  event.preventDefault();
  clearError();

  const firstNameValue = firstName.value.trim();
  const lastNameValue = lastName.value.trim();
  const emailValue = email.value.trim();
  const passwordValue = password.value.trim();
  const confirmPasswordValue = confirmPassword.value.trim();

  if (
    !firstNameValue ||
    !lastNameValue ||
    !emailValue ||
    !passwordValue ||
    !confirmPasswordValue
  ) {
    showError("Please fill in all fields.");
    return;
  }

  if (!emailValue.includes("@")) {
    showError("Please enter a valid email address.");
    return;
  }

  if (!isStrongPassword(passwordValue)) {
    showError("Password must be at least 8 characters long.");
    return;
  }

  if (passwordValue !== confirmPasswordValue) {
    showError("Passwords do not match.");
    return;
  }

  console.log("First Name:", firstNameValue);
  console.log("Last Name:", lastNameValue);
  console.log("Email:", emailValue);
  console.log("Password:", passwordValue);
}

