// subtle floating ornaments (minimal & aesthetic)
function createSubtleOrnaments() {
    const container = document.getElementById('floatingOrnaments');
    if (!container) return;
    const symbols = ['✧', '○', '◍', '❤︎', '✦'];
    for (let i = 0; i < 16; i++) {
        const el = document.createElement('div');
        el.classList.add('ornament');
        el.innerHTML = symbols[Math.floor(Math.random() * symbols.length)];
        const size = Math.random() * 20 + 12;
        el.style.fontSize = size + 'px';
        el.style.left = Math.random() * 100 + '%';
        el.style.animationDuration = 12 + Math.random() * 20 + 's';
        el.style.animationDelay = Math.random() * 10 + 's';
        el.style.opacity = 0.2 + Math.random() * 0.3;
        container.appendChild(el);
    }
}

// intersection observer for scroll reveals (smooth)
const revealElements = document.querySelectorAll('.timeline-item, .gallery-card, .quotes-container, .message-inner');

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            // Add staggered delay for mobile timeline items
            if (window.innerWidth <= 768 && entry.target.classList.contains('timeline-item')) {
                const allTimelineItems = document.querySelectorAll('.timeline-item');
                const itemIndex = Array.from(allTimelineItems).indexOf(entry.target);
                setTimeout(() => {
                    entry.target.classList.add('revealed');
                }, itemIndex * 150);
            } else {
                entry.target.classList.add('revealed');
            }
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.15, rootMargin: '0px 0px -20px 0px' });

revealElements.forEach(el => {
    el.classList.add('reveal-on-scroll');
    observer.observe(el);
});

// smooth scroll for any anchor (if needed)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        const targetEl = document.querySelector(targetId);
        if (targetEl) {
            targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

createSubtleOrnaments();

// parallax-ish effect on hero title (simple mousemove)
const heroTitle = document.querySelector('.hero-title');
if (heroTitle) {
    document.addEventListener('mousemove', (e) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 8;
        const y = (e.clientY / window.innerHeight - 0.5) * 8;
        heroTitle.style.transform = `translate(${x * 0.5}px, ${y * 0.5}px)`;
    });
}

// Touch swipe support for mobile timeline navigation
let touchStartX = 0;
let touchEndX = 0;

const timelineSection = document.querySelector('.timeline-section');
if (timelineSection && window.innerWidth <= 768) {
    timelineSection.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    timelineSection.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });
}

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > swipeThreshold) {
        const swipeHint = document.querySelector('.timeline-swipe-hint');
        if (swipeHint) {
            swipeHint.style.opacity = '0';
            setTimeout(() => {
                swipeHint.style.opacity = '1';
            }, 3000);
        }
    }
}

// Lightbox functionality for gallery images
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxClose = document.getElementById('lightbox-close');
const galleryImages = document.querySelectorAll('.gallery-media img');

// Background Music - autoplay on page load
const bgMusic = document.getElementById('bgMusic');
window.addEventListener('DOMContentLoaded', () => {
    bgMusic.volume = 0.5;
    bgMusic.play().catch(() => {
        // If autoplay is blocked, try on first click
        document.addEventListener('click', () => {
            bgMusic.play();
        }, { once: true });
    });
});

// Open lightbox when image is clicked
galleryImages.forEach(img => {
    img.style.cursor = 'pointer';
    img.addEventListener('click', () => {
        lightboxImg.src = img.src;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
});

// Close lightbox
function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
}

lightboxClose.addEventListener('click', closeLightbox);

// Close lightbox when clicking outside the image
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        closeLightbox();
    }
});

// Close lightbox with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('active')) {
        closeLightbox();
    }
});
