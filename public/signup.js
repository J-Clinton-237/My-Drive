document.getElementById('signupForm').addEventListener('submit', async e => {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const res = await fetch('/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    alert(data.message);
    if (data.message === "Success") {
        window.location.href = 'home.html'
    }
    else {
        window.location.href = 'login.html'
    }

});