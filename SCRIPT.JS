// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Active navigation highlighting
    function highlightActiveSection() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        
        let current = '';
        const scrollPosition = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('text-blue-400', 'bg-blue-900', 'bg-opacity-50');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('text-blue-400', 'bg-blue-900', 'bg-opacity-50');
            }
        });
    }
    
    // Scroll event listener for active navigation
    window.addEventListener('scroll', highlightActiveSection);
    
    // Initial call to highlight active section
    highlightActiveSection();
    
    // Animated skill tags
    const skillTags = document.querySelectorAll('.skill-tag');
    skillTags.forEach((tag, index) => {
        tag.style.animationDelay = `${index * 0.1}s`;
        tag.classList.add('animate-bounce');
        
        // Remove bounce animation after initial load
        setTimeout(() => {
            tag.classList.remove('animate-bounce');
        }, 3000 + (index * 100));
    });
    
    // Intersection Observer for slide animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const slideObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fadeInUp');
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe all slide content
    const slideContents = document.querySelectorAll('.slide > div');
    slideContents.forEach(slide => {
        slide.style.opacity = '0';
        slide.style.transform = 'translateY(50px)';
        slide.style.transition = 'all 0.8s ease';
        slideObserver.observe(slide);
    });
    
    // Project item hover effects
    const projectItems = document.querySelectorAll('.project-item');
    projectItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Typing animation for the main title
    const mainTitle = document.querySelector('#cover h1');
    if (mainTitle) {
        const text = mainTitle.textContent;
        mainTitle.textContent = '';
        
        let i = 0;
        const typingSpeed = 100;
        
        function typeWriter() {
            if (i < text.length) {
                mainTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, typingSpeed);
            }
        }
        
        // Start typing animation after a short delay
        setTimeout(typeWriter, 500);
    }
    
    // Parallax effect for background
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        const slides = document.querySelectorAll('.slide');
        slides.forEach((slide, index) => {
            if (index % 2 === 0) {
                slide.style.transform = `translateY(${rate * 0.1}px)`;
            }
        });
    });
    
    // Add loading animation
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        const sections = document.querySelectorAll('section[id]');
        const currentSection = document.querySelector('section[id].current');
        let currentIndex = 0;
        
        // Find current section
        sections.forEach((section, index) => {
            const rect = section.getBoundingClientRect();
            if (rect.top <= 100 && rect.bottom >= 100) {
                currentIndex = index;
            }
        });
        
        // Navigate with arrow keys
        if (e.key === 'ArrowDown' && currentIndex < sections.length - 1) {
            e.preventDefault();
            sections[currentIndex + 1].scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        } else if (e.key === 'ArrowUp' && currentIndex > 0) {
            e.preventDefault();
            sections[currentIndex - 1].scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
    
    // Mobile touch gestures
    let touchStartY = 0;
    let touchEndY = 0;
    
    document.addEventListener('touchstart', function(e) {
        touchStartY = e.changedTouches[0].screenY;
    });
    
    document.addEventListener('touchend', function(e) {
        touchEndY = e.changedTouches[0].screenY;
        handleSwipe();
    });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const sections = document.querySelectorAll('section[id]');
        let currentIndex = 0;
        
        // Find current section
        sections.forEach((section, index) => {
            const rect = section.getBoundingClientRect();
            if (rect.top <= 100 && rect.bottom >= 100) {
                currentIndex = index;
            }
        });
        
        // Swipe up (next section)
        if (touchStartY - touchEndY > swipeThreshold && currentIndex < sections.length - 1) {
            sections[currentIndex + 1].scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
        
        // Swipe down (previous section)
        if (touchEndY - touchStartY > swipeThreshold && currentIndex > 0) {
            sections[currentIndex - 1].scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }
    
    // Add scroll progress indicator
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, #3B82F6, #06B6D4);
        z-index: 9999;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', function() {
        const scrollPercent = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
        progressBar.style.width = scrollPercent + '%';
    });
    
    console.log('Portfolio loaded successfully!');
});