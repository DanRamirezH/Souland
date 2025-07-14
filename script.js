// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
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

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(0, 0, 0, 0.95)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.5)';
    } else {
        navbar.style.background = 'rgba(0, 0, 0, 0.9)';
        navbar.style.boxShadow = 'none';
    }
});

// Scroll reveal animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
        }
    });
}, observerOptions);

// Add scroll-reveal class to elements and observe them
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section');
    const cards = document.querySelectorAll('.news-item, .tour-item, .sponsor');
    
    sections.forEach(section => {
        section.classList.add('scroll-reveal');
        observer.observe(section);
    });
    
    cards.forEach(card => {
        card.classList.add('scroll-reveal');
        observer.observe(card);
    });
});

// Newsletter form handling
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const countrySelect = newsletterForm.querySelector('.country-select');
        const selectedCountry = countrySelect.value;
        
        if (!selectedCountry) {
            alert('Please select your country.');
            return;
        }
        
        // Simulate form submission
        const submitBtn = newsletterForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        submitBtn.textContent = 'Subscribing...';
        submitBtn.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            alert('Thank you for subscribing to the Souland newsletter!');
            newsletterForm.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 2000);
    });
}

// Video placeholder interaction
const videoPlaceholder = document.querySelector('.video-placeholder');
if (videoPlaceholder) {
    videoPlaceholder.addEventListener('click', () => {
        videoPlaceholder.innerHTML = `
            <i class="fas fa-play-circle" style="font-size: 4rem; color: #ffffff; margin-bottom: 1rem;"></i>
            <p>Video Loading...</p>
        `;
        
        // Reset after 3 seconds
        setTimeout(() => {
            videoPlaceholder.innerHTML = `
                <i class="fas fa-play-circle"></i>
                <p>Video Coming Soon</p>
            `;
        }, 3000);
    });
}

// Tour item interactions
document.querySelectorAll('.tour-item .btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        const tourItem = btn.closest('.tour-item');
        const location = tourItem.querySelector('.tour-location').textContent;
        const venue = tourItem.querySelector('.tour-venue').textContent;
        const date = tourItem.querySelector('.tour-date').textContent;
        
        alert(`Tour Information:\n\nLocation: ${location}\nVenue: ${venue}\nDate: ${date}\n\nTicket information coming soon!`);
    });
});

// Album artwork interaction
const albumPlaceholder = document.querySelector('.album-placeholder');
if (albumPlaceholder) {
    albumPlaceholder.addEventListener('click', () => {
        albumPlaceholder.innerHTML = `
            <i class="fas fa-compact-disc" style="color: #ffffff; animation: spin 2s linear infinite;"></i>
            <p>Loading Album...</p>
        `;
        
        setTimeout(() => {
            albumPlaceholder.innerHTML = `
                <i class="fas fa-compact-disc"></i>
                <p>Symphony of Shadows</p>
            `;
        }, 3000);
    });
}

// Add CSS for spinning animation
const style = document.createElement('style');
style.textContent = `
    @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }
`;
document.head.appendChild(style);

// News item interactions
document.querySelectorAll('.read-more').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const newsItem = link.closest('.news-item');
        const title = newsItem.querySelector('h3').textContent;
        const date = newsItem.querySelector('.news-date').textContent;
        
        alert(`News Article:\n\nDate: ${date}\nTitle: ${title}\n\nFull article coming soon!`);
    });
});

// Add some dynamic content updates
setInterval(() => {
    const tourItems = document.querySelectorAll('.tour-item');
    tourItems.forEach(item => {
        const dateElement = item.querySelector('.tour-date');
        if (dateElement) {
            // Add a subtle animation
            dateElement.style.transition = 'color 0.3s ease';
            dateElement.style.color = '#ffffff';
            setTimeout(() => {
                dateElement.style.color = '#cccccc';
            }, 1000);
        }
    });
}, 15000); // Update every 15 seconds

// Add keyboard navigation support
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        // Close mobile menu
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// Add touch gestures for mobile
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener('touchend', e => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            // Swipe left - could be used for next section
            console.log('Swiped left');
        } else {
            // Swipe right - could be used for previous section
            console.log('Swiped right');
        }
    }
}

// Performance optimization: Throttle scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Apply throttling to scroll events
window.addEventListener('scroll', throttle(() => {
    // Scroll-based animations and effects
}, 16)); // ~60fps

// Add some Easter eggs
let clickCount = 0;
const logo = document.querySelector('.nav-logo h1');
if (logo) {
    logo.addEventListener('click', () => {
        clickCount++;
        if (clickCount === 5) {
            logo.style.animation = 'glow 0.5s ease-in-out infinite alternate';
            setTimeout(() => {
                logo.style.animation = '';
                clickCount = 0;
            }, 3000);
        }
    });
}

// Add glow animation for Easter egg
const glowStyle = document.createElement('style');
glowStyle.textContent = `
    @keyframes glow {
        from { text-shadow: 0 0 10px #ffffff; }
        to { text-shadow: 0 0 20px #ffffff, 0 0 30px #ffffff; }
    }
`;
document.head.appendChild(glowStyle);

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    console.log('Souland Symphonic Metal website loaded successfully! 🎵');
    
    // Add some console styling
    console.log('%c🎵 Welcome to Souland - Symphonic Metal 🎵', 'color: #ffffff; font-size: 20px; font-weight: bold;');
    console.log('%cFollow us on Instagram and Facebook for more symphonic metal content', 'color: #cccccc; font-size: 14px;');
    
    // Add loading animation
    document.body.classList.add('loaded');
    
    // Animate hero content
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.opacity = '0';
        heroContent.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            heroContent.style.transition = 'all 1s ease';
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateY(0)';
        }, 500);
    }
});

// Add parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        const rate = scrolled * -0.5;
        hero.style.transform = `translateY(${rate}px)`;
    }
});

// Add some symphonic metal themed interactions
document.addEventListener('DOMContentLoaded', () => {
    // Add metal-themed hover effects
    const metalElements = document.querySelectorAll('.news-item, .tour-item, .sponsor');
    
    metalElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            element.style.borderColor = '#ffffff';
        });
        
        element.addEventListener('mouseleave', () => {
            element.style.borderColor = '#333';
        });
    });
    
    // Add dramatic scroll effects
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const speed = 0.5;
            const yPos = -(scrolled * speed);
            section.style.transform = `translateY(${yPos}px)`;
        });
    });
}); 