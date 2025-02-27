    document.addEventListener('DOMContentLoaded', function() {
        // Animation du texte sur la page d'accueil
        if(document.getElementById('typed-text')) {
            new Typed('#typed-text', {
                strings: [
                    'Machine Learning',
                    'Data Analysis',
                    'Deep Learning',
                    'Neural Networks',
                    'NLP'
                ],
                typeSpeed: 50,
                backSpeed: 30,
                loop: true
            });
        }

        // Gestion du scroll pour la navbar
        const navbar = document.querySelector('.navbar');
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });

        // Animation des skill-cards avec Vanilla-tilt
        VanillaTilt.init(document.querySelectorAll('.skill-card'), {
            max: 25,
            speed: 400,
            glare: true,
            'max-glare': 0.5
        });

        // Gestion du custom cursor
        const cursor = document.querySelector('.cursor-dot');
        const cursorOutline = document.querySelector('.cursor-outline');

        window.addEventListener('mousemove', e => {
            const posX = e.clientX;
            const posY = e.clientY;

            cursor.style.left = `${posX}px`;
            cursor.style.top = `${posY}px`;

            cursorOutline.style.left = `${posX}px`;
            cursorOutline.style.top = `${posY}px`;
        });

        // Animation des éléments au scroll
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        document.querySelectorAll('.animate-on-scroll').forEach((el) => {
            observer.observe(el);
        });

        // Initialisation des barres de compétences
        document.querySelectorAll('.skill-bar').forEach(bar => {
            const level = bar.getAttribute('data-level');
            setTimeout(() => {
                bar.style.width = `${level}%`;
            }, 500);
        });

        // Gestion du formulaire de contact
        const contactForm = document.getElementById('contact-form');
        if(contactForm) {
            contactForm.addEventListener('submit', async (e) => {
                e.preventDefault();
                const submitBtn = contactForm.querySelector('button[type="submit"]');
                const originalText = submitBtn.innerHTML;
                submitBtn.innerHTML = 'Envoi en cours...';
                submitBtn.disabled = true;

                try {
                    // Simulation d'envoi (à remplacer par votre logique d'envoi)
                    await new Promise(resolve => setTimeout(resolve, 1000));
                    
                    showNotification('Message envoyé avec succès!', 'success');
                    contactForm.reset();
                } catch (error) {
                    showNotification('Erreur lors de l\'envoi du message.', 'error');
                } finally {
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                }
            });
        }
    });

    // Système de notification
    function showNotification(message, type = 'success') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.classList.add('show');
        }, 10);

        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    // Dark mode toggle
    const themeToggle = document.querySelector('.theme-toggle');
    if(themeToggle) {
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            const isDark = document.body.classList.contains('dark-mode');
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
            themeToggle.querySelector('i').className = isDark ? 'fas fa-sun' : 'fas fa-moon';
        });

        // Check for saved theme preference
        const savedTheme = localStorage.getItem('theme');
        if(savedTheme === 'dark') {
            document.body.classList.add('dark-mode');
            themeToggle.querySelector('i').className = 'fas fa-sun';
        }
    }


    document.addEventListener('DOMContentLoaded', function() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '-50px'
        };
    
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
        // Pour les catégories de compétences
        document.querySelectorAll('.skill-category').forEach(item => {
            observer.observe(item);
        });
        // Pour la timeline
        document.querySelectorAll('.timeline-item').forEach(item => {
            observer.observe(item);
        });
    
        
    });