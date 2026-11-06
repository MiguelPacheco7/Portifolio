import { inject } from "@vercel/analytics";
inject({ mode: import.meta.env.DEV ? 'development' : 'production' });



document.documentElement.classList.add('js');

const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#primary-nav');

function setMenuOpen(open) {
    if (!menuButton || !navigation) return;
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
    navigation.classList.toggle('is-open', open);
}

if (menuButton && navigation) {
    menuButton.addEventListener('click', () => {
        setMenuOpen(menuButton.getAttribute('aria-expanded') !== 'true');
    });

    navigation.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', () => setMenuOpen(false));
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') setMenuOpen(false);
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth > 680) setMenuOpen(false);
    });
}

const year = document.querySelector('#current-year');
if (year) year.textContent = String(new Date().getFullYear());

document.querySelectorAll('.project-image').forEach((image) => {
    const showFallback = () => {
        image.hidden = true;
    };

    image.addEventListener('error', showFallback, { once: true });
    if (image.complete && image.naturalWidth === 0) showFallback();
});

const revealItems = document.querySelectorAll('.reveal');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if ('IntersectionObserver' in window && !reduceMotion) {
    const observer = new IntersectionObserver((entries, currentObserver) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                currentObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });

    revealItems.forEach((item) => observer.observe(item));
} else {
    revealItems.forEach((item) => item.classList.add('is-visible'));
}
