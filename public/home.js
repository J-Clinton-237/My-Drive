let username;
let theme;



fetch('/me', { credentials: 'include' })
    .then(res => {
        if (res.status === 401) {
            console.log('error');
            window.location.href = "./login.html";
        }
        return res.json();
    })
    .then(user => {
        document.getElementById('name').innerText = "Welcome Back " + user.name;
        console.log(user.name, "entered dashboard");
        username = user.name;
        theme = user.theme;
        //can add theme manipulation here with user.theme
    });
let dis = false;
let b = document.querySelectorAll('#burger');
b.forEach(element => {
    element.addEventListener('click', () => {
    let rootStyle = document.documentElement.style;
    if (!dis) {
        rootStyle.setProperty('--dis', 'flex');
        dis = true;
    }
    else {
        rootStyle.removeProperty('--dis');
        dis = false;
    }
})
});
   