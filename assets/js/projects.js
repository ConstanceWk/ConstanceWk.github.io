document.addEventListener('DOMContentLoaded', function() {
    // Données des projets
    const projects = [
        {
            title: "Prédiction des Ventes E-commerce",
            description: "Développement d'un modèle de machine learning pour prédire les ventes futures basé sur les données historiques et les tendances saisonnières.",
            image: "/api/placeholder/600/400",
            tags: ["Python", "Scikit-learn", "Pandas", "Time Series"],
            github: "#",
            demo: "#",
            category: "machine-learning"
        },
        {
            title: "Analyse de Sentiments sur Twitter",
            description: "Création d'un modèle NLP pour analyser les sentiments des tweets en temps réel concernant des sujets spécifiques.",
            image: "/api/placeholder/600/400",
            tags: ["Python", "NLTK", "Transformers", "Twitter API"],
            github: "#",
            demo: "#",
            category: "nlp"
        },
        {
            title: "Segmentation Client",
            description: "Application de techniques de clustering pour segmenter la base client d'une entreprise e-commerce.",
            image: "/api/placeholder/600/400",
            tags: ["Python", "K-means", "Matplotlib", "Seaborn"],
            github: "#",
            demo: "#",
            category: "clustering"
        }
    ];

    // Fonction pour créer une carte de projet
    function createProjectCard(project) {
        return `
            <div class="project-card animate-on-scroll" data-category="${project.category}">
                <div class="project-image">
                    <img src="${project.image}" alt="${project.title}">
                    <div class="project-overlay">
                        <div class="project-links">
                            <a href="${project.github}" class="project-link" target="_blank">
                                <i class="fab fa-github"></i> Code
                            </a>
                            <a href="${project.demo}" class="project-link" target="_blank">
                                <i class="fas fa-external-link-alt"></i> Demo
                            </a>
                        </div>
                    </div>
                </div>
                <div class="project-content">
                    <h3>${project.title}</h3>
                    <p>${project.description}</p>
                    <div class="tech-stack">
                        ${project.tags.map(tag => `<span class="skill-tag">${tag}</span>`).join('')}
                    </div>
                </div>
            </div>
        `;
    }

    // Fonction pour afficher les projets
    function displayProjects(projectsToShow = projects) {
        const projectGrid = document.querySelector('.project-grid');
        if (!projectGrid) return;

        projectGrid.innerHTML = projectsToShow.map(project => 
            createProjectCard(project)
        ).join('');

        // Réinitialiser les animations
        initializeAnimations();
    }

    // Filtrage des projets par catégorie
    function setupFilters() {
        const filterContainer = document.querySelector('.project-filters');
        if (!filterContainer) return;

        // Obtenir les catégories uniques
        const categories = ['all', ...new Set(projects.map(p => p.category))];
        
        // Créer les boutons de filtre
        const filterButtons = categories.map(category => `
            <button class="filter-btn ${category === 'all' ? 'active' : ''}" 
                    data-category="${category}">
                ${category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
        `).join('');

        filterContainer.innerHTML = filterButtons;

        // Ajouter les événements de clic
        filterContainer.addEventListener('click', (e) => {
            if (e.target.classList.contains('filter-btn')) {
                // Mettre à jour l'état actif des boutons
                document.querySelectorAll('.filter-btn').forEach(btn => 
                    btn.classList.remove('active'));
                e.target.classList.add('active');

                // Filtrer les projets
                const category = e.target.dataset.category;
                const filteredProjects = category === 'all' 
                    ? projects 
                    : projects.filter(p => p.category === category);

                displayProjects(filteredProjects);
            }
        });
    }

    // Fonction pour initialiser les animations
    function initializeAnimations() {
        const projectCards = document.querySelectorAll('.project-card');
        
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

        projectCards.forEach(card => {
            observer.observe(card);
        });
    }

    // Recherche de projets
    function setupSearch() {
        const searchInput = document.querySelector('#project-search');
        if (!searchInput) return;

        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            const filteredProjects = projects.filter(project => 
                project.title.toLowerCase().includes(searchTerm) ||
                project.description.toLowerCase().includes(searchTerm) ||
                project.tags.some(tag => tag.toLowerCase().includes(searchTerm))
            );
            displayProjects(filteredProjects);
        });
    }

    // Initialisation
    displayProjects();
    setupFilters();
    setupSearch();
});