document.addEventListener('DOMContentLoaded', function() {
    // تهيئة Swiper للسلايدرات
    initSwipers();
    
    // تهيئة التنقل بين أقسام المعرض
    initGalleryNavigation();
    
    // تهيئة تشغيل الفيديوهات
    initVideoPlayers();
    
    // تهيئة أزرار الإعجاب
    initLikeButtons();
    
    // تهيئة مفاتيح الصوت
    initSoundButtons();
    
    // تهيئة مربع العرض للصور (Lightbox)
    initLightbox();
    
    // تهيئة تأثيرات القائمة الرئيسية
    initMainMenu();
    
    // تهيئة تأثيرات التمرير باستخدام GSAP
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        initScrollEffects();
    }
});

// دالة تهيئة السلايدرات
function initSwipers() {
    const designSliders = document.querySelectorAll('.design-slider');
    
    designSliders.forEach(function(slider) {
        new Swiper(slider, {
            slidesPerView: 1,
            spaceBetween: 20,
            loop: true,
            autoplay: {
                delay: 5000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true
            },
            navigation: {
                nextEl: slider.querySelector('.swiper-button-next'),
                prevEl: slider.querySelector('.swiper-button-prev'),
            },
            pagination: {
                el: slider.querySelector('.swiper-pagination'),
                clickable: true,
            },
            breakpoints: {
                576: {
                    slidesPerView: 2,
                    spaceBetween: 15,
                },
                992: {
                    slidesPerView: 3,
                    spaceBetween: 20,
                },
                1200: {
                    slidesPerView: 4,
                    spaceBetween: 20,
                }
            }
        });
    });
}

// دالة تهيئة قائمة التنقل بين أقسام المعرض
function initGalleryNavigation() {
    const galleryLinks = document.querySelectorAll('.gallery-categories a');
    const headerHeight = document.querySelector('.header').offsetHeight;
    const navbarHeight = document.querySelector('.gallery-navbar').offsetHeight;
    const offset = headerHeight + navbarHeight;
    
    // تفعيل التمرير السلس عند النقر على روابط التنقل
    galleryLinks.forEach(function(link) {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // تحديث الرابط النشط
            galleryLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
            
            // التمرير إلى القسم المطلوب
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const targetPosition = targetSection.offsetTop - offset;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // تحديث الروابط النشطة أثناء التمرير
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY + offset + 50; // نضيف هامشًا للتحديد الدقيق
        
        document.querySelectorAll('.design-section').forEach(function(section) {
            const sectionTop = section.offsetTop;
            const sectionBottom = sectionTop + section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                const sectionId = section.getAttribute('id');
                
                galleryLinks.forEach(function(link) {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
}

// دالة تهيئة تشغيل الفيديوهات
function initVideoPlayers() {
    const playButtons = document.querySelectorAll('.play-btn');
    const videoModal = document.querySelector('.video-modal');
    const modalVideo = videoModal ? videoModal.querySelector('video') : null;
    const closeModal = videoModal ? videoModal.querySelector('.close-modal') : null;
    
    // تفعيل أزرار التشغيل
    playButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            const videoContainer = this.closest('.design-frame');
            const video = videoContainer.querySelector('video');
            
            if (video && videoModal && modalVideo) {
                const source = video.querySelector('source');
                if (source) {
                    const videoSrc = source.getAttribute('src');
                    
                    // تعيين المصدر وتحميل الفيديو في المودال
                    const modalSource = modalVideo.querySelector('source');
                    if (modalSource) {
                        modalSource.setAttribute('src', videoSrc);
                        modalVideo.load();
                        
                        // فتح المودال وتشغيل الفيديو
                        videoModal.classList.add('active');
                        
                        modalVideo.addEventListener('loadeddata', function onceLoaded() {
                            modalVideo.play();
                            modalVideo.removeEventListener('loadeddata', onceLoaded);
                        });
                    }
                }
            }
        });
    });
    
    // إغلاق المودال
    if (closeModal) {
        closeModal.addEventListener('click', function() {
            closeVideoModal();
        });
    }
    
    // إغلاق المودال عند النقر خارج الفيديو
    if (videoModal) {
        videoModal.addEventListener('click', function(e) {
            if (e.target === this) {
                closeVideoModal();
            }
        });
    }
    
    // إغلاق المودال عند الضغط على زر Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && videoModal && videoModal.classList.contains('active')) {
            closeVideoModal();
        }
    });
    
    // دالة إغلاق المودال
    function closeVideoModal() {
        if (modalVideo) {
            modalVideo.pause();
        }
        if (videoModal) {
            videoModal.classList.remove('active');
        }
        
        // إعادة تعيين مصدر الفيديو بعد تأخير قصير
        setTimeout(function() {
            if (modalVideo) {
                const modalSource = modalVideo.querySelector('source');
                if (modalSource) {
                    modalSource.setAttribute('src', '');
                    modalVideo.load();
                }
            }
        }, 300);
    }
    
    // تشغيل الفيديو عند تمرير المؤشر فوقه
    const videoElements = document.querySelectorAll('.design-frame video');
    videoElements.forEach(function(video) {
        const container = video.closest('.design-frame');
        
        container.addEventListener('mouseenter', function() {
            if (video && video.paused) {
                video.muted = true;
                video.play().catch(function(err) {
                    // التعامل مع حالات حظر التشغيل التلقائي من قبل المتصفح
                    console.log('تم منع التشغيل التلقائي للفيديو');
                });
            }
        });
        
        container.addEventListener('mouseleave', function() {
            if (video && !video.paused) {
                video.pause();
                video.currentTime = 0;
            }
        });
    });
}

// دالة تهيئة أزرار الإعجاب
function initLikeButtons() {
    const likeButtons = document.querySelectorAll('.like-btn');
    
    likeButtons.forEach(function(button) {
        button.addEventListener('click', function(e) {
            e.stopPropagation(); // منع انتشار الحدث للعناصر الأب
            
            this.classList.toggle('liked');
            const icon = this.querySelector('i');
            
            // استخراج عدد الإعجابات الحالي
            const currentText = this.textContent.trim();
            const currentCount = parseInt(currentText) || 0;
            
            if (this.classList.contains('liked')) {
                icon.classList.remove('far');
                icon.classList.add('fas');
                this.innerHTML = `<i class="fas fa-heart"></i> ${currentCount + 1}`;
            } else {
                icon.classList.remove('fas');
                icon.classList.add('far');
                this.innerHTML = `<i class="far fa-heart"></i> ${currentCount - 1}`;
            }
        });
    });
}

// دالة تهيئة أزرار الصوت
function initSoundButtons() {
    const soundButtons = document.querySelectorAll('.sound-btn');
    
    soundButtons.forEach(function(button) {
        button.addEventListener('click', function(e) {
            e.stopPropagation(); // منع انتشار الحدث للعناصر الأب
            
            const videoContainer = this.closest('.design-frame');
            const video = videoContainer.querySelector('video');
            
            if (video) {
                video.muted = !video.muted;
                
                if (video.muted) {
                    this.innerHTML = '<i class="fas fa-volume-mute"></i>';
                } else {
                    this.innerHTML = '<i class="fas fa-volume-up"></i>';
                    
                    // تشغيل الفيديو إذا كان متوقفًا
                    if (video.paused) {
                        video.play().catch(function(err) {
                            console.log('فشل تشغيل الفيديو');
                        });
                    }
                }
            }
        });
    });
}

// دالة تهيئة مربع العرض للصور
function initLightbox() {
    if (typeof lightbox !== 'undefined') {
        lightbox.option({
            'resizeDuration': 300,
            'wrapAround': true,
            'disableScrolling': true,
            'fadeDuration': 300,
            'albumLabel': 'صورة %1 من %2',
            'alwaysShowNavOnTouchDevices': true
        });
    }
}

// دالة تهيئة القائمة الرئيسية
function initMainMenu() {
    const menuToggle = document.getElementById('menuToggle');
    const nav = document.querySelector('.nav');
    const languageSwitcher = document.querySelector('.language-switcher');
    const languageBtn = document.querySelector('.language-btn');
    
    // تفعيل زر القائمة المتجاوبة
    if (menuToggle && nav) {
        menuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            nav.classList.toggle('open');
        });
    }
    
    // تفعيل قائمة اللغات
    if (languageBtn && languageSwitcher) {
        languageBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            languageSwitcher.classList.toggle('active');
        });
        
        // إغلاق قائمة اللغات عند النقر خارجها
        document.addEventListener('click', function() {
            languageSwitcher.classList.remove('active');
        });
    }
    
    // تغيير مظهر الهيدر عند التمرير
    window.addEventListener('scroll', function() {
        const header = document.getElementById('header');
        if (header) {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }
    });
}

// دالة تهيئة تأثيرات التمرير باستخدام GSAP
function initScrollEffects() {
    // تسجيل ScrollTrigger كملحق لـ GSAP
    gsap.registerPlugin(ScrollTrigger);
    
    // تأثيرات دخول بطاقات التصميم
    const designCards = document.querySelectorAll('.design-card');
    designCards.forEach(function(card, index) {
        gsap.fromTo(card, 
            { y: 50, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 0.6,
                ease: 'power2.out',
                delay: index % 4 * 0.1, // تأخير مختلف لكل بطاقة
                scrollTrigger: {
                    trigger: card,
                    start: 'top bottom-=100',
                    toggleActions: 'play none none none'
                }
            }
        );
    });
    
    // تأثيرات دخول عناوين الأقسام
    const sectionHeaders = document.querySelectorAll('.section-header');
    sectionHeaders.forEach(function(header) {
        const title = header.querySelector('.section-title');
        const subtitle = header.querySelector('.section-subtitle');
        
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: header,
                start: 'top bottom-=100',
                toggleActions: 'play none none none'
            }
        });
        
        tl.fromTo(title, 
            { y: 30, opacity: 0 }, 
            { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out' }
        );
        
        if (subtitle) {
            tl.fromTo(subtitle, 
                { y: 20, opacity: 0 }, 
                { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out' }, 
                '-=0.3'
            );
        }
    });
    
    // تأثير للقائمة التصنيفية
    const categoryItems = document.querySelectorAll('.gallery-categories li');
    gsap.fromTo(categoryItems, 
        { y: -20, opacity: 0 },
        {
            y: 0,
            opacity: 1,
            stagger: 0.1,
            duration: 0.5,
            ease: 'power1.out'
        }
    );
    
    // تأثير قسم البطل (Hero)
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        const heroTitle = heroContent.querySelector('.hero-title');
        const heroText = heroContent.querySelector('.hero-text');
        const heroActions = heroContent.querySelector('.hero-actions');
        
        const heroTl = gsap.timeline();
        
        if (heroTitle) {
            heroTl.fromTo(heroTitle, 
                { y: 30, opacity: 0 }, 
                { y: 0, opacity: 1, duration: 0.7, ease: 'power2.out' }
            );
        }
        
        if (heroText) {
            heroTl.fromTo(heroText, 
                { y: 30, opacity: 0 }, 
                { y: 0, opacity: 1, duration: 0.7, ease: 'power2.out' }, 
                '-=0.4'
            );
        }
        
        if (heroActions) {
            heroTl.fromTo(heroActions, 
                { y: 30, opacity: 0 }, 
                { y: 0, opacity: 1, duration: 0.7, ease: 'power2.out' }, 
                '-=0.4'
            );
        }
    }
}