// =========================================================
// Portafolio Jefersson — Interacciones
// =========================================================

document.addEventListener('DOMContentLoaded', () => {
    // Año en footer
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    // Menú móvil
    const nav = document.getElementById('nav');
    const navToggle = document.getElementById('nav-toggle');
    const header = document.getElementById('site-header');

    navToggle.addEventListener('click', () => {
        nav.classList.toggle('open');
        navToggle.classList.toggle('open');
    });

    // Cerrar menú al hacer clic en un enlace
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('open');
            navToggle.classList.remove('open');
        });
    });

    // Header con fondo al hacer scroll + barra de progreso + botón subir
    const scrollProgress = document.querySelector('.scroll-progress');
    const backToTop = document.querySelector('.back-to-top');

    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

        header.classList.toggle('scrolled', scrollTop > 20);
        scrollProgress.style.width = progress + '%';
        backToTop.classList.toggle('show', scrollTop > 500);
    }, { passive: true });
});

// =========================================================
// Efecto de escritura (typing)
// =========================================================
(function typing() {
    const el = document.getElementById('typed');
    if (!el) return;

    const roles = [
        'Ingeniero de Sistemas',
        'Desarrollador de Software',
        'IA & Analítica de Datos'
    ];

    let roleIndex = 0;
    let charIndex = 0;
    let deleting = false;

    function tick() {
        const current = roles[roleIndex];

        if (!deleting) {
            charIndex++;
            el.textContent = current.slice(0, charIndex);
            if (charIndex === current.length) {
                deleting = true;
                setTimeout(tick, 1600);
                return;
            }
        } else {
            charIndex--;
            el.textContent = current.slice(0, charIndex);
            if (charIndex === 0) {
                deleting = false;
                roleIndex = (roleIndex + 1) % roles.length;
            }
        }

        setTimeout(tick, deleting ? 45 : 85);
    }

    tick();
})();

// =========================================================
// Animaciones al hacer scroll (reveal + barras de skills)
// =========================================================
(function scrollAnimations() {
    const revealEls = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });

    revealEls.forEach(el => revealObserver.observe(el));

    // Barras de skills: se animan una sola vez al entrar en pantalla
    const fills = document.querySelectorAll('.skill-fill');
    const skillObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const fill = entry.target;
                fill.style.width = fill.dataset.progress + '%';
                observer.unobserve(fill);
            }
        });
    }, { threshold: 0.4 });

    fills.forEach(fill => skillObserver.observe(fill));
})();

// =========================================================
// Resaltar enlace activo del menú según la sección visible
// =========================================================
(function activeNav() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.id;
                navLinks.forEach(link => {
                    link.classList.toggle('active', link.getAttribute('href') === '#' + id);
                });
            }
        });
    }, { rootMargin: '-40% 0px -55% 0px' });

    sections.forEach(section => sectionObserver.observe(section));
})();
