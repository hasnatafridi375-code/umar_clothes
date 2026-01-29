document.addEventListener('DOMContentLoaded', () => {
    // Initialize GSAP
    gsap.registerPlugin(ScrollTrigger);

    // Hero Animations
    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

    tl.to(".hero-content h1", {
        opacity: 1,
        y: 0,
        duration: 1.5,
        delay: 0.5
    })
        .to(".hero-content p", {
            opacity: 1,
            y: 0,
            duration: 1.2
        }, "-=1")
        .to(".hero-content .btn", {
            opacity: 1,
            y: 0,
            duration: 1
        }, "-=0.8");

    // Scroll Animations for Sections
    gsap.utils.toArray(".fade-in").forEach((section) => {
        gsap.to(section, {
            scrollTrigger: {
                trigger: section,
                start: "top 85%",
                toggleActions: "play none none none"
            },
            opacity: 1,
            y: 0,
            duration: 1,
            stagger: 0.2
        });
    });

    // Product cards are automatically handled by the .fade-in logic above.

    // Product Filtering Logic
    const filterItems = document.querySelectorAll('.filter-item');
    const productCards = document.querySelectorAll('.product-card');

    if (filterItems.length > 0) {
        filterItems.forEach(item => {
            item.addEventListener('click', () => {
                // Remove active class from all items
                filterItems.forEach(i => i.classList.remove('active'));
                // Add active class to clicked item
                item.classList.add('active');

                const filterValue = item.getAttribute('data-filter');

                productCards.forEach(card => {
                    const category = card.getAttribute('data-category');

                    if (filterValue === 'all' || filterValue === category) {
                        card.style.display = 'block';
                        gsap.fromTo(card, { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.4 });
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }

    // Logo Animation on Hover (Subtle scale)
    const logo = document.querySelector(".logo");
    if (logo) {
        logo.addEventListener("mouseenter", () => {
            gsap.to(".logo svg", { scale: 1.2, duration: 0.3, ease: "back.out(2)" });
        });
        logo.addEventListener("mouseleave", () => {
            gsap.to(".logo svg", { scale: 1, duration: 0.3 });
        });
    }
    // Parallax Hero Background
    gsap.to('.hero-bg img', {
        scrollTrigger: {
            trigger: '.hero',
            start: 'top top',
            end: 'bottom top',
            scrub: true
        },
        y: '20%',
        ease: 'none'
    });
});
