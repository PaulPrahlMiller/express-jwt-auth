const msg = document.querySelector("#welcome-msg");
const logoutBtn = document.querySelector("#logout-btn");
const showUserBtn = document.querySelector("#user-details-btn");
const userInfo = document.querySelector("#user-info");
const welcomeName = document.querySelector("#welcome-name");

const state = {};

logoutBtn.addEventListener("click", logout);
showUserBtn.addEventListener("click", showUserInfo);
window.addEventListener("load", getPayloadData);

function getPayloadData() {
  const token = localStorage.getItem("bearer-token");
  fetch("/api/user/jwtpayload", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.json())
    .then((data) => data.user)
    .then((user) => {
      state.user = user;
      welcomeName.innerHTML = state.user.username;
    });
}

function logout() {
  localStorage.removeItem("bearer-token");
  location.href = "/login";
}

function showUserInfo() {
  const { name, email } = state.user;
  if (userInfo.children.length === 0) {
    const nameDiv = document.createElement("div");
    nameDiv.innerHTML = `Name: ${name}`;
    const emailDiv = document.createElement("div");
    emailDiv.innerHTML = `Email: ${email}`;
    userInfo.appendChild(nameDiv);
    userInfo.appendChild(emailDiv);
    showUserBtn.innerHTML = "Hide user details";
  } else {
    userInfo.innerHTML = "";
    showUserBtn.innerHTML = "Show user details";
  }
}
