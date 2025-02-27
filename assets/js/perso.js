// JavaScript pour la page des activités personnelles

document.addEventListener('DOMContentLoaded', function() {
    // Données des visuels (à remplacer par vos propres visuels)
    const visualsData = [
        {
            type: 'image',
            src: '/path/to/your/image1.jpg',
            alt: 'Affiche événement sportif EFREI'
        },
        {
            type: 'image',
            src: '/path/to/your/image2.jpg',
            alt: 'Design flyer tournoi de basketball'
        },
        {
            type: 'video',
            src: '/path/to/your/video1.mp4',
            poster: '/path/to/your/video-poster1.jpg'
        },
        {
            type: 'image',
            src: '/path/to/your/image3.jpg',
            alt: 'Publication Instagram pour le BDS'
        },
        {
            type: 'image',
            src: '/path/to/your/image4.jpg',
            alt: 'Logo du Bureau des Sports redesigné'
        },
        {
            type: 'video',
            src: '/path/to/your/video2.mp4',
            poster: '/path/to/your/video-poster2.jpg'
        }
    ];

    // Pour le développement et la démo, utilisons des placeholders
    const placeholderVisuals = [
        {
            type: 'image',
            src: 'https://via.placeholder.com/600x400/7d56f4/ffffff?text=Affiche+Événement+Sportif',
            alt: 'Affiche événement sportif EFREI'
        },
        {
            type: 'image',
            src: 'https://via.placeholder.com/600x400/a98aff/ffffff?text=Flyer+Tournoi+Basketball',
            alt: 'Design flyer tournoi de basketball'
        },
        {
            type: 'image',
            src: 'https://via.placeholder.com/600x400/6440e0/ffffff?text=Post+Instagram+BDS',
            alt: 'Publication Instagram pour le BDS'
        },
        {
            type: 'image',
            src: 'https://via.placeholder.com/600x400/8a63fa/ffffff?text=Logo+BDS+Redesign',
            alt: 'Logo du Bureau des Sports redesigné'
        },
        {
            type: 'image',
            src: 'https://via.placeholder.com/600x400/7249e3/ffffff?text=Affiche+Compétition',
            alt: 'Affiche compétition inter-écoles'
        },
        {
            type: 'image',
            src: 'https://via.placeholder.com/600x400/9370ff/ffffff?text=Communication+Événement',
            alt: 'Communication pour événement sportif'
        }
    ];

    // Sélection des éléments DOM
    const carousel = document.getElementById('visualCarousel');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const indicator = document.getElementById('carouselIndicator');
    
    // Utilisez visualsData en production et placeholderVisuals pour la démo
    const visuals = placeholderVisuals; // Changer à visualsData quand vos fichiers sont prêts
    let currentSlide = 0;

    // Fonction pour initialiser le carousel
    function initCarousel() {
        // Créer les slides
        visuals.forEach((visual, index) => {
            const slide = document.createElement('div');
            slide.className = 'carousel-slide';
            if (index === 0) {
                slide.classList.add('active');
            }

            if (visual.type === 'image') {
                const img = document.createElement('img');
                img.src = visual.src;
                img.alt = visual.alt;
                slide.appendChild(img);
            } else if (visual.type === 'video') {
                const video = document.createElement('video');
                video.src = visual.src;
                video.controls = true;
                if (visual.poster) {
                    video.poster = visual.poster;
                }
                slide.appendChild(video);
            }

            carousel.appendChild(slide);
        });

        // Créer les indicateurs
        visuals.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.className = 'indicator-dot';
            if (index === 0) {
                dot.classList.add('active');
            }
            dot.addEventListener('click', () => {
                goToSlide(index);
            });
            indicator.appendChild(dot);
        });
    }

    // Fonction pour aller à un slide spécifique
    function goToSlide(index) {
        // Gérer le dépassement d'index
        if (index < 0) {
            index = visuals.length - 1;
        } else if (index >= visuals.length) {
            index = 0;
        }

        // Mettre à jour la classe active des slides
        const slides = carousel.querySelectorAll('.carousel-slide');
        slides.forEach((slide, i) => {
            if (i === index) {
                slide.classList.add('active');
            } else {
                slide.classList.remove('active');
            }
        });

        // Mettre à jour les indicateurs
        const dots = indicator.querySelectorAll('.indicator-dot');
        dots.forEach((dot, i) => {
            if (i === index) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });

        // Mettre en pause toutes les vidéos lorsqu'on change de slide
        slides.forEach(slide => {
            const video = slide.querySelector('video');
            if (video) {
                video.pause();
            }
        });

        // Si le nouveau slide est une vidéo et qu'il devient actif
        const newActiveSlide = slides[index];
        const video = newActiveSlide.querySelector('video');
        if (video) {
            // Optionnel: lecture automatique de la vidéo
            // video.play();
        }

        currentSlide = index;
    }

    // Event listeners pour les boutons de navigation
    prevBtn.addEventListener('click', () => {
        goToSlide(currentSlide - 1);
    });

    nextBtn.addEventListener('click', () => {
        goToSlide(currentSlide + 1);
    });

    // Écouter les touches du clavier pour la navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            goToSlide(currentSlide - 1);
        } else if (e.key === 'ArrowRight') {
            goToSlide(currentSlide + 1);
        }
    });

    // Initialiser le carousel
    initCarousel();

    // Animation d'entrée des éléments
    const elements = document.querySelectorAll('.perso-section, .other-activities');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    elements.forEach(element => {
        element.style.opacity = 0;
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(element);
    });

    // Classe pour l'animation d'entrée
    document.head.insertAdjacentHTML('beforeend', `
        <style>
            .fade-in {
                opacity: 1 !important;
                transform: translateY(0) !important;
            }
        </style>
    `);
});