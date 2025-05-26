// Animation de la barre de navigation au scroll
window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    if (window.scrollY > 50) {
        nav.style.backgroundColor = 'rgba(35, 39, 42, 0.95)';
    } else {
        nav.style.backgroundColor = 'rgba(35, 39, 42, 0.8)';
    }
});

// Animation des cartes de projet au scroll
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.project-card, .skill-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(card);
});

// Gestion du formulaire de contact
const contactForm = document.getElementById('contact-form');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Animation du bouton
    const button = contactForm.querySelector('button');
    button.innerHTML = 'Sending...';
    button.disabled = true;
    
    // Simulation d'envoi (à remplacer par votre logique d'envoi réelle)
    setTimeout(() => {
        button.innerHTML = 'Message sent!';
        button.style.backgroundColor = 'var(--accent-color)';
        contactForm.reset();
        
        setTimeout(() => {
            button.innerHTML = 'Send';
            button.disabled = false;
            button.style.backgroundColor = 'var(--primary-color)';
        }, 2000);
    }, 1500);
});

// Smooth scroll pour les liens de navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Animation des statistiques
const animateValue = (element, start, end, duration) => {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const value = Math.floor(progress * (end - start) + start);
        element.textContent = value;
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
};

// Animation des statistiques au scroll
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statItems = entry.target.querySelectorAll('.stat-item h3');
            statItems.forEach(item => {
                const value = parseInt(item.textContent);
                if (!isNaN(value)) {
                    animateValue(item, 0, value, 2000);
                }
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

const statsSection = document.querySelector('.stats');
if (statsSection) {
    statsObserver.observe(statsSection);
} 
