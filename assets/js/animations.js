document.addEventListener('DOMContentLoaded', function() {
    // Configuration de l'Intersection Observer pour les animations au scroll
    const observerOptions = {
        root: null,
        threshold: 0.1,
        rootMargin: '0px'
    };

    // Observer pour les éléments avec animation au scroll
    const scrollAnimationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-visible');
                scrollAnimationObserver.unobserve(entry.target); // Animation une seule fois
            }
        });
    }, observerOptions);

    // Application de l'observer aux éléments avec la classe animate-on-scroll
    document.querySelectorAll('.animate-on-scroll').forEach((element) => {
        element.classList.add('animate-hidden');
        scrollAnimationObserver.observe(element);
    });

    // Animation des barres de compétences
    const skillBars = document.querySelectorAll('.skill-bar');
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkillBar(entry.target);
                skillObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    skillBars.forEach(bar => {
        skillObserver.observe(bar);
    });

    function animateSkillBar(bar) {
        const level = bar.getAttribute('data-level');
        bar.style.width = '0%';
        
        // Animation progressive de la barre
        setTimeout(() => {
            bar.style.transition = 'width 1s ease-in-out';
            bar.style.width = level + '%';
        }, 100);
    }

    // Animation du texte de la timeline
    const timelineItems = document.querySelectorAll('.timeline-item');
    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('timeline-visible');
                timelineObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    timelineItems.forEach(item => {
        timelineObserver.observe(item);
    });

    // Animation des project cards au hover
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseover', () => {
            card.classList.add('card-hover');
        });

        card.addEventListener('mouseout', () => {
            card.classList.remove('card-hover');
        });
    });

    // Animation du hero text
    const heroText = document.querySelector('.hero-text');
    if (heroText) {
        setTimeout(() => {
            heroText.classList.add('hero-visible');
        }, 300);
    }

    // Animation des tags de compétences
    const skillTags = document.querySelectorAll('.skill-tag');
    skillTags.forEach((tag, index) => {
        tag.style.animationDelay = `${index * 100}ms`;
        tag.classList.add('tag-animate');
    });

    // Smooth scroll pour les ancres
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
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
});

// Animation des particules pour le hero (si présent)
function initParticles() {
    const particlesContainer = document.querySelector('.particles-container');
    if (!particlesContainer) return;

    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Position aléatoire
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        
        // Animation aléatoire
        particle.style.animationDuration = (Math.random() * 3 + 2) + 's';
        particle.style.animationDelay = Math.random() * 2 + 's';
        
        particlesContainer.appendChild(particle);
    }
}



// Initialisation des particules si le conteneur existe
document.addEventListener('DOMContentLoaded', initParticles);

