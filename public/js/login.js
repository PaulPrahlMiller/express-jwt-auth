const loginForm = document.querySelector("#login-form");
const emailInput = document.querySelector("#login-email-input");
const passwordInput = document.querySelector("#login-password-input");

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const loginData = {
    email: emailInput.value,
    password: passwordInput.value,
  };

  fetch("/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(loginData),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        localStorage.setItem("bearer-token", data.token);
        location.href = data.redirect;
      }
    });
});
