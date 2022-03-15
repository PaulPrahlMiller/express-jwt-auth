(() => {
  const token = localStorage.getItem("bearer-token");

  if (!token) {
    return (location.href = "/login");
  }

  fetch("/api/auth", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.json())
    .then((token) => {
      if (!token.valid) {
        location.href = "/login";
      }
    });
})();
