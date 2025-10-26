// ===== MODERN PORTFOLIO JAVASCRIPT =====

// DOM Elements
const navbar = document.querySelector('.navbar');
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');
const themeToggle = document.getElementById('theme-toggle');
const particlesContainer = document.getElementById('particles');
const typingElement = document.getElementById('typing');
const projectsGrid = document.getElementById('projects-grid');
const contactForm = document.getElementById('contactForm');
const scrollIndicator = document.querySelector('.scroll-indicator');

// ===== UTILITY FUNCTIONS =====
const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

const throttle = (func, limit) => {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

// ===== NAVBAR FUNCTIONALITY =====
class Navbar {
  constructor() {
    this.init();
  }

  init() {
    this.handleScroll();
    this.handleMobileMenu();
    this.handleThemeToggle();
    this.handleSmoothScrolling();
    this.updateActiveLink();
  }

  handleScroll() {
    const handleScroll = throttle(() => {
      if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }, 100);

    window.addEventListener('scroll', handleScroll);
  }

  handleMobileMenu() {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      hamburger.classList.toggle('active');
      document.body.classList.toggle('menu-open');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
        document.body.classList.remove('menu-open');
      });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!navbar.contains(e.target) && navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
        document.body.classList.remove('menu-open');
      }
    });
  }

  handleThemeToggle() {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.body.classList.toggle('light', savedTheme === 'light');
    this.updateThemeIcon(savedTheme);

    themeToggle.addEventListener('click', () => {
      document.body.classList.toggle('light');
      const isLight = document.body.classList.contains('light');
      localStorage.setItem('theme', isLight ? 'light' : 'dark');
      this.updateThemeIcon(isLight ? 'light' : 'dark');
    });
  }

  updateThemeIcon(theme) {
    const icon = themeToggle.querySelector('i');
    icon.className = theme === 'light' ? 'fas fa-sun' : 'fas fa-moon';
  }

  handleSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(anchor.getAttribute('href'));
        if (target) {
          const offsetTop = target.offsetTop - 80;
          window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
          });
        }
      });
    });
  }

  updateActiveLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    const handleScroll = throttle(() => {
      let current = '';
      sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
          current = section.getAttribute('id');
        }
      });

      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
          link.classList.add('active');
        }
      });
    }, 100);

    window.addEventListener('scroll', handleScroll);
  }
}

// ===== TYPING ANIMATION =====
class TypingAnimation {
  constructor() {
    this.texts = [
      'Java Developer',
      'Full-Stack Developer',
      'Spring Boot Expert',
      'Problem Solver',
      'Tech Enthusiast'
    ];
    this.currentTextIndex = 0;
    this.currentCharIndex = 0;
    this.isDeleting = false;
    this.speed = 100;
    this.deleteSpeed = 50;
    this.pauseTime = 2000;
    this.init();
  }

  init() {
    this.type();
  }

  type() {
    const currentText = this.texts[this.currentTextIndex];
    
    if (this.isDeleting) {
      typingElement.textContent = currentText.substring(0, this.currentCharIndex - 1);
      this.currentCharIndex--;
  } else {
      typingElement.textContent = currentText.substring(0, this.currentCharIndex + 1);
      this.currentCharIndex++;
    }

    let typeSpeed = this.isDeleting ? this.deleteSpeed : this.speed;

    if (!this.isDeleting && this.currentCharIndex === currentText.length) {
      typeSpeed = this.pauseTime;
      this.isDeleting = true;
    } else if (this.isDeleting && this.currentCharIndex === 0) {
      this.isDeleting = false;
      this.currentTextIndex = (this.currentTextIndex + 1) % this.texts.length;
      typeSpeed = 500;
    }

    setTimeout(() => this.type(), typeSpeed);
  }
}

// ===== PARTICLE SYSTEM =====
class ParticleSystem {
  constructor() {
    this.particles = [];
    this.particleCount = 30; // subtle, professional density
    this.init();
  }

  init() {
    this.createParticles();
    this.animate();
  }

  createParticles() {
    for (let i = 0; i < this.particleCount; i++) {
      this.createParticle();
    }
  }

  createParticle() {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';
    particle.style.animationDelay = (Math.random() * 4).toFixed(2) + 's';
    particle.style.animationDuration = (8 + Math.random() * 8).toFixed(2) + 's';

    // randomize size and tint for a soft bokeh effect
    const size = 3 + Math.random() * 7;
    particle.style.width = size + 'px';
    particle.style.height = size + 'px';
    const tints = [
      'rgba(148,163,184,0.5)', // slate
      'rgba(203,213,225,0.5)', // light slate
      'rgba(99,102,241,0.45)', // indigo
      'rgba(59,130,246,0.45)'  // blue
    ];
    particle.style.background = tints[Math.floor(Math.random() * tints.length)];
    particle.style.boxShadow = `0 0 ${8 + Math.random()*14}px rgba(148,163,184,0.35)`;
    particlesContainer.appendChild(particle);
    this.particles.push(particle);
  }

  animate() {
    this.particles.forEach((particle, index) => {
      if (Math.random() < 0.01) {
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
      }
    });
    requestAnimationFrame(() => this.animate());
  }
}

// ===== PROJECTS SYSTEM =====
class ProjectsSystem {
  constructor() {
    this.projects = [
      {
        title: 'Flash Learn - Smart Practice Platform',
        description: 'Developed a full-stack web app for student exam prep. Built RESTful APIs and database schema, integrated front-end (React) and back-end services (Spring Boot). Features include coding/aptitude quizzes and flashcard review. Achieved a responsive UI and streamlined learning workflow.',
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=200&fit=crop',
        technologies: ['Java', 'Spring Boot', 'React', 'MySQL'],
        category: 'web',
        github: 'https://github.com/Mounicapolisetty',
        live: '#'
      },
      {
        title: 'Full-Stack E-commerce Application',
        description: 'Implemented product catalog, shopping cart, checkout flows and an admin panel with role-based views; integrated sandbox payment flow and server-side order validation, added backend product search and filtering, and created seed scripts plus integration tests to validate key user journeys.',
        image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=200&fit=crop',
        technologies: ['Java', 'Spring Boot', 'React', 'MySQL'],
        category: 'web',
        github: 'https://github.com/Mounicapolisetty',
        live: '#'
      },
      {
        title: 'Weather App Dashboard',
        description: 'Built an interactive weather dashboard using a real-time API to show forecasts and location-based data; added robust error handling and a lightweight local Storage cache to reduce repeated API calls and improve perceived performance.',
        image: 'https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=400&h=200&fit=crop',
        technologies: ['JavaScript', 'HTML', 'CSS', 'OpenWeatherMap API'],
        category: 'web',
        github: 'https://github.com/Mounicapolisetty',
        live: '#'
      }
    ];
    this.currentFilter = 'all';
    this.init();
  }

  init() {
    this.renderProjects();
    this.handleFilter();
    this.observeProjects();
  }

  renderProjects() {
    const filteredProjects = this.currentFilter === 'all' 
      ? this.projects 
      : this.projects.filter(project => project.category === this.currentFilter);

    projectsGrid.innerHTML = '';

    filteredProjects.forEach((project, index) => {
      const projectCard = this.createProjectCard(project, index);
      projectsGrid.appendChild(projectCard);
    });
  }

  createProjectCard(project, index) {
  const card = document.createElement('div');
    card.className = 'project-card';
    card.style.animationDelay = `${index * 0.1}s`;
    
    card.innerHTML = `
      <div class="project-image">
        <img src="${project.image}" alt="${project.title}" loading="lazy">
        <div class="project-overlay">
          <a href="${project.github}" target="_blank" aria-label="View on GitHub">
            <i class="fab fa-github"></i>
          </a>
          <a href="${project.live}" target="_blank" aria-label="View Live Demo">
            <i class="fas fa-external-link-alt"></i>
          </a>
        </div>
      </div>
      <div class="project-content">
        <h3 class="project-title">${project.title}</h3>
        <p class="project-description">${project.description}</p>
        <div class="project-tech">
          ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
        </div>
        <div class="project-links">
          <a href="${project.github}" target="_blank">
            <i class="fab fa-github"></i>
            <span>Code</span>
          </a>
          <a href="${project.live}" target="_blank">
            <i class="fas fa-external-link-alt"></i>
            <span>Live</span>
          </a>
        </div>
    </div>
  `;

    return card;
  }

  handleFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
      button.addEventListener('click', () => {
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        this.currentFilter = button.dataset.filter;
        this.renderProjects();
      });
    });
  }

  observeProjects() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in-up');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.project-card').forEach(card => {
      observer.observe(card);
    });
  }
}

// ===== SKILLS ANIMATION =====
class SkillsAnimation {
  constructor() {
    this.init();
  }

  init() {
    this.observeSkills();
  }

  observeSkills() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.animateSkillBars(entry.target);
        }
      });
    }, { threshold: 0.5 });

    document.querySelectorAll('.level-fill').forEach(skill => {
      observer.observe(skill);
    });
  }

  animateSkillBars(container) {
    const skillBars = container.querySelectorAll('.level-fill');
    
    skillBars.forEach((bar, index) => {
      setTimeout(() => {
        const level = bar.dataset.level;
        bar.style.width = level + '%';
      }, index * 200);
    });
  }
}

// ===== STATS COUNTER =====
class StatsCounter {
  constructor() {
    this.init();
  }

  init() {
    this.observeStats();
  }

  observeStats() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.animateCounter(entry.target);
        }
      });
    }, { threshold: 0.5 });

    document.querySelectorAll('.stat-number').forEach(stat => {
      observer.observe(stat);
    });
  }

  animateCounter(element) {
    const target = parseInt(element.dataset.target);
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      element.textContent = Math.floor(current);
    }, 16);
  }
}

// ===== CONTACT FORM =====
class ContactForm {
  constructor() {
    this.init();
  }

  init() {
    this.handleSubmit();
    this.addFormAnimations();
  }

  handleSubmit() {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const formData = new FormData(contactForm);
      const data = Object.fromEntries(formData);

      // Show loading state
      this.showLoading();

      // EmailJS configuration (replace with your actual IDs)
      const serviceID = 'YOUR_SERVICE_ID';
      const templateID = 'YOUR_TEMPLATE_ID';
      const publicKeyFromInit = (typeof emailjs !== 'undefined' && emailjs.__publicKey) || null;

      // Basic config validation to avoid silent failures
      if (typeof emailjs === 'undefined') {
        this.showError('Email service not loaded. Check internet or EmailJS script.');
        return;
      }
      if (serviceID.startsWith('YOUR_') || templateID.startsWith('YOUR_')) {
        this.showError('Email not configured. Set Service ID and Template ID.');
        return;
      }

      // Prepare template parameters
      const templateParams = {
        from_name: data.name,
        from_email: data.email,
        subject: data.subject,
        message: data.message,
        to_email: 'polisettymounica@gmail.com'
      };

      // Send email using EmailJS v4
      emailjs.send(serviceID, templateID, templateParams)
        .then((response) => {
          console.log('Email sent successfully:', response);
          this.showSuccess();
          contactForm.reset();
        })
        .catch((error) => {
          console.error('Email sending failed:', error);
          const message = (error && (error.text || error.message)) ? String(error.text || error.message) : 'Unknown error';
          this.showError('Send failed: ' + message);
        });
    });
  }

  showLoading() {
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;
    
    setTimeout(() => {
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
    }, 2000);
  }

  showSuccess() {
    const notification = document.createElement('div');
    notification.className = 'notification success';
    notification.innerHTML = `
      <i class="fas fa-check-circle"></i>
      <span>Message sent successfully!</span>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.classList.add('show');
    }, 100);
    
    setTimeout(() => {
      notification.classList.remove('show');
      setTimeout(() => {
        document.body.removeChild(notification);
      }, 300);
    }, 3000);
  }

  showError(msg) {
    const notification = document.createElement('div');
    notification.className = 'notification error';
    notification.innerHTML = `
      <i class="fas fa-exclamation-circle"></i>
      <span>${msg || 'Failed to send message. Please try again.'}</span>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.classList.add('show');
    }, 100);
    
    setTimeout(() => {
      notification.classList.remove('show');
      setTimeout(() => {
        document.body.removeChild(notification);
      }, 300);
    }, 3000);
  }

  addFormAnimations() {
    const inputs = contactForm.querySelectorAll('input, textarea');
    
    inputs.forEach(input => {
      input.addEventListener('focus', () => {
        input.parentElement.classList.add('focused');
      });
      
      input.addEventListener('blur', () => {
        if (!input.value) {
          input.parentElement.classList.remove('focused');
        }
      });
    });
  }
}

// ===== SCROLL ANIMATIONS =====
class ScrollAnimations {
  constructor() {
    this.init();
  }

  init() {
    this.observeElements();
    this.handleScrollIndicator();
  }

  observeElements() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if (entry.target.classList.contains('slide-init')) {
            entry.target.classList.remove('slide-init');
            entry.target.classList.add('slide-in');
          } else {
            entry.target.classList.add('fade-in-up');
          }
          // unobserve so it stays visible and doesn't toggle back
          observer.unobserve(entry.target);
        }
      });
    }, { 
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    // add slideshow reveal to all section titles (once)
    document.querySelectorAll('.section-header h2.section-title').forEach((title, idx) => {
      title.classList.add('slide-init');
      title.style.setProperty('--reveal-delay', `${idx * 120}ms`);
      observer.observe(title);
    });

    document.querySelectorAll('.section-header, .about-card, .contact-card').forEach(el => {
      observer.observe(el);
    });
  }

  handleScrollIndicator() {
    if (scrollIndicator) {
      scrollIndicator.addEventListener('click', () => {
        const aboutSection = document.getElementById('about');
        aboutSection.scrollIntoView({ behavior: 'smooth' });
      });

      // Hide scroll indicator when scrolled
      window.addEventListener('scroll', throttle(() => {
        if (window.scrollY > 100) {
          scrollIndicator.style.opacity = '0';
        } else {
          scrollIndicator.style.opacity = '1';
        }
      }, 100));
    }
  }
}

// ===== NOTIFICATION SYSTEM =====
class NotificationSystem {
  constructor() {
    this.createStyles();
  }

  createStyles() {
    const style = document.createElement('style');
    style.textContent = `
      .notification {
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--bg-secondary);
        color: var(--text-primary);
        padding: 1rem 1.5rem;
        border-radius: var(--radius-lg);
        border: 1px solid rgba(255, 255, 255, 0.1);
        box-shadow: var(--shadow-xl);
        display: flex;
        align-items: center;
        gap: 0.5rem;
        transform: translateX(400px);
        transition: transform 0.3s ease-in-out;
        z-index: 10000;
      }
      
      .notification.show {
        transform: translateX(0);
      }
      
      .notification.success {
        border-left: 4px solid var(--success);
      }
      
      .notification.error {
        border-left: 4px solid #ef4444;
      }
      
      .notification.error {
        border-left: 4px solid var(--error);
      }
      
      .notification i {
        font-size: 1.25rem;
      }
      
      .notification.success i {
        color: var(--success);
      }
      
      .notification.error i {
        color: var(--error);
      }
    `;
    document.head.appendChild(style);
  }
}

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', () => {
  // Update year
  document.getElementById('year').textContent = new Date().getFullYear();
  
  // Initialize all systems
  new Navbar();
  new TypingAnimation();
  new ParticleSystem();
  new ProjectsSystem();
  new SkillsAnimation();
  new StatsCounter();
  new ContactForm();
  new ScrollAnimations();
  new NotificationSystem();
  
  // Add loading animation
  document.body.classList.add('loaded');
});

// ===== PERFORMANCE OPTIMIZATIONS =====
// Lazy loading for images
if ('IntersectionObserver' in window) {
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.remove('lazy');
        imageObserver.unobserve(img);
      }
    });
  });

  document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
  });
}

// Preload critical resources
const preloadLinks = [
  'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css'
];

preloadLinks.forEach(href => {
  const link = document.createElement('link');
  link.rel = 'preload';
  link.as = 'style';
  link.href = href;
  document.head.appendChild(link);
});

// Service Worker registration (for PWA features)
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(registration => {
        console.log('SW registered: ', registration);
      })
      .catch(registrationError => {
        console.log('SW registration failed: ', registrationError);
      });
  });
}

// ===== ERROR HANDLING =====
window.addEventListener('error', (e) => {
  console.error('JavaScript error:', e.error);
});

window.addEventListener('unhandledrejection', (e) => {
  console.error('Unhandled promise rejection:', e.reason);
});

// ===== ACCESSIBILITY ENHANCEMENTS =====
// Keyboard navigation
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    // Close mobile menu
    navLinks.classList.remove('active');
    hamburger.classList.remove('active');
    document.body.classList.remove('menu-open');
  }
});

// Focus management
document.addEventListener('keydown', (e) => {
  if (e.key === 'Tab') {
    document.body.classList.add('keyboard-navigation');
  }
});

document.addEventListener('mousedown', () => {
  document.body.classList.remove('keyboard-navigation');
});

// ===== ANALYTICS (Placeholder) =====
class Analytics {
  static track(event, data = {}) {
    console.log('Analytics event:', event, data);
    // Implement your analytics tracking here
  }
}

// Track page views
Analytics.track('page_view', {
  page: window.location.pathname,
  timestamp: new Date().toISOString()
});

// Track interactions
document.addEventListener('click', (e) => {
  if (e.target.matches('a[href^="#"]')) {
    Analytics.track('internal_link_click', {
      target: e.target.getAttribute('href')
    });
  }
  
  if (e.target.matches('.btn')) {
    Analytics.track('button_click', {
      text: e.target.textContent.trim()
    });
  }
});
