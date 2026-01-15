document.getElementById('signupForm').addEventListener('submit', async e => {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const name = document.getElementById('firstname').value;

    const res = await fetch('/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, name })
    });
    const data = await res.json();

    alert(data.message);
    if (data.message === "Success") {
        window.location.href = 'login.html'
    }
    else {
        window.location.href = 'login.html'
    }

});