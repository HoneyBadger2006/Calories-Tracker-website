// Add smooth scroll effect to all internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Example of Newsletter button interaction (you can expand it as needed)
document.querySelector('.newsletter').addEventListener('click', function() {
    alert('You have subscribed to the newsletter!');
});