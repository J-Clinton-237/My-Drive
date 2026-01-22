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
        credentials: 'include',  // Include cookies for session
        body: JSON.stringify({ email, password })
    })

// awaiting server respons
        .then(res => res.json())
        .then(data => {
            if (data.success) { window.location.href = "./home.html" }
            else {alert('Invalid E mail or Password')}
    })

});
