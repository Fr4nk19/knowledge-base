// Configuración de seguridad
const VALID_PASSWORD = 'admin123'; // Cambiar esta contraseña
let isAuthenticated = false;

// Inicialización cuando el DOM está listo
document.addEventListener('DOMContentLoaded', () => {
    checkAuthentication();
});

// Verificar autenticación
function checkAuthentication() {
    // Verificar si ya está autenticado en esta sesión
    const sessionAuth = sessionStorage.getItem('authenticated');

    if (sessionAuth === 'true') {
        isAuthenticated = true;
        initializeWelcomePage();
    } else {
        showPasswordPrompt();
    }
}

// Mostrar prompt de contraseña
function showPasswordPrompt() {
    const overlay = document.createElement('div');
    overlay.id = 'password-overlay';
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(15, 23, 42, 0.98);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
        animation: fadeIn 0.5s ease-out;
    `;

    const loginBox = document.createElement('div');
    loginBox.style.cssText = `
        background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
        padding: 3rem;
        border-radius: 20px;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
        border: 1px solid rgba(99, 102, 241, 0.3);
        text-align: center;
        max-width: 400px;
        width: 90%;
        animation: scaleIn 0.5s ease-out;
    `;

    loginBox.innerHTML = `
        <div style="font-size: 3rem; margin-bottom: 1rem;">🔒</div>
        <h2 style="color: #f1f5f9; margin-bottom: 0.5rem; font-size: 2rem;">Acceso Restringido</h2>
        <p style="color: #cbd5e1; margin-bottom: 2rem;">Ingresa la contraseña para continuar</p>
        <input type="password" id="password-input" placeholder="Contraseña"
            style="
                width: 100%;
                padding: 1rem;
                border: 2px solid rgba(99, 102, 241, 0.3);
                border-radius: 10px;
                background: rgba(30, 41, 59, 0.5);
                color: #f1f5f9;
                font-size: 1rem;
                margin-bottom: 1rem;
                outline: none;
                transition: border-color 0.3s ease;
            "
        />
        <div id="error-message" style="color: #ef4444; margin-bottom: 1rem; min-height: 20px; font-size: 0.9rem;"></div>
        <button id="login-button"
            style="
                width: 100%;
                padding: 1rem;
                background: linear-gradient(135deg, #6366f1, #8b5cf6);
                color: white;
                border: none;
                border-radius: 10px;
                font-size: 1.1rem;
                font-weight: 600;
                cursor: pointer;
                transition: transform 0.2s ease, box-shadow 0.2s ease;
            "
        >Ingresar</button>
    `;

    overlay.appendChild(loginBox);
    document.body.appendChild(overlay);

    // Agregar event listeners
    const passwordInput = document.getElementById('password-input');
    const loginButton = document.getElementById('login-button');
    const errorMessage = document.getElementById('error-message');

    // Focus automático en el input
    setTimeout(() => passwordInput.focus(), 100);

    // Enter para enviar
    passwordInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            validatePassword();
        }
    });

    // Click en botón
    loginButton.addEventListener('click', validatePassword);

    // Hover effect en botón
    loginButton.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.05)';
        this.style.boxShadow = '0 10px 30px rgba(99, 102, 241, 0.5)';
    });

    loginButton.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
        this.style.boxShadow = 'none';
    });

    // Focus effect en input
    passwordInput.addEventListener('focus', function() {
        this.style.borderColor = '#6366f1';
    });

    passwordInput.addEventListener('blur', function() {
        this.style.borderColor = 'rgba(99, 102, 241, 0.3)';
    });

    function validatePassword() {
        const password = passwordInput.value;

        if (password === VALID_PASSWORD) {
            // Contraseña correcta
            isAuthenticated = true;
            sessionStorage.setItem('authenticated', 'true');

            errorMessage.textContent = '';
            passwordInput.style.borderColor = '#10b981';

            // Animación de éxito
            loginBox.style.animation = 'scaleOut 0.3s ease-out';
            overlay.style.animation = 'fadeOut 0.3s ease-out';

            setTimeout(() => {
                overlay.remove();
                initializeWelcomePage();
                showNotification('✅ Acceso concedido. ¡Bienvenido!');
            }, 300);
        } else {
            // Contraseña incorrecta
            errorMessage.textContent = '❌ Contraseña incorrecta';
            passwordInput.value = '';
            passwordInput.style.borderColor = '#ef4444';

            // Animación de shake
            loginBox.style.animation = 'shake 0.5s ease-out';
            setTimeout(() => {
                loginBox.style.animation = 'scaleIn 0.5s ease-out';
            }, 500);
        }
    }
}

// Función principal de inicialización
function initializeWelcomePage() {
    setupButtonListeners();
    addCardAnimations();
    createParticles();
    addLogoutButton();
}

// Configurar listeners para botones
function setupButtonListeners() {
    const startButton = document.getElementById('startButton');

    if (startButton) {
        startButton.addEventListener('click', handleStartClick);
    }
}

// Manejar el clic en el botón "Comenzar"
function handleStartClick(event) {
    showWelcomeMessage();
    addClickEffect(event.target);
}

// Mostrar mensaje de bienvenida
function showWelcomeMessage() {
    const message = '¡Bienvenido a tu Knowledge Base! 🚀';

    // Crear elemento de notificación
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #6366f1, #8b5cf6);
        color: white;
        padding: 1rem 2rem;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        animation: slideIn 0.5s ease-out;
        z-index: 1000;
        font-weight: 600;
    `;

    document.body.appendChild(notification);

    // Eliminar después de 3 segundos
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.5s ease-out';
        setTimeout(() => notification.remove(), 500);
    }, 3000);
}

// Agregar efecto de clic
function addClickEffect(element) {
    element.style.transform = 'scale(0.95)';
    setTimeout(() => {
        element.style.transform = '';
    }, 200);
}

// Agregar animaciones a las tarjetas
function addCardAnimations() {
    const cards = document.querySelectorAll('.feature-card');

    cards.forEach((card, index) => {
        // Animación de entrada escalonada
        card.style.animation = `fadeInUp 0.6s ease-out ${index * 0.2}s both`;

        // Agregar listener para efectos interactivos
        card.addEventListener('click', () => {
            handleCardClick(card, index);
        });
    });
}

// Manejar clic en tarjeta
function handleCardClick(card, index) {
    const messages = [
        '📚 Descubre toda la documentación disponible',
        '🎓 Accede a tutoriales y guías completas',
        '💪 Desarrolla nuevas habilidades cada día'
    ];

    showNotification(messages[index]);

    // Efecto de pulso
    card.style.animation = 'none';
    setTimeout(() => {
        card.style.animation = 'pulse 0.5s ease-in-out';
    }, 10);
}

// Mostrar notificación personalizada
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: rgba(30, 41, 59, 0.95);
        color: white;
        padding: 1rem 2rem;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        border: 1px solid rgba(99, 102, 241, 0.5);
        animation: slideUp 0.5s ease-out;
        z-index: 1000;
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideDown 0.5s ease-out';
        setTimeout(() => notification.remove(), 500);
    }, 2500);
}

// Crear partículas de fondo animadas
function createParticles() {
    const particleCount = 20;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: fixed;
            width: ${Math.random() * 4 + 2}px;
            height: ${Math.random() * 4 + 2}px;
            background: rgba(99, 102, 241, ${Math.random() * 0.5 + 0.2});
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            pointer-events: none;
            animation: float ${Math.random() * 10 + 10}s infinite ease-in-out;
            animation-delay: ${Math.random() * 5}s;
        `;

        document.body.appendChild(particle);
    }
}

// Agregar estilos de animación dinámicamente
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }

    @keyframes slideUp {
        from {
            transform: translate(-50%, 100px);
            opacity: 0;
        }
        to {
            transform: translate(-50%, 0);
            opacity: 1;
        }
    }

    @keyframes slideDown {
        from {
            transform: translate(-50%, 0);
            opacity: 1;
        }
        to {
            transform: translate(-50%, 100px);
            opacity: 0;
        }
    }

    @keyframes float {
        0%, 100% {
            transform: translateY(0) translateX(0);
        }
        25% {
            transform: translateY(-20px) translateX(10px);
        }
        50% {
            transform: translateY(-40px) translateX(-10px);
        }
        75% {
            transform: translateY(-20px) translateX(10px);
        }
    }
`;
document.head.appendChild(style);

// Log de inicialización
console.log('✅ Knowledge Base inicializado correctamente');
console.log('🎨 Página de bienvenida lista');
