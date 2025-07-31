document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const progressBar = document.getElementById('progressBar');
    const themeBtn = document.getElementById('themeBtn');
    const fullscreenBtn = document.getElementById('fullscreenBtn');
    let currentSlide = 0;

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.remove('active', 'prev', 'next');
            if (i === index) {
                slide.classList.add('active');
            } else if (i < index) {
                slide.classList.add('prev');
            } else {
                slide.classList.add('next');
            }
        });
        
        const progress = ((index + 1) / slides.length) * 100;
        progressBar.style.width = `${progress}%`;
        
        prevBtn.style.display = index === 0 ? 'none' : 'flex';
        nextBtn.style.display = index === slides.length - 1 ? 'none' : 'flex';
    }
    
    function nextSlide() {
        if (currentSlide < slides.length - 1) {
            currentSlide++;
            showSlide(currentSlide);
        }
    }
    
    function prevSlide() {
        if (currentSlide > 0) {
            currentSlide--;
            showSlide(currentSlide);
        }
    }
    
    function toggleTheme() {
        const newTheme = document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        themeBtn.innerHTML = newTheme === 'dark' ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    }

    function toggleFullscreen() {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch(err => {
                console.error(`Error al activar pantalla completa: ${err.message}`);
            });
        } else {
            document.exitFullscreen();
        }
    }

    // Event Listeners
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight' && nextBtn.style.display !== 'none') {
            nextSlide();
        } else if (e.key === 'ArrowLeft' && prevBtn.style.display !== 'none') {
            prevSlide();
        }
    });
    themeBtn.addEventListener('click', toggleTheme);
    fullscreenBtn.addEventListener('click', toggleFullscreen);
    document.addEventListener('fullscreenchange', () => {
        const icon = fullscreenBtn.querySelector('i');
        if (document.fullscreenElement) {
            icon.classList.replace('fa-expand', 'fa-compress');
        } else {
            icon.classList.replace('fa-compress', 'fa-expand');
        }
    });

    // Initial Setup
    const initialTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', initialTheme);
    themeBtn.innerHTML = initialTheme === 'dark' ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    showSlide(currentSlide);
});