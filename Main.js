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
const themeToggleBtnMobile = document.getElementById('themeToggleBtnMobile');
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
    const iconHTML = nextTheme === 'light' 
        ? '<i class="bi bi-sun-fill"></i>' 
        : '<i class="bi bi-moon-fill"></i>';
    const title = nextTheme === 'light' 
        ? 'Cambiar a tema claro' 
        : 'Cambiar a tema oscuro';
    
    if (themeToggleBtn) {
        themeToggleBtn.innerHTML = iconHTML;
        themeToggleBtn.title = title;
    }
    
    if (themeToggleBtnMobile) {
        themeToggleBtnMobile.innerHTML = iconHTML;
        themeToggleBtnMobile.title = title;
    }
};

// Crear overlay de transición con animación
const createThemeTransitionOverlay = () => {
    const overlay = document.createElement('div');
    overlay.className = 'theme-transition-overlay';
    
    const powerlabText = document.createElement('div');
    powerlabText.className = 'powerlab-text';
    powerlabText.textContent = 'PowerLab';
    
    overlay.appendChild(powerlabText);
    document.body.appendChild(overlay);
    
    return overlay;
};

// Toggle tema con animación
const toggleTheme = () => {
    const currentTheme = htmlElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    // Agregar clase para ocultar scroll
    document.body.classList.add('theme-transition-active');
    
    // Crear overlay
    const overlay = createThemeTransitionOverlay();
    
    // Esperar a que termine la animación de fade-in (0.6s) + el texto de PowerLab (1.2s)
    setTimeout(() => {
        // Cambiar el tema
        setTheme(newTheme);
        
        // Iniciar animación de fade-out después de 0.6s (cuando termina el fade-in)
        setTimeout(() => {
            overlay.classList.add('fade-out');
            
            // Remover el overlay después de la animación de fade-out (0.6s)
            setTimeout(() => {
                overlay.remove();
                // Remover clase para mostrar scroll nuevamente
                document.body.classList.remove('theme-transition-active');
            }, 600);
        }, 600);
    }, 1200);
};

if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', toggleTheme);
}

if (themeToggleBtnMobile) {
    themeToggleBtnMobile.addEventListener('click', toggleTheme);
}

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

// ==================== ROUTINE GENERATOR QUIZ ====================
const quizForm = document.getElementById('quizForm');
const nextBtn = document.getElementById('nextBtn');
const prevBtn = document.getElementById('prevBtn');
const quizQuestions = document.querySelectorAll('.quiz-question');
const progressFill = document.getElementById('progressFill');
const quizResults = document.getElementById('quizResults');

let currentQuestion = 1;
const totalQuestions = 4;

// Deshabilitar botón al inicio
nextBtn.disabled = true;

// Nombres de los inputs de radio para cada pregunta
const radioNames = ['objetivo', 'nivel', 'dias', 'duracion'];

// Función para verificar si hay una opción seleccionada
function checkSelection() {
  const currentRadioName = radioNames[currentQuestion - 1];
  const isSelected = document.querySelector(`input[name="${currentRadioName}"]:checked`);
  nextBtn.disabled = !isSelected;
}

// Rutinas personalizadas basadas en respuestas
const routineData = {
  masa: {
    principiante: {
      3: {
        nombre: 'Full Body - Ganancia de Masa (Principiante)',
        descripcion: 'Rutina enfocada en construir una base sólida de masa muscular',
        ejercicios: [
          { dia: 'Lunes', ejercicios: 'Sentadillas, Press de banca, Filas' },
          { dia: 'Miércoles', ejercicios: 'Deadlifts, Press militar, Flexiones' },
          { dia: 'Viernes', ejercicios: 'Prensa de piernas, Press inclinado, Remo' }
        ],
        duracion: 45,
        intensidad: 'Moderada',
        descanso: '60-90 segundos entre series'
      },
      4: {
        nombre: 'Upper/Lower - Ganancia de Masa (Principiante)',
        descripcion: 'Rutina superior e inferior para máximo volumen muscular',
        ejercicios: [
          { dia: 'Lunes', ejercicios: 'Press banca, Filas, Fondos' },
          { dia: 'Martes', ejercicios: 'Sentadillas, Leg press, Extensiones' },
          { dia: 'Jueves', ejercicios: 'Press inclinado, Jalones, Remo T' },
          { dia: 'Viernes', ejercicios: 'Deadlifts, Hack squat, Curls' }
        ],
        duracion: 60,
        intensidad: 'Moderada-Alta',
        descanso: '75-90 segundos entre series'
      },
      5: {
        nombre: 'Rutina PPL - Ganancia de Masa (Principiante)',
        descripcion: 'Push/Pull/Legs para distribución óptima del volumen',
        ejercicios: [
          { dia: 'Lunes', ejercicios: 'Press banca, Press inclinado, Dips' },
          { dia: 'Martes', ejercicios: 'Filas, Jalones, Remo T' },
          { dia: 'Miércoles', ejercicios: 'Sentadillas, Leg press, Extensiones' },
          { dia: 'Jueves', ejercicios: 'Máquina Smith press, Aperturas, Tríceps' },
          { dia: 'Viernes', ejercicios: 'Deadlifts, Filas T, Jalones laterales' }
        ],
        duracion: 60,
        intensidad: 'Moderada-Alta',
        descanso: '60-90 segundos entre series'
      }
    },
    intermedio: {
      3: {
        nombre: 'Full Body Intensivo - Ganancia de Masa (Intermedio)',
        descripcion: 'Rutina compacta con alta densidad de trabajo',
        ejercicios: [
          { dia: 'Lunes', ejercicios: 'Sentadillas, Press banca, Filas pesadas' },
          { dia: 'Miércoles', ejercicios: 'Deadlifts, Press militar, Remo T' },
          { dia: 'Viernes', ejercicios: 'Prensa de piernas, Press inclinado, Jalones' }
        ],
        duracion: 60,
        intensidad: 'Alta',
        descanso: '90-120 segundos entre series'
      },
      4: {
        nombre: 'Upper/Lower - Ganancia de Masa (Intermedio)',
        descripcion: 'Enfoque especializado con mayor volumen',
        ejercicios: [
          { dia: 'Lunes', ejercicios: 'Press banca, Incline press, Fondos, Curl' },
          { dia: 'Martes', ejercicios: 'Sentadillas, Leg press, Curl de piernas' },
          { dia: 'Jueves', ejercicios: 'Deadlifts, Press inclinado, Remo T, Jalones' },
          { dia: 'Viernes', ejercicios: 'Hack squat, Leg press, Extensiones' }
        ],
        duracion: 75,
        intensidad: 'Alta',
        descanso: '90-120 segundos entre series'
      },
      5: {
        nombre: 'Rutina PPL Avanzada - Ganancia de Masa (Intermedio)',
        descripcion: 'Push/Pull/Legs con alto volumen y técnica',
        ejercicios: [
          { dia: 'Lunes', ejercicios: 'Press banca 5x5, Incline, Press mancuerna, Dips' },
          { dia: 'Martes', ejercicios: 'Deadlifts, T-Bar row, Filas, Jalones' },
          { dia: 'Miércoles', ejercicios: 'Sentadillas, Leg press, Hack squat' },
          { dia: 'Jueves', ejercicios: 'Press inclinado, Machine press, Fondos, Cables' },
          { dia: 'Viernes', ejercicios: 'Pendlay rows, Jalones, Face pulls, Curl' }
        ],
        duracion: 75,
        intensidad: 'Alta',
        descanso: '90-120 segundos entre series'
      }
    },
    avanzado: {
      4: {
        nombre: 'Upper/Lower Especializado - Ganancia de Masa (Avanzado)',
        descripcion: 'Rutina de competidor con periodización',
        ejercicios: [
          { dia: 'Lunes', ejercicios: 'Press banca 1RM, Accesorios, Trabajo de volumen' },
          { dia: 'Martes', ejercicios: 'Sentadillas, Trabajo de fuerza, Accesorios' },
          { dia: 'Jueves', ejercicios: 'Deadlifts, Técnica, Trabajo de volumen' },
          { dia: 'Viernes', ejercicios: 'Bench auxiliar, Accesorios, Volumen' }
        ],
        duracion: 90,
        intensidad: 'Muy Alta',
        descanso: '2-3 minutos entre series pesadas'
      },
      5: {
        nombre: 'Rutina Conjugada - Ganancia de Masa (Avanzado)',
        descripcion: 'Método de fuerza y resistencia combinados',
        ejercicios: [
          { dia: 'Lunes', ejercicios: 'Fuerza máxima: Sentadillas, Deadlifts' },
          { dia: 'Martes', ejercicios: 'Potencia: Limpias, Press explosivos' },
          { dia: 'Miércoles', ejercicios: 'Hipertrofia: Press banca, Filas, Accesorios' },
          { dia: 'Jueves', ejercicios: 'Fuerza: Prensa de piernas, Hack squat' },
          { dia: 'Viernes', ejercicios: 'Accesorios: Brazos, Hombros, Espalda' }
        ],
        duracion: 90,
        intensidad: 'Muy Alta',
        descanso: '2-3 minutos entre series'
      },
      6: {
        nombre: 'Rutina PPL Élite - Ganancia de Masa (Avanzado)',
        descripcion: 'Máximo volumen con periodización avanzada',
        ejercicios: [
          { dia: 'Lunes', ejercicios: 'Push intensidad: Press banca, Incline, Dips' },
          { dia: 'Martes', ejercicios: 'Pull intensidad: Deadlifts, Filas, Jalones' },
          { dia: 'Miércoles', ejercicios: 'Legs: Sentadillas, Leg press, Curls' },
          { dia: 'Jueves', ejercicios: 'Push volumen: Mancuernas, Máquinas, Cables' },
          { dia: 'Viernes', ejercicios: 'Pull volumen: T-Bar, Jalones, Pájaros' },
          { dia: 'Sábado', ejercicios: 'Legs volumen: Hack squat, Extensiones, Prensa' }
        ],
        duracion: 90,
        intensidad: 'Muy Alta',
        descanso: '90-120 segundos'
      }
    }
  },
  definicion: {
    principiante: {
      3: {
        nombre: 'Full Body Quemagrasas (Principiante)',
        descripcion: 'Rutina para perder grasa manteniendo masa muscular',
        ejercicios: [
          { dia: 'Lunes', ejercicios: 'Sentadillas, Press banca, Burpees modificados' },
          { dia: 'Miércoles', ejercicios: 'Deadlifts ligeros, Filas, Escaladores' },
          { dia: 'Viernes', ejercicios: 'Prensa de piernas, Press inclinado, Box jumps' }
        ],
        duracion: 45,
        intensidad: 'Moderada',
        descanso: '45-60 segundos entre series'
      },
      4: {
        nombre: 'HIIT + Fuerza (Principiante)',
        descripcion: 'Combinación de cardio HIIT y entrenamientos de fuerza',
        ejercicios: [
          { dia: 'Lunes', ejercicios: 'Upper: Press banca, Filas, Flexiones' },
          { dia: 'Martes', ejercicios: 'HIIT: Saltos, Burpees, Sprints' },
          { dia: 'Jueves', ejercicios: 'Lower: Sentadillas, Leg press, Estocadas' },
          { dia: 'Viernes', ejercicios: 'HIIT + Accesorios: Circuito metabólico' }
        ],
        duracion: 45,
        intensidad: 'Alta',
        descanso: '30-45 segundos'
      },
      5: {
        nombre: 'Upper/Lower Definición (Principiante)',
        descripcion: 'Enfoque específico para reducir grasa corporal',
        ejercicios: [
          { dia: 'Lunes', ejercicios: 'Upper: Press banca, Filas, Fondos' },
          { dia: 'Martes', ejercicios: 'Lower: Sentadillas, Leg press, Extensiones' },
          { dia: 'Miércoles', ejercicios: 'HIIT: Circuito de cardio' },
          { dia: 'Jueves', ejercicios: 'Upper: Press inclinado, Jalones, Remo' },
          { dia: 'Viernes', ejercicios: 'Lower: Deadlifts, Hack squat, Curls' }
        ],
        duracion: 50,
        intensidad: 'Moderada-Alta',
        descanso: '45-60 segundos'
      }
    },
    intermedio: {
      3: {
        nombre: 'Full Body Quemagrasas (Intermedio)',
        descripcion: 'Entrenamiento denso con énfasis en déficit calórico',
        ejercicios: [
          { dia: 'Lunes', ejercicios: 'Sentadillas superset, Press banca superset, HIIT' },
          { dia: 'Miércoles', ejercicios: 'Deadlifts, Filas explosivas, Circuito cardio' },
          { dia: 'Viernes', ejercicios: 'Leg press, Press inclinado, Trabajo metabólico' }
        ],
        duracion: 60,
        intensidad: 'Alta',
        descanso: '30-45 segundos'
      },
      4: {
        nombre: 'Upper/Lower Shred (Intermedio)',
        descripcion: 'Máxima quema de grasa con preservación de músculo',
        ejercicios: [
          { dia: 'Lunes', ejercicios: 'Upper A: Press banca, Filas pesadas, Fondos' },
          { dia: 'Martes', ejercicios: 'Lower A: Sentadillas, Leg press, Curls' },
          { dia: 'Jueves', ejercicios: 'Upper B: Incline press, Jalones, Remo T' },
          { dia: 'Viernes', ejercicios: 'Lower B: Deadlifts, Hack squat, Máquinas' }
        ],
        duracion: 60,
        intensidad: 'Alta',
        descanso: '45-60 segundos'
      },
      5: {
        nombre: 'HIIT + Strength (Intermedio)',
        descripcion: 'Protocolos de HIIT avanzado combinado con fuerza',
        ejercicios: [
          { dia: 'Lunes', ejercicios: 'Fuerza: Press banca, Filas, Fondos' },
          { dia: 'Martes', ejercicios: 'HIIT: Batallas, Burpees, Escaladores' },
          { dia: 'Miércoles', ejercicios: 'Fuerza: Sentadillas, Deadlifts, Estocadas' },
          { dia: 'Jueves', ejercicios: 'HIIT: Tabata, Saltos, Sprints' },
          { dia: 'Viernes', ejercicios: 'Accesorios: Brazos, Hombros, Núcleo' }
        ],
        duracion: 50,
        intensidad: 'Muy Alta',
        descanso: '20-30 segundos'
      }
    },
    avanzado: {
      4: {
        nombre: 'Upper/Lower Avanzado Shred (Avanzado)',
        descripcion: 'Protocolo competitivo de pérdida de grasa',
        ejercicios: [
          { dia: 'Lunes', ejercicios: 'Upper A: Press banca, Filas, Superseries' },
          { dia: 'Martes', ejercicios: 'Lower A: Sentadillas, Leg press, Accesorios' },
          { dia: 'Jueves', ejercicios: 'Upper B: Incline, Jalones, Trabajo pesado' },
          { dia: 'Viernes', ejercicios: 'Lower B: Deadlifts, Hack squat, Circuito' }
        ],
        duracion: 75,
        intensidad: 'Muy Alta',
        descanso: '45-60 segundos'
      },
      5: {
        nombre: 'Conjugada Shred (Avanzado)',
        descripcion: 'Periodización conjugada para máxima definición',
        ejercicios: [
          { dia: 'Lunes', ejercicios: 'Fuerza: Sentadillas, Filas pesadas' },
          { dia: 'Martes', ejercicios: 'HIIT: Protocolo tabata intenso' },
          { dia: 'Miércoles', ejercicios: 'Hipertrofia: Press, Accesorios' },
          { dia: 'Jueves', ejercicios: 'Potencia: Limpias, Snatch, Explosivos' },
          { dia: 'Viernes', ejercicios: 'Conditioning: Batalla de cuerdas, Sprints' }
        ],
        duracion: 75,
        intensidad: 'Muy Alta',
        descanso: '45-60 segundos'
      },
      6: {
        nombre: 'Doble Split Shred Elite (Avanzado)',
        descripcion: 'Entrenamiento dos veces al día para máxima definición',
        ejercicios: [
          { dia: 'Lunes', ejercicios: 'Mañana: Fuerza, Noche: HIIT' },
          { dia: 'Martes', ejercicios: 'Mañana: Hipertrofia, Noche: Cardio' },
          { dia: 'Miércoles', ejercicios: 'Mañana: Potencia, Noche: Acondicionamiento' },
          { dia: 'Jueves', ejercicios: 'Mañana: Fuerza, Noche: HIIT' },
          { dia: 'Viernes', ejercicios: 'Mañana: Hipertrofia, Noche: Cardio' },
          { dia: 'Sábado', ejercicios: 'Descanso activo o Yoga' }
        ],
        duracion: 90,
        intensidad: 'Extrema',
        descanso: '30-45 segundos'
      }
    }
  },
  resistencia: {
    principiante: {
      3: {
        nombre: 'Cardio + Fuerza Funcional (Principiante)',
        descripcion: 'Desarrollo de resistencia cardiovascular y muscular',
        ejercicios: [
          { dia: 'Lunes', ejercicios: 'Cardio ligero 20min + Sentadillas, Flexiones' },
          { dia: 'Miércoles', ejercicios: 'Circuit training: 6 ejercicios x 3 rondas' },
          { dia: 'Viernes', ejercicios: 'Cardio 25min + Burpees, Estocadas' }
        ],
        duracion: 45,
        intensidad: 'Moderada',
        descanso: '30-45 segundos'
      },
      4: {
        nombre: 'Entrenamiento por Zonas (Principiante)',
        descripcion: 'Periodización de resistencia en múltiples zonas cardiacas',
        ejercicios: [
          { dia: 'Lunes', ejercicios: 'Zona 2: 30min cardio moderado' },
          { dia: 'Martes', ejercicios: 'Fuerza funcional: Kettlebells, TRX' },
          { dia: 'Jueves', ejercicios: 'Zona 3-4: 25min con intervalos' },
          { dia: 'Sábado', ejercicios: 'Zona 2: 45min cardio largo' }
        ],
        duracion: 45,
        intensidad: 'Moderada-Alta',
        descanso: '30 segundos'
      },
      5: {
        nombre: 'Resistencia Estructurada (Principiante)',
        descripcion: 'Construcción gradual de capacidad aeróbica',
        ejercicios: [
          { dia: 'Lunes', ejercicios: 'Zona 2: 30min, Accesorios' },
          { dia: 'Martes', ejercicios: 'Funcional: Fondos, Sentadillas, Remo' },
          { dia: 'Miércoles', ejercicios: 'Zona 3: 25min intervalos' },
          { dia: 'Jueves', ejercicios: 'Fuerza: Deadlifts, Press, Filas' },
          { dia: 'Sábado', ejercicios: 'Zona 2: 45min largo y lento' }
        ],
        duracion: 45,
        intensidad: 'Moderada',
        descanso: '20-30 segundos'
      }
    },
    intermedio: {
      3: {
        nombre: 'Entrenamiento Cruzado (Intermedio)',
        descripcion: 'Combinación de múltiples modalidades de resistencia',
        ejercicios: [
          { dia: 'Lunes', ejercicios: 'Correr: 5k a ritmo moderado' },
          { dia: 'Miércoles', ejercicios: 'Ciclismo: 40min + Funcional' },
          { dia: 'Viernes', ejercicios: 'HIIT: 20min + Accesorios' }
        ],
        duracion: 60,
        intensidad: 'Alta',
        descanso: '20-30 segundos'
      },
      4: {
        nombre: 'Base Aeróbica + VO2 Max (Intermedio)',
        descripcion: 'Construcción de base con trabajo de capacidad',
        ejercicios: [
          { dia: 'Lunes', ejercicios: 'Zona 2: 45min, Accesorios' },
          { dia: 'Martes', ejercicios: 'VO2 Max: Intervalos 4x4 min' },
          { dia: 'Jueves', ejercicios: 'Fuerza: Sentadillas, Deadlifts, Press' },
          { dia: 'Sábado', ejercicios: 'Largo: 60min Zona 2' }
        ],
        duracion: 60,
        intensidad: 'Alta',
        descanso: '45-60 segundos'
      },
      5: {
        nombre: 'Plan de Triatleta (Intermedio)',
        descripcion: 'Entrenamiento multimodal avanzado',
        ejercicios: [
          { dia: 'Lunes', ejercicios: 'Natación: 40min (técnica + resistencia)' },
          { dia: 'Martes', ejercicios: 'Carrera: Intervalos 6x3 min' },
          { dia: 'Miércoles', ejercicios: 'Fuerza: Funcional, TRX, Kettlebells' },
          { dia: 'Jueves', ejercicios: 'Ciclismo: 50min Zona 2-3' },
          { dia: 'Sábado', ejercicios: 'Carrera larga: 10-12km Zona 2' }
        ],
        duracion: 75,
        intensidad: 'Muy Alta',
        descanso: '30-45 segundos'
      }
    },
    avanzado: {
      4: {
        nombre: 'Periodización de Resistencia (Avanzado)',
        descripcion: 'Plan olímpico de construcción de resistencia',
        ejercicios: [
          { dia: 'Lunes', ejercicios: 'Base: 60min Zona 2 + Fuerza' },
          { dia: 'Martes', ejercicios: 'VO2 Max: 5x5 min intenso' },
          { dia: 'Jueves', ejercicios: 'Potencia aeróbica: 8x2-3 min' },
          { dia: 'Sábado', ejercicios: 'Largo: 90min Zona 2-3' }
        ],
        duracion: 90,
        intensidad: 'Muy Alta',
        descanso: '45-60 segundos'
      },
      5: {
        nombre: 'Triatlón Elite (Avanzado)',
        descripcion: 'Entrenamiento de competidor de élite',
        ejercicios: [
          { dia: 'Lunes', ejercicios: 'Natación: 60min técnica + intenso' },
          { dia: 'Martes', ejercicios: 'Carrera: Lactate threshold 3x8 min' },
          { dia: 'Miércoles', ejercicios: 'Ciclismo: VO2 Max 5x5 min' },
          { dia: 'Jueves', ejercicios: 'Fuerza: Pliometría, Potencia' },
          { dia: 'Viernes', ejercicios: 'Recuperación: Yoga, estiramientos' }
        ],
        duracion: 90,
        intensidad: 'Extrema',
        descanso: '30-45 segundos'
      },
      6: {
        nombre: 'Construcción de Resistencia Máxima (Avanzado)',
        descripcion: 'Protocolo de ultraresistencia multimodal',
        ejercicios: [
          { dia: 'Lunes', ejercicios: 'Carrera: 15km moderado' },
          { dia: 'Martes', ejercicios: 'Ciclismo: 90min Zona 2' },
          { dia: 'Miércoles', ejercicios: 'Natación: 60min técnica' },
          { dia: 'Jueves', ejercicios: 'Fuerza: Potencia, Pliometría' },
          { dia: 'Viernes', ejercicios: 'Carrera: Intervalos VO2 Max' },
          { dia: 'Sábado', ejercicios: 'Carrera larga: 20-25km' }
        ],
        duracion: 90,
        intensidad: 'Extrema',
        descanso: '20-30 segundos'
      }
    }
  }
};

// Función para generar recomendación
function generateRecommendation() {
  const objetivo = document.querySelector('input[name="objetivo"]:checked')?.value;
  const nivel = document.querySelector('input[name="nivel"]:checked')?.value;
  const dias = document.querySelector('input[name="dias"]:checked')?.value;
  const duracion = document.querySelector('input[name="duracion"]:checked')?.value;

  if (!objetivo || !nivel || !dias || !duracion) return null;

  const routine = routineData[objetivo]?.[nivel]?.[dias];
  
  if (!routine) return null;

  return {
    ...routine,
    objetivo: objetivo,
    nivel: nivel,
    dias: dias,
    duracionSesion: duracion
  };
}

// Actualizar progreso
function updateProgress() {
  const progress = ((currentQuestion - 1) / totalQuestions) * 100;
  progressFill.style.width = progress + '%';
}

// Agregar listeners a los radio buttons
function addRadioListeners() {
  const currentRadioName = radioNames[currentQuestion - 1];
  const radios = document.querySelectorAll(`input[name="${currentRadioName}"]`);
  
  radios.forEach(radio => {
    radio.addEventListener('change', checkSelection);
  });
}

// Función para mostrar pregunta
function showQuestion(question) {
  quizQuestions.forEach(q => {
    q.style.display = q.getAttribute('data-question') == question ? 'block' : 'none';
  });
  
  // Actualizar contador de pregunta
  const questionCounter = document.getElementById('questionCounter');
  if (questionCounter) {
    questionCounter.textContent = `Pregunta ${currentQuestion} de ${totalQuestions}`;
  }
  
  prevBtn.style.display = currentQuestion > 1 ? 'block' : 'none';
  
  if (currentQuestion === totalQuestions) {
    nextBtn.textContent = 'Ver Rutina';
    nextBtn.innerHTML = 'Ver Rutina <i class="bi bi-check-circle"></i>';
  } else {
    nextBtn.textContent = 'Siguiente ';
    nextBtn.innerHTML = 'Siguiente <i class="bi bi-chevron-right"></i>';
  }
  
  // Verificar selección y agregar listeners
  checkSelection();
  addRadioListeners();
  
  updateProgress();
}

// Next button
nextBtn.addEventListener('click', (e) => {
  e.preventDefault();
  
  if (currentQuestion < totalQuestions) {
    currentQuestion++;
    showQuestion(currentQuestion);
  } else {
    const recommendation = generateRecommendation();
    if (recommendation) {
      showRecommendation(recommendation);
    }
  }
});

// Prev button
prevBtn.addEventListener('click', (e) => {
  e.preventDefault();
  
  if (currentQuestion > 1) {
    currentQuestion--;
    showQuestion(currentQuestion);
  }
});

// Mostrar recomendación
function showRecommendation(recommendation) {
  quizQuestions.forEach(q => q.style.display = 'none');
  quizResults.style.display = 'block';
  nextBtn.style.display = 'none';
  prevBtn.style.display = 'none';

  // Ocultar el contador de preguntas
  const questionCounter = document.getElementById('questionCounter');
  if (questionCounter) {
    questionCounter.parentElement.style.display = 'none';
  }

  // Ocultar la barra de progreso
  const progressBar = document.querySelector('.progress-bar');
  if (progressBar) {
    progressBar.style.display = 'none';
  }

  const objectiveText = {
    masa: 'Ganancia de Masa',
    definicion: 'Definición',
    resistencia: 'Resistencia'
  };

  const levelText = {
    principiante: 'Principiante',
    intermedio: 'Intermedio',
    avanzado: 'Avanzado'
  };

  let routineHTML = `
    <div class="recommendation-card">
      <h4>
        <i class="bi bi-lightning-fill"></i>
        ${recommendation.nombre}
      </h4>
      <p>${recommendation.descripcion}</p>
      <ul>
        <li>Objetivo: ${objectiveText[recommendation.objetivo]}</li>
        <li>Nivel: ${levelText[recommendation.nivel]}</li>
        <li>Duración por sesión: ${recommendation.duracion} minutos</li>
        <li>Intensidad: ${recommendation.intensidad}</li>
        <li>Descanso recomendado: ${recommendation.descanso}</li>
      </ul>
    </div>
    <div class="recommendation-card">
      <h4>
        <i class="bi bi-calendar-week"></i>
        Distribución de Entrenamientos
      </h4>
      ${recommendation.ejercicios.map(e => `
        <div style="margin-bottom: 1rem;">
          <strong>${e.dia}</strong>
          <p style="margin: 0.5rem 0 0 0;">${e.ejercicios}</p>
        </div>
      `).join('')}
    </div>
    <div class="recommendation-card">
      <h4>
        <i class="bi bi-star-fill"></i>
        Recomendaciones
      </h4>
      <ul>
        <li>Descansa ${7 - recommendation.dias} días a la semana</li>
        <li>Duerme 7-9 horas diarias</li>
        <li>Mantén un registro de tus entrenamientos</li>
        <li>Ajusta la intensidad según tu progreso</li>
        <li>Consulta con un entrenador profesional</li>
      </ul>
    </div>

  `;

  document.getElementById('routineRecommendation').innerHTML = routineHTML;
  updateProgress();

  // Configurar botones de descargar y reiniciar
  const downloadBtn = document.getElementById('downloadBtn');
  const restartQuizBtn = document.getElementById('restartQuizBtn');

  if (downloadBtn) {
    downloadBtn.addEventListener('click', () => {
      downloadRoutineAsPDF(recommendation, objectiveText, levelText);
    });
  }

  if (restartQuizBtn) {
    restartQuizBtn.addEventListener('click', () => {
      resetQuiz();
    });
  }
}

// Inicializar
showQuestion(1);

// ==================== DOWNLOAD & RESET FUNCTIONS ====================
function resetQuiz() {
  currentQuestion = 1;
  quizForm.reset();
  quizResults.style.display = 'none';
  quizQuestions.forEach(q => q.style.display = 'none');
  nextBtn.style.display = 'block';
  prevBtn.style.display = 'none';
  
  // Mostrar el contador de preguntas nuevamente
  const questionCounter = document.getElementById('questionCounter');
  if (questionCounter) {
    questionCounter.parentElement.style.display = 'block';
  }
  
  // Mostrar la barra de progreso nuevamente
  const progressBar = document.querySelector('.progress-bar');
  if (progressBar) {
    progressBar.style.display = 'block';
  }
  
  showQuestion(1);
}

function downloadRoutineAsPDF(recommendation, objectiveText, levelText) {
  // Crear contenido de texto
  let content = `RUTINA PERSONALIZADA - POWERLAB GYM\n\n`;
  content += `${recommendation.nombre}\n`;
  content += `${'='.repeat(50)}\n\n`;
  
  content += `INFORMACIÓN GENERAL:\n`;
  content += `- Objetivo: ${objectiveText[recommendation.objetivo]}\n`;
  content += `- Nivel: ${levelText[recommendation.nivel]}\n`;
  content += `- Días por semana: ${recommendation.dias}\n`;
  content += `- Duración por sesión: ${recommendation.duracion} minutos\n`;
  content += `- Intensidad: ${recommendation.intensidad}\n`;
  content += `- Descanso: ${recommendation.descanso}\n\n`;
  
  content += `DESCRIPCIÓN:\n${recommendation.descripcion}\n\n`;
  
  content += `DISTRIBUCIÓN DE ENTRENAMIENTOS:\n`;
  content += `${'='.repeat(50)}\n`;
  recommendation.ejercicios.forEach(e => {
    content += `\n${e.dia}:\n${e.ejercicios}\n`;
  });
  
  content += `\n\nRECOMENDACIONES IMPORTANTES:\n`;
  content += `${'='.repeat(50)}\n`;
  content += `- Descansa ${7 - recommendation.dias} días a la semana para recuperación\n`;
  content += `- Duerme 7-9 horas diarias para óptimos resultados\n`;
  content += `- Mantén un registro detallado de tus entrenamientos\n`;
  content += `- Ajusta la intensidad según tu progreso semanal\n`;
  content += `- Consulta con un entrenador profesional para técnica correcta\n`;
  content += `- Come en base a tu objetivo (superávit/déficit calórico)\n`;
  content += `- Mantén consistencia: ese es el factor más importante\n\n`;
  
  content += `Generado por: PowerLab Gym\nFecha: ${new Date().toLocaleDateString('es-ES')}\n`;
  
  // Crear blob y descargar
  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = `rutina-${recommendation.objetivo}-${new Date().getTime()}.txt`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// ==================== 360 VIDEO SECTION ====================
class Video360Player {
  constructor() {
    this.video = document.getElementById('video360');
    
    if (!this.video) return;
    
    this.init();
  }
  
  init() {
    // YouTube maneja automáticamente los videos 360
    // Solo necesitamos asegurarnos que el iframe esté bien configurado
    console.log('Video 360 de YouTube cargado correctamente');
  }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
  new Video360Player();
});

