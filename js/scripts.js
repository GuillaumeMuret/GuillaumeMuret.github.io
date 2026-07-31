/*!
* Start Bootstrap - Resume v7.0.4 (https://startbootstrap.com/theme/resume)
* Copyright 2013-2021 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-resume/blob/master/LICENSE)
*/
//
// Scripts
//

window.addEventListener('DOMContentLoaded', event => {

    // Activate Bootstrap scrollspy on the main nav element
    const sideNav = document.body.querySelector('#sideNav');
    if (sideNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#sideNav',
            offset: 74,
        });
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

    // FR/EN language switch (initial lang is set on <html> by the inline head script)
    const pageMeta = {
        fr: {
            title: 'Guillaume Muret - Ingénieur Android Senior',
            description: "CV de Guillaume Muret, ingénieur Android senior (Kotlin, Compose Multiplatform) à Bordeaux.",
        },
        en: {
            title: 'Guillaume Muret - Senior Android Engineer',
            description: 'Resume of Guillaume Muret, senior Android engineer (Kotlin, Compose Multiplatform) based in Bordeaux, France.',
        },
    };
    const applyLang = lang => {
        document.documentElement.lang = lang;
        document.title = pageMeta[lang].title;
        document.querySelector('meta[name="description"]').setAttribute('content', pageMeta[lang].description);
        const label = document.getElementById('langToggleLabel');
        if (label) {
            label.textContent = lang === 'fr' ? 'EN' : 'FR';
        }
        try {
            localStorage.setItem('lang', lang);
        } catch (e) {}
    };
    applyLang(document.documentElement.lang === 'en' ? 'en' : 'fr');
    const langToggle = document.getElementById('langToggle');
    if (langToggle) {
        langToggle.addEventListener('click', () => {
            applyLang(document.documentElement.lang === 'fr' ? 'en' : 'fr');
        });
    }

    // Easter egg : 5 clics rapides sur la photo (ou le nom sur mobile)
    const showEasterEgg = () => {
        if (document.getElementById('easterEgg')) {
            return;
        }
        const overlay = document.createElement('div');
        overlay.id = 'easterEgg';
        const emojis = ['🤖', '🚀', '📱', '☕', '💚'];
        let drops = '';
        for (let i = 0; i < 24; i++) {
            const emoji = emojis[i % emojis.length];
            const left = (Math.random() * 100).toFixed(1);
            const duration = (2.5 + Math.random() * 3).toFixed(2);
            const delay = (Math.random() * 2).toFixed(2);
            const size = (1.2 + Math.random() * 1.6).toFixed(2);
            drops += `<span class="egg-drop" style="left:${left}%;animation-duration:${duration}s;animation-delay:${delay}s;font-size:${size}rem;">${emoji}</span>`;
        }
        overlay.innerHTML = `
            ${drops}
            <div class="egg-card">
                <div class="egg-emoji">🤖</div>
                <h3 class="mb-2"><span class="lang-fr">Easter egg trouvé&nbsp;!</span><span class="lang-en">Easter egg found!</span></h3>
                <p class="mb-2">
                    <span class="lang-fr">Comme sur Android&nbsp;: 7 taps pour débloquer le mode développeur… ici, 5 ont suffi. Bien joué&nbsp;!</span>
                    <span class="lang-en">Just like Android: 7 taps unlock developer mode… here, 5 did the trick. Well played!</span>
                </p>
                <p class="egg-hint mb-0"><span class="lang-fr">(cliquer n'importe où pour fermer)</span><span class="lang-en">(click anywhere to close)</span></p>
            </div>`;
        const close = () => {
            overlay.remove();
            document.removeEventListener('keydown', onKeydown);
        };
        const onKeydown = e => {
            if (e.key === 'Escape') {
                close();
            }
        };
        overlay.addEventListener('click', close);
        document.addEventListener('keydown', onKeydown);
        document.body.appendChild(overlay);
        const photo = document.querySelector('#sideNav .img-profile');
        if (photo) {
            photo.classList.add('egg-spin');
            photo.addEventListener('animationend', () => photo.classList.remove('egg-spin'), { once: true });
        }
    };
    const brand = document.querySelector('#sideNav .navbar-brand');
    if (brand) {
        let clickCount = 0;
        let lastClickTime = 0;
        brand.addEventListener('click', () => {
            const now = Date.now();
            clickCount = now - lastClickTime < 600 ? clickCount + 1 : 1;
            lastClickTime = now;
            if (clickCount >= 5) {
                clickCount = 0;
                showEasterEgg();
            }
        });
    }

});
