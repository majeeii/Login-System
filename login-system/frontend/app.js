// Replace this with your actual live Render URL (no trailing slash!)
const API_URL = "https://your-render-backend-name.onrender.com";

// Form Toggling Logic (Makes the Register form pop up when clicked!)
const showRegisterLink = document.getElementById('showRegister');
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const cardTitle = document.querySelector('.card h1');
const cardSubtitle = document.querySelector('.subtitle');

if (showRegisterLink) {
    showRegisterLink.addEventListener('click', (e) => {
        e.preventDefault(); 
        loginForm.classList.add('hidden');       
        registerForm.classList.remove('hidden'); 
        cardTitle.textContent = 'Create Account';
        cardSubtitle.textContent = 'Sign up to get started';
    });
}

// Handle Registration Form Submission
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
                    window.location.reload(); 
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