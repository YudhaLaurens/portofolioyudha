// Initialize Lucide Icons
lucide.createIcons();

// Smooth scrolling for anchor links
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

// Scroll Reveal Animations
const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      // Optional: unobserve if you only want the animation to play once
      observer.unobserve(entry.target);
    }
  });
}, {
  root: null,
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px"
});

revealElements.forEach(el => revealObserver.observe(el));

// Make hero section elements visible on page load
window.addEventListener('load', () => {
  document.querySelectorAll('.hero-section .reveal, .hero-section .reveal-left, .hero-section .reveal-right').forEach(el => {
    el.classList.add('visible');
  });
});

// ===== CUSTOM CURSOR =====
if (window.matchMedia("(pointer: fine)").matches) {
  const cursorDot = document.createElement('div');
  cursorDot.className = 'cursor-dot';
  const cursorOutline = document.createElement('div');
  cursorOutline.className = 'cursor-outline';
  document.body.appendChild(cursorDot);
  document.body.appendChild(cursorOutline);

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let outlineX = mouseX;
  let outlineY = mouseY;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    // Dot follows instantly
    cursorDot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
  });

  // Outline follows with a smooth delay
  function animateCursor() {
    let distX = mouseX - outlineX;
    let distY = mouseY - outlineY;
    
    outlineX += distX * 0.15;
    outlineY += distY * 0.15;
    
    cursorOutline.style.transform = `translate3d(${outlineX}px, ${outlineY}px, 0) translate(-50%, -50%)`;
    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  // Hover effect on clickable elements
  const interactables = document.querySelectorAll('a, button, input, textarea, .card');
  interactables.forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursorOutline.classList.add('hover');
    });
    el.addEventListener('mouseleave', () => {
      cursorOutline.classList.remove('hover');
    });
  });
}

