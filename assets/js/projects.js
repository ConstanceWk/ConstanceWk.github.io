const projects = [
    {
        title: 'Prédiction des Ventes E-commerce',
        description: 'Développement d\'un modèle de machine learning pour prédire les ventes futures basé sur les données historiques et les tendances saisonnières.',
        image: '/api/placeholder/600/400',
        category: 'machine-learning',
        technologies: ['Python', 'Scikit-learn', 'Pandas', 'Time Series'],
        github: '#',
        demo: '#'
    },
    {
        title: 'Analyse de Sentiments NLP',
        description: 'Application d\'analyse de sentiments en temps réel sur les réseaux sociaux utilisant des techniques de NLP avancées.',
        image: '/api/placeholder/600/400',
        category: 'nlp',
        technologies: ['Python', 'NLTK', 'Transformers', 'SpaCy'],
        github: '#',
        demo: '#'
    },
    {
        title: 'Segmentation Client',
        description: 'Clustering de clients pour optimiser les stratégies marketing basé sur le comportement d\'achat.',
        image: '/api/placeholder/600/400',
        category: 'clustering',
        technologies: ['Python', 'K-means', 'Matplotlib', 'Seaborn'],
        github: '#',
        demo: '#'
    }
];

document.addEventListener('DOMContentLoaded', function() {
    const projectsGrid = document.querySelector('.projects-grid');
    const filterButtons = document.querySelectorAll('.filter-tag');
    
    // Affichage initial des projets
    displayProjects('all');
    
    // Gestion des filtres
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const category = button.getAttribute('data-filter');
            
            // Mise à jour des classes active
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Affichage des projets filtrés
            displayProjects(category);
        });
    });
    
    // Fonction pour afficher les projets
    function displayProjects(category) {
        if(!projectsGrid) return;
        
        const filteredProjects = category === 'all' 
            ? projects 
            : projects.filter(project => project.category === category);
            
        projectsGrid.innerHTML = filteredProjects.map(project => `
            <div class="project-card animate-on-scroll">
                <div class="project-image">
                    <img src="${project.image}" alt="${project.title}">
                    <div class="project-overlay">
                        <div class="project-links">
                            <a href="${project.github}" class="project-link" target="_blank">
                                <i class="fab fa-github"></i>
                            </a>
                            <a href="${project.demo}" class="project-link" target="_blank">
                                <i class="fas fa-external-link-alt"></i>
                            </a>
                        </div>
                    </div>
                </div>
                <div class="project-content">
                    <h3>${project.title}</h3>
                    <p>${project.description}</p>
                    <div class="project-technologies">
                        ${project.technologies.map(tech => 
                            `<span class="tech-tag">${tech}</span>`
                        ).join('')}
                    </div>
                </div>
            </div>
        `).join('');
        
        // Réinitialisation des animations
        initProjectAnimations();
    }
    
    // Animation des cartes projet
    function initProjectAnimations() {
        const cards = document.querySelectorAll('.project-card');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1
        });
        
        cards.forEach(card => observer.observe(card));
    }
    
    // Initialisation des animations au chargement
    initProjectAnimations();
});