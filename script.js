// Add smooth scroll effect to all internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Newsletter button interaction
document.querySelector('.newsletter').addEventListener('click', function(e) {
    e.preventDefault();
    alert('You have subscribed to the newsletter!');
});

// Check if user is logged in and update navigation
function checkAuthStatus() {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));
    const authButtons = document.querySelector('.auth-buttons');
    
    if (token && user) {
        // User is logged in
        authButtons.innerHTML = `
            <a href="frontend/dashboard.html" class="btn-login">Dashboard</a>
            <button onclick="logout()" class="btn-register">Logout</button>
        `;
    } else {
        // User is not logged in
        authButtons.innerHTML = `
            <a href="frontend/login.html" class="btn-login">Login</a>
            <a href="frontend/register.html" class="btn-register">Register</a>
        `;
    }
}

// Logout function
function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = 'index.html';
}

// Check auth status when page loads
document.addEventListener('DOMContentLoaded', checkAuthStatus);