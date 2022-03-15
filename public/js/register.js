registerForm = document.querySelector("#register-form");

const nameInput = document.querySelector("#name-input");
const emailInput = document.querySelector("#email-input");
const usernameInput = document.querySelector("#username-input");
const passwordInput = document.querySelector("#password-input");

registerForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const userData = {
    name: nameInput.value,
    username: usernameInput.value,
    email: emailInput.value,
    password: passwordInput.value,
  };

  fetch("/api/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  })
    .then((res) => res.json())
    .then((data) => {
      const { error, token, redirect } = data;

      if (error) {
        console.log(error);
      } else {
        localStorage.setItem("bearer-token", token);
        location.href = redirect;
      }
    });
});
