function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    })
    .then(response => response.json())
    .then(data => {
        if (data.message === "Login successful") {
            window.location.href = "dashboard.html";
        } else {
            alert("Login failed! Invalid username or password.");
        }
    })
    .catch(err => console.error(err));
}

function register() {
    const username = document.getElementById('signupUsername').value;
    const password = document.getElementById('signupPassword').value;

    fetch('http://localhost:5000/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    })
    .then(response => response.json())
    .then(data => {
        alert("Account Created Successfully! You can now log in.");
        toggleSignupForm(); // Hide sign-up form after successful registration
    })
    .catch(err => alert("Username already exists! Try a different one."));
}

function toggleSignupForm() {
    const signupForm = document.getElementById('signupForm');
    signupForm.classList.toggle('d-none'); // Show/Hide Sign-Up Form
}