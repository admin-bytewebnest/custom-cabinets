const heroSoundSound = document.querySelectorAll('.hero-sound--sound');
const heroSoundMute = document.querySelectorAll('.hero-sound--mute');

const sound = document.getElementById('sound');
const video = document.getElementById('hero-video');

sound.addEventListener('click', () => {

    if (video.muted) {

        // Включаем звук
        video.muted = false;
        video.volume = 0;

        let volume = 0;

        const fadeIn = setInterval(() => {
            volume += 0.05;

            if (volume >= 1) {
                volume = 1;
                clearInterval(fadeIn);
            }

            video.volume = volume;
        }, 100);

        heroSoundSound.forEach(item => {
            item.style.display = 'none';
        });

        heroSoundMute.forEach(item => {
            item.style.display = 'block';
        });

    } else {

        // Выключаем звук
        let volume = video.volume;

        const fadeOut = setInterval(() => {
            volume -= 0.05;

            if (volume <= 0) {
                volume = 0;
                clearInterval(fadeOut);

                video.muted = true;
                video.volume = 1;
            }

            video.volume = volume;
        }, 100);

        heroSoundSound.forEach(item => {
            item.style.display = 'block';
        });

        heroSoundMute.forEach(item => {
            item.style.display = 'none';
        });
    }

});

//*********************************************************************** */


document.addEventListener('DOMContentLoaded', () => {

    const slides = document.querySelectorAll(
        '.testimonials-contents__item.card-mobil'
    );

    const nextBtn = document.querySelector('.testimonials-next');
    const prevBtn = document.querySelector('.testimonials-prev');

    let current = 0;
    let isAnimating = false;
    let autoSlide;

    slides.forEach((slide, index) => {
        if(index === 0){
            slide.classList.add('active');
            slide.style.transform = 'translateX(0)';
            slide.style.opacity = '1';
        } else {
            slide.style.transform = 'translateX(120%)';
            slide.style.opacity = '0';
        }
    });

    function changeSlide(direction){

        if(isAnimating) return;

        isAnimating = true;

        const currentSlide = slides[current];

        let nextIndex;

        if(direction === 'next'){
            nextIndex = (current + 1) % slides.length;
        } else {
            nextIndex =
                (current - 1 + slides.length) % slides.length;
        }

        const nextSlide = slides[nextIndex];

        nextSlide.classList.add('active');

        nextSlide.style.transition = 'none';

        nextSlide.style.transform =
            direction === 'next'
                ? 'translateX(120%)'
                : 'translateX(-120%)';

        nextSlide.style.opacity = '1';

        nextSlide.offsetHeight;

        nextSlide.style.transition =
            'transform .45s ease, opacity .45s ease';

        currentSlide.style.transform =
            direction === 'next'
                ? 'translateX(-120%)'
                : 'translateX(120%)';

        currentSlide.style.opacity = '0';

        nextSlide.style.transform = 'translateX(0)';

        setTimeout(() => {

            currentSlide.classList.remove('active');

            current = nextIndex;

            isAnimating = false;

        }, 450);
    }

    function startAutoSlide() {

        clearInterval(autoSlide);

        autoSlide = setInterval(() => {
            changeSlide('next');
        }, 5000);

    }

    nextBtn.addEventListener('click', () => {
        changeSlide('next');
        startAutoSlide();
    });

    prevBtn.addEventListener('click', () => {
        changeSlide('prev');
        startAutoSlide();
    });

    startAutoSlide();

});