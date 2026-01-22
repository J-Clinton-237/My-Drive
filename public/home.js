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

        document.getElementById('name1').innerText = "Welcome Back " + user.name;
        document.getElementById('name').innerText = "Welcome Back " + user.name;
        console.log(user.name, "entered dashboard");
        username = user.name;
        theme = user.theme;

        // Set profile picture
        const profilePicUrl = user.profile_pic ? `/uploads/${user.id}/${user.profile_pic}?t=${Date.now()}` : './images/user_img/img_1735582873460.jpg';
        document.getElementById('profilePic').src = profilePicUrl;

        // Apply theme
        applyTheme(theme);
    });

function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
}
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
   