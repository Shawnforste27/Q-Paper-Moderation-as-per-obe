document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));

    if (!token || !user) {
        window.location.href = '../pages/index.html';
        return;
    }

    document.getElementById('username').textContent = user.username;

    document.getElementById('logoutBtn').addEventListener('click', () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '../pages/index.html';
    });
});

function navigateTo(page) {
    window.location.href = `${page}.html`;
}