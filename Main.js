// ==================== SCROLL TO TOP BUTTON ====================
const scrollToTopBtn = document.getElementById('scrollToTop');

// Mostrar/ocultar botón al hacer scroll
window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 300) {
        scrollToTopBtn.classList.add('show');
    } else {
        scrollToTopBtn.classList.remove('show');
    }
});

// Hacer scroll al top al hacer click
scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ==================== THEME TOGGLE ====================
const themeToggleBtn = document.getElementById('themeToggleBtn');
const htmlElement = document.documentElement;

// Cargar tema guardado o usar tema preferido del sistema
const loadTheme = () => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const theme = savedTheme || (prefersDark ? 'dark' : 'light');
    
    setTheme(theme);
};

// Establecer tema
const setTheme = (theme) => {
    if (theme === 'dark') {
        htmlElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
        updateThemeIcon('light');
    } else {
        htmlElement.removeAttribute('data-theme');
        localStorage.setItem('theme', 'light');
        updateThemeIcon('dark');
    }
};

// Actualizar icono del botón
const updateThemeIcon = (nextTheme) => {
    if (nextTheme === 'light') {
        themeToggleBtn.innerHTML = '<i class="bi bi-sun-fill"></i>';
        themeToggleBtn.title = 'Cambiar a tema claro';
    } else {
        themeToggleBtn.innerHTML = '<i class="bi bi-moon-fill"></i>';
        themeToggleBtn.title = 'Cambiar a tema oscuro';
    }
};

// Toggle tema al hacer click
themeToggleBtn.addEventListener('click', () => {
    const currentTheme = htmlElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
});

// Cargar tema al iniciar
loadTheme();

// Detectar cambios en preferencias del sistema
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    const newTheme = e.matches ? 'dark' : 'light';
    setTheme(newTheme);
});

// ==================== MOBILE MENU TOGGLE ====================
const hamburgerBtn = document.getElementById('hamburgerBtn');
const closeBtn = document.getElementById('closeBtn');
const mobileMenu = document.getElementById('mobileMenu');
const menuBackdrop = document.getElementById('menuBackdrop');
const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

// Abrir menú
hamburgerBtn.addEventListener('click', () => {
    mobileMenu.classList.add('active');
    menuBackdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
});

// Cerrar menú
const closeMenu = () => {
    mobileMenu.classList.remove('active');
    menuBackdrop.classList.remove('active');
    document.body.style.overflow = 'auto';
};

closeBtn.addEventListener('click', closeMenu);

// Cerrar menú al hacer click en el backdrop
menuBackdrop.addEventListener('click', closeMenu);

// Cerrar menú al hacer click en un link
mobileNavLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
});

// ==================== SMOOTH SCROLLING ====================
// Smooth scrolling mejorado
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
        const offsetTop = target.offsetTop - 10;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Efecto de navbar al hacer scroll
const navbar = document.querySelector('.navbar');
let lastScrollTop = 0;

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 50) {
        navbar.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.08)';
    }
    
    lastScrollTop = scrollTop;
});

// Animación de entrada para elementos hero
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observar elementos hero
document.querySelectorAll('.hero-title, .hero-subtitle, .hero-buttons, .trust-badge').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Event listeners para botones
document.querySelectorAll('.btn-primary').forEach(btn => {
    btn.addEventListener('click', () => {
        console.log('Navigating to registration...');
        // Aquí puedes agregar la lógica de registro
    });
});

document.querySelectorAll('.btn-secondary').forEach(btn => {
    btn.addEventListener('click', () => {
        console.log('Viewing programs...');
        // Aquí puedes agregar la lógica para ver programas
    });
});

// ==================== CTA BANNER PARALLAX ====================
const ctaBanner = document.querySelector('.cta-banner');

// Efecto parallax mejorado al hacer scroll
window.addEventListener('scroll', () => {
    if (!ctaBanner) return;
    
    const scrollPosition = window.pageYOffset;
    const bannerTop = ctaBanner.offsetTop;
    const bannerHeight = ctaBanner.offsetHeight;
    const windowHeight = window.innerHeight;
    
    // Solo aplicar parallax cuando el banner es visible
    if (scrollPosition + windowHeight > bannerTop && scrollPosition < bannerTop + bannerHeight) {
        const yPos = (scrollPosition - bannerTop) * 0.1;
        ctaBanner.style.backgroundPosition = `center calc(50% + ${yPos}px)`;
    }
});

// ==================== FAQ ACCORDION ====================
const faqQuestions = document.querySelectorAll('.faq-question');

faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
        const faqItem = question.parentElement;
        const isActive = faqItem.classList.contains('active');
        
        // Cerrar todos los demás items
        document.querySelectorAll('.faq-item').forEach(item => {
            if (item !== faqItem) {
                item.classList.remove('active');
            }
        });
        
        // Alternar el estado del item actual
        faqItem.classList.toggle('active');
    });
});

// ==================== CONTACT FORM ====================
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value
        };
        
        // Validación básica
        if (!formData.name || !formData.email || !formData.subject || !formData.message) {
            showFormMessage('Por favor completa todos los campos requeridos.', 'error');
            return;
        }
        
        // Validar email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            showFormMessage('Por favor ingresa un email válido.', 'error');
            return;
        }
        
        try {
            // Simular envío de formulario
            // En producción, aquí harías una llamada a tu servidor
            console.log('Datos del formulario:', formData);
            
            // Mostrar mensaje de éxito
            showFormMessage('¡Gracias por tu mensaje! Nos pondremos en contacto pronto.', 'success');
            
            // Limpiar formulario
            contactForm.reset();
            
            // Ocultar mensaje después de 5 segundos
            setTimeout(() => {
                formMessage.classList.remove('success', 'error');
                formMessage.textContent = '';
            }, 5000);
        } catch (error) {
            showFormMessage('Hubo un error. Por favor intenta de nuevo.', 'error');
        }
    });
}

function showFormMessage(message, type) {
    formMessage.textContent = message;
    formMessage.classList.remove('success', 'error');
    formMessage.classList.add(type);
}
