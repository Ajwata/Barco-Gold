
    // Telegram form submission for CTA
    const tgForm = document.getElementById('tg-form');
    if (tgForm) {
        tgForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const name = tgForm.name.value.trim();
            const phone = tgForm.phone.value.trim();
            const comment = tgForm.comment.value.trim();
            const successMsg = document.getElementById('tg-success');
            const errorMsg = document.getElementById('tg-error');
            if (successMsg) successMsg.classList.add('hidden');
            if (errorMsg) errorMsg.classList.add('hidden');

            // --- SET YOUR TELEGRAM BOT TOKEN AND CHAT ID BELOW ---
            const BOT_TOKEN = 'YOUR_BOT_TOKEN'; // <-- Замените на свой токен
            const CHAT_ID = 'YOUR_CHAT_ID';     // <-- Замените на свой chat_id
            // -----------------------------------------------------

            const text = encodeURIComponent(
                `Заявка з сайту\nІм'я: ${name}\nТелефон: ${phone}\nКоментар: ${comment}`
            );
            const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage?chat_id=${CHAT_ID}&text=${text}`;

            try {
                const res = await fetch(url);
                if (res.ok) {
                    if (successMsg) successMsg.classList.remove('hidden');
                    tgForm.reset();
                } else {
                    if (errorMsg) errorMsg.classList.remove('hidden');
                }
            } catch {
                if (errorMsg) errorMsg.classList.remove('hidden');
            }
        });
    }

    // Testimonials slider
    const slider = document.getElementById('testimonial-slider');
    const sliderTrack = slider ? slider.querySelector('.flex') : null;
    const prevBtn = document.getElementById('testimonial-prev');
    const nextBtn = document.getElementById('testimonial-next');
    const slides = sliderTrack ? sliderTrack.children : [];
    let currentSlide = 0;

    function updateSlider() {
        if (!sliderTrack) return;
        sliderTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
    }

    if (prevBtn && nextBtn && slides.length > 0) {
        prevBtn.addEventListener('click', () => {
            currentSlide = (currentSlide - 1 + slides.length) % slides.length;
            updateSlider();
        });
        nextBtn.addEventListener('click', () => {
            currentSlide = (currentSlide + 1) % slides.length;
            updateSlider();
        });
    }

    // Optional: swipe support for mobile
    let startX = null;
    if (slider) {
        slider.addEventListener('touchstart', e => {
            startX = e.touches[0].clientX;
        });
        slider.addEventListener('touchend', e => {
            if (startX === null) return;
            const endX = e.changedTouches[0].clientX;
            if (endX - startX > 50) {
                prevBtn.click();
            } else if (startX - endX > 50) {
                nextBtn.click();
            }
            startX = null;
        });
    }
document.addEventListener('DOMContentLoaded', () => {
    const toggle = document.querySelector('.nav-toggle');
    const mobileNav = document.querySelector('.mobile-nav');
    const header = document.querySelector('header');

    toggle.addEventListener('click', () => {
        mobileNav.classList.toggle('hidden');
    });

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('shadow-lg');
        } else {
            header.classList.remove('shadow-lg');
        }
    });

    // smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();
            const href = link.getAttribute('href');
            const target = href === '#' ? document.body : document.querySelector(href);
            if (target) {
                window.scrollTo({ top: target.offsetTop - header.offsetHeight, behavior: 'smooth' });
            }
            if (!mobileNav.classList.contains('hidden')) mobileNav.classList.add('hidden');
        });
    });
    // animated statistics numbers
    function animateStats() {
        const stats = document.querySelectorAll('.stat-number');
        stats.forEach(stat => {
            const target = +stat.getAttribute('data-target');
            let current = 0;
            // Smaller increment for slower animation
            const increment = Math.max(1, Math.ceil(target / 120));
            function update() {
                if (current < target) {
                    current += increment;
                    if (current > target) current = target;
                    stat.textContent = current;
                    setTimeout(update, 18); // ~55fps, but slower than requestAnimationFrame
                } else {
                    stat.textContent = target;
                }
            }
            update();
        });
    }
    // trigger animation when stats section is in view
    let statsAnimated = false;
    window.addEventListener('scroll', () => {
        if (statsAnimated) return;
        const statsSection = document.getElementById('stats');
        if (!statsSection) return;
        const rect = statsSection.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100) {
            animateStats();
            statsAnimated = true;
        }
    });
    // fallback: animate if already in view on load
    setTimeout(() => {
        const statsSection = document.getElementById('stats');
        if (!statsAnimated && statsSection) {
            const rect = statsSection.getBoundingClientRect();
            if (rect.top < window.innerHeight - 100) {
                animateStats();
                statsAnimated = true;
            }
        }
    }, 500);
});