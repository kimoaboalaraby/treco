// GSAP Animations
document.addEventListener('DOMContentLoaded'), function() {
    // Preloader animation
    const preloaderTimeline = gsap.timeline();
    
    preloaderTimeline
        .from('.preloader-logo', {
            scale: 0.8,
            opacity: 0,
            duration: 1,
            ease: 'power3.out'
        })
        .from('.preloader-progress-bar', {
            width: 0,
            duration: 2,
            ease: 'power1.out'
        }, '-=0.5');
    
    // Hero section animations
    const heroTimeline = gsap.timeline();
    
    heroTimeline
        .from('.hero-title .title-line', {
            y: 50,
            opacity: 0,
            stagger: 0.2,
            duration: 1,
            ease: 'power3.out'
        })
        .from('.hero-text', {
            y: 30,
            opacity: 0,
            duration: 0.8,
            ease: 'power2.out'
        }, '-=0.5')
        .from('.hero-actions', {
            y: 30,
            opacity: 0,
            duration: 0.8,
            ease: 'power2.out'
        }, '-=0.4')
        .from('.hero-image img', {
            y: 50,
            opacity: 0,
            duration: 1,
            ease: 'power3.out'
        }, '-=0.8')
        .from('.shape-1', {
            scale: 0,
            opacity: 0,
            duration: 1,
            ease: 'elastic.out(1, 0.5)'
        }, '-=1')
        .from('.shape-2', {
            scale: 0,
            opacity: 0,
            duration: 1,
            ease: 'elastic.out(1, 0.5)'
        }, '-=0.8')
        .from('.shape-3', {
            scale: 0,
            opacity: 0,
            duration: 1,
            ease: 'elastic.out(1, 0.5)'
        }, '-=0.6');
    
    // Scroll animations for sections
    gsap.utils.toArray('.service-card').forEach((card, i) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 80%',
                toggleActions: 'play none none none'
            },
            y: 50,
            opacity: 0,
            duration: 0.8,
            delay: i * 0.1,
            ease: 'power2.out'
        });
    });
    
    // Animate on scroll for testimonials
    gsap.utils.toArray('.testimonial-card').forEach((card, i) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 80%',
                toggleActions: 'play none none none'
            },
            x: i % 2 === 0 ? 100 : -100,
            opacity: 0,
            duration: 0.8,
            delay: i * 0.1,
            ease: 'power2.out'
        });
    });
    
    // Team member animations
    gsap.utils.toArray('.team-member').forEach((member, i) => {
        gsap.from(member, {
            scrollTrigger: {
                trigger: member,
                start: 'top 80%',
                toggleActions: 'play none none none'
            },
            y: 50,
            opacity: 0,
            duration: 0.8,
            delay: i * 0.1,
            ease: 'power2.out'
        });
    });
    
    // Contact form animations
    gsap.from('.contact-info', {
        scrollTrigger: {
            trigger: '.contact',
            start: 'top 80%',
            toggleActions: 'play none none none'
        },
        x: -100,
        opacity: 0,
        duration: 1,
        ease: 'power2.out'
    });
    
    gsap.from('.contact-form', {
        scrollTrigger: {
            trigger: '.contact',
            start: 'top 80%',
            toggleActions: 'play none none none'
        },
        x: 100,
        opacity: 0,
        duration: 1,
        ease: 'power2.out'
    });
    
    // Footer animations
    gsap.utils.toArray('.footer-col').forEach((col, i) => {
        gsap.from(col, {
            scrollTrigger: {
                trigger: '.footer',
                start: 'top 80%',
                toggleActions: 'play none none none'
            },
            y: 50,
            opacity: 0,
            duration: 0.8,
            delay: i * 0.1,
            ease: 'power2.out'
        });
    });
    
    // ScrollTrigger for header
    ScrollTrigger.create({
        start: 100,
        onUpdate: (self) => {
            if (self.direction === -1) {
                // Scrolling up
                gsap.to(header, {
                    y: 0,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            } else if (self.direction === 1) {
                // Scrolling down
                gsap.to(header, {
                    y: -100,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            }
        }
    });
    
    // Parallax effect for hero shapes
    gsap.to('.shape-1', {
        scrollTrigger: {
            trigger: '.hero',
            start: 'top top',
            end: 'bottom top',
            scrub: true
        },
        y: 100,
        ease: 'none'
    });
    
    gsap.to('.shape-2', {
        scrollTrigger: {
            trigger: '.hero',
            start: 'top top',
            end: 'bottom top',
            scrub: true
        },
        y: -100,
        ease: 'none'
    });
    
    // Animate elements when they come into view
    gsap.utils.toArray('[data-aos]').forEach(element => {
        ScrollTrigger.create({
            trigger: element,
            start: 'top 80%',
            once: true,
            onEnter: () => {
                element.classList.add('aos-animate');
            }
        });
    });
    
    // Floating animation for shapes
    gsap.to('.shape-3', {
        y: 20,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
    });
    
    // Text animation for hero title
    const heroTitleLines = document.querySelectorAll('.title-line');
    heroTitleLines.forEach(line => {
        const chars = line.textContent.split('');
        line.textContent = '';
        
        chars.forEach((char, i) => {
            const span = document.createElement('span');
            span.textContent = char;
            span.style.display = 'inline-block';
            gsap.from(span, {
                y: 30,
                opacity: 0,
                duration: 0.5,
                delay: i * 0.05,
                ease: 'power3.out'
            });
            line.appendChild(span);
        });
    });
    
    // Hover animations for service cards
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            gsap.to(card, {
                y: -10,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
        
        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                y: 0,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
    });
    
    
    document.addEventListener('DOMContentLoaded', () => {
        const primaryButtons = document.querySelectorAll('.btn-primary');
    
        primaryButtons.forEach(button => {
            button.addEventListener('mouseenter', () => {
                const rootStyles = getComputedStyle(document.documentElement);
                const primaryDark = rootStyles.getPropertyValue('--primary-dark').trim();
                const primaryLight = rootStyles.getPropertyValue('--primary-light').trim();
    
                gsap.to(button, {
                    backgroundImage: `linear-gradient(45deg, ${primaryDark}, ${primaryLight})`,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            });
    
            button.addEventListener('mouseleave', () => {
                const rootStyles = getComputedStyle(document.documentElement);
                const primaryColor = rootStyles.getPropertyValue('--primary-color').trim();
    
                gsap.to(button, {
                    backgroundColor: primaryColor,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            });
        });
    });
    

}