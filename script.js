/* ============================================
   Taiwo Feyijimi Portfolio - JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    // --- Typing Animation ---
    const titles = [
        'AI Researcher & Innovator',
        'Ph.D. Candidate — University of Georgia',
        'Prompt Engineering Pioneer',
        'Engineering Education Scholar',
        'Machine Learning & NLP Expert',
        'TAIWO & PEASSA Framework Creator'
    ];

    let titleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const heroTitle = document.getElementById('heroTitle');

    function typeTitle() {
        const currentTitle = titles[titleIndex];
        
        if (isDeleting) {
            heroTitle.textContent = currentTitle.substring(0, charIndex - 1);
            charIndex--;
        } else {
            heroTitle.textContent = currentTitle.substring(0, charIndex + 1);
            charIndex++;
        }

        let typeSpeed = isDeleting ? 30 : 60;

        if (!isDeleting && charIndex === currentTitle.length) {
            typeSpeed = 2500;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            titleIndex = (titleIndex + 1) % titles.length;
            typeSpeed = 400;
        }

        setTimeout(typeTitle, typeSpeed);
    }

    typeTitle();

    // --- Navbar Scroll Effect ---
    const navbar = document.getElementById('navbar');
    const backToTop = document.getElementById('backToTop');
    
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        
        if (scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        if (scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }

        // Active nav link
        updateActiveNavLink();
    });

    // --- Active Nav Link ---
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-links a');
        
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            if (window.scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    }

    // --- Mobile Nav Toggle ---
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');

    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close mobile nav on link click
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // --- Counter Animation ---
    const statNumbers = document.querySelectorAll('.stat-number');
    let counterAnimated = false;

    function animateCounters() {
        if (counterAnimated) return;
        
        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-target'));
            const duration = 2000;
            const step = target / (duration / 16);
            let current = 0;

            const updateCounter = () => {
                current += step;
                if (current < target) {
                    stat.textContent = Math.ceil(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    stat.textContent = target;
                }
            };

            updateCounter();
        });
        
        counterAnimated = true;
    }

    // --- Intersection Observer for Animations ---
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Trigger counter animation when hero stats visible
                if (entry.target.closest('.hero-stats') || entry.target.classList.contains('hero-stats')) {
                    animateCounters();
                }
            }
        });
    }, observerOptions);

    // Observe elements for fade-in
    document.querySelectorAll('.section-header, .timeline-item, .accomplishment-card, .pub-item, .exp-item, .award-card, .project-card, .service-card, .dev-card, .media-card, .pres-item, .contact-item, .social-link, .skill-card').forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });

    // Observe hero stats
    const heroStats = document.querySelector('.hero-stats');
    if (heroStats) {
        observer.observe(heroStats);
    }

    // --- Publication Filters ---
    const pubFilters = document.querySelectorAll('.pub-filter');
    const pubCategories = document.querySelectorAll('.pub-category');

    pubFilters.forEach(filter => {
        filter.addEventListener('click', () => {
            const filterValue = filter.getAttribute('data-filter');

            pubFilters.forEach(f => f.classList.remove('active'));
            filter.classList.add('active');

            pubCategories.forEach(category => {
                const categoryValue = category.getAttribute('data-category');
                
                if (filterValue === 'all') {
                    category.classList.remove('hidden');
                } else if (categoryValue === filterValue) {
                    category.classList.remove('hidden');
                } else {
                    category.classList.add('hidden');
                }
            });
        });
    });

    // --- Experience Tabs ---
    const expTabs = document.querySelectorAll('.exp-tab');
    const expContents = document.querySelectorAll('.exp-content');

    expTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const tabValue = tab.getAttribute('data-tab');

            expTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            expContents.forEach(content => {
                content.classList.remove('active');
                if (content.id === tabValue) {
                    content.classList.add('active');
                }
            });
        });
    });

    // --- Hero Particles ---
    const particlesContainer = document.getElementById('particles');
    
    function createParticles() {
        for (let i = 0; i < 20; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            
            const size = Math.random() * 120 + 20;
            particle.style.width = size + 'px';
            particle.style.height = size + 'px';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 20 + 's';
            particle.style.animationDuration = (Math.random() * 25 + 15) + 's';

            particlesContainer.appendChild(particle);
        }
    }

    createParticles();

    // --- Smooth scroll for anchor links ---
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
