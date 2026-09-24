const API_URL = "https://login-system-bkfw.onrender.com";

async function sendRequest(path, body) {
  const response = await fetch(`${API_URL}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data.message || "The server could not process the request.");
  }

  return data;
}

document.getElementById("loginForm").addEventListener("submit", async (event) => {
  event.preventDefault();
  const message = document.getElementById("message");
  message.textContent = "Signing in...";

  try {
    const data = await sendRequest("/api/login", {
      email: document.getElementById("email").value.trim(),
      password: document.getElementById("password").value,
    });

    localStorage.setItem("token", data.token);
    window.location.href = "dashboard.html";
  } catch (error) {
    message.textContent = error.message;
  }
});

document.getElementById("showRegister").addEventListener("click", (event) => {
  event.preventDefault();
  document.getElementById("registerForm").classList.toggle("hidden");
});

document.getElementById("registerForm").addEventListener("submit", async (event) => {
  event.preventDefault();
  const message = document.getElementById("registerMessage");
  message.textContent = "Creating account...";

  try {
    const data = await sendRequest("/api/register", {
      name: document.getElementById("name").value.trim(),
      email: document.getElementById("regEmail").value.trim(),
      password: document.getElementById("regPassword").value,
    });

    message.textContent = data.message;
    document.getElementById("registerForm").reset();
  } catch (error) {
    message.textContent = error.message;
  }
});
