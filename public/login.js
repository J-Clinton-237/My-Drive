// ** Log In Verification ** //
document.getElementById('loginForm').addEventListener('submit', async e => {
    e.preventDefault();
// Get User input
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
// Send request to Server
    const res = await fetch('/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    });
// awaiting server response
    const data = await res.json();
// If email and password are in the Database
    if (data.success) {
        alert("Login Success");
        window.location.href = 'home.html';
    } else {
        alert("Invalid email or password");
    }
});