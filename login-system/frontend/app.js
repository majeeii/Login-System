// Point to your live Render backend URL (no trailing slash at the end!)
const API_URL = "https://your-backend-name.onrender.com";

// 1. Form Toggling Logic (Makes the Register form pop up when clicked!)
const showRegisterLink = document.getElementById('showRegister');
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const cardTitle = document.querySelector('.card h1');
const cardSubtitle = document.querySelector('.subtitle');

if (showRegisterLink) {
    showRegisterLink.addEventListener('click', (e) => {
        e.preventDefault(); // Prevents page jumping
        loginForm.classList.add('hidden');       // Hide login form
        registerForm.classList.remove('hidden'); // Show register form
        cardTitle.textContent = 'Create Account';
        cardSubtitle.textContent = 'Sign up to get started';
    });
}

// 2. Handle Registration Form Submission
const regFormElement = document.getElementById('registerForm');
if (regFormElement) {
    regFormElement.addEventListener('submit', async (e) => {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const email = document.getElementById('regEmail').value;
        const password = document.getElementById('regPassword').value;
        const messageDiv = document.getElementById('registerMessage');

        try {
            const response = await fetch(`${API_URL}/api/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password })
            });

            const data = await response.json();

            if (response.ok) {
                messageDiv.style.color = 'green';
                messageDiv.textContent = 'Registration successful! Redirecting...';
                setTimeout(() => {
                    window.location.reload(); // Refresh back to login
                }, 2000);
            } else {
                messageDiv.style.color = 'red';
                messageDiv.textContent = data.message || 'Registration failed.';
            }
        } catch (err) {
            messageDiv.style.color = 'red';
            messageDiv.textContent = 'Cannot connect to the server.';
        }
    });
}

// 3. Handle Login Form Submission
const loginFormElement = document.getElementById('loginForm');
if (loginFormElement) {
    loginFormElement.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const messageDiv = document.getElementById('message');

        try {
            const response = await fetch(`${API_URL}/api/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (response.ok) {
                messageDiv.style.color = 'green';
                messageDiv.textContent = 'Login successful!';
                localStorage.setItem('token', data.token); // Save auth token
            } else {
                messageDiv.style.color = 'red';
                messageDiv.textContent = data.message || 'Login failed.';
            }
        } catch (err) {
            messageDiv.style.color = 'red';
            messageDiv.textContent = 'Cannot connect to the server.';
        }
    });
}