// Я не думаю что я буду использовать дизайн хз.
const cursor = document.querySelector('.cursor');

let mouseX = 0;
let mouseY = 0;
let cursorX = 0;
let cursorY = 0;


function animateCursor() {
    
    const dx = mouseX - cursorX;
    const dy = mouseY - cursorY;

    
    cursorX += dx * 0.2; 
    cursorY += dy * 0.2;

    
    cursor.style.transform = `translate(${cursorX}px, ${cursorY}px)`;

    requestAnimationFrame(animateCursor);
}


animateCursor();


document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

const cursorElements = document.querySelectorAll('a, button, .btn, .feature-card');
cursorElements.forEach(element => {
    element.addEventListener('mouseenter', () => {
        cursor.style.transform = `translate(${cursorX}px, ${cursorY}px) scale(1.5)`;
    });

    element.addEventListener('mouseleave', () => {
        cursor.style.transform = `translate(${cursorX}px, ${cursorY}px) scale(1)`;
    });
});

document.addEventListener('mouseleave', () => {
    cursor.style.opacity = '0';
});

document.addEventListener('mouseenter', () => {
    cursor.style.opacity = '1';
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

const nav = document.querySelector('.nav');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll <= 0) {
        nav.classList.remove('scroll-up');
        return;
    }

    if (currentScroll > lastScroll && !nav.classList.contains('scroll-down')) {
        nav.classList.remove('scroll-up');
        nav.classList.add('scroll-down');
    } else if (currentScroll < lastScroll && nav.classList.contains('scroll-down')) {
        nav.classList.remove('scroll-down');
        nav.classList.add('scroll-up');
    }
    lastScroll = currentScroll;
});

document.addEventListener('mousemove', (e) => {
    const hero = document.querySelector('.hero');
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;

    hero.style.backgroundPosition = `${mouseX * 50}% ${mouseY * 50}%`;


    document.querySelectorAll('.floating-block').forEach((block, index) => {
        const speed = (index + 1) * 0.1;
        const x = (mouseX - 0.5) * speed * 100;
        const y = (mouseY - 0.5) * speed * 100;
        block.style.transform = `translate(${x}px, ${y}px)`;
    });
});

const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.feature-card, .section-header').forEach(element => {
    observer.observe(element);
});

function createParticle() {
    const particle = document.createElement('div');
    particle.className = 'particle';

    const size = Math.random() * 5 + 2;
    const posX = Math.random() * window.innerWidth;
    const posY = Math.random() * window.innerHeight;

    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.left = `${posX}px`;
    particle.style.top = `${posY}px`;

    document.querySelector('.hero').appendChild(particle);

    setTimeout(() => {
        particle.remove();
    }, 5000);
}

setInterval(createParticle, 200);

const style = document.createElement('style');
style.textContent = `
    .particle {
        position: absolute;
        background: var(--primary);
        border-radius: 50%;
        pointer-events: none;
        opacity: 0.5;
        animation: float 5s linear infinite;
    }
    
    @keyframes float {
        0% {
            transform: translateY(0) rotate(0deg);
            opacity: 0.5;
        }
        100% {
            transform: translateY(-100px) rotate(360deg);
            opacity: 0;
        }
    }
    
    .fade-in {
        animation: fadeIn 1s ease forwards;
    }
    
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .nav.scroll-down {
        transform: translateY(-100%);
    }
    
    .nav.scroll-up {
        transform: translateY(0);
    }
`;

document.head.appendChild(style);

document.querySelectorAll('.feature-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px)';
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
    });
});