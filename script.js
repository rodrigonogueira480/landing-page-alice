// Smooth scrolling para links de navegação
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

// FAQ Toggle
document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
        const faqItem = question.parentElement;
        const isActive = faqItem.classList.contains('active');
        
        // Fechar todas as outras FAQs
        document.querySelectorAll('.faq-item').forEach(item => {
            item.classList.remove('active');
        });
        
        // Abrir a FAQ clicada se não estava ativa
        if (!isActive) {
            faqItem.classList.add('active');
        }
    });
});

// Menu mobile toggle
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        mobileMenuToggle.classList.toggle('active');
    });
}

// Formulário de contato
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(this);
        const name = formData.get('name');
        const email = formData.get('email');
        const phone = formData.get('phone');
        const message = formData.get('message');
        
        // Criar mensagem para WhatsApp
        const whatsappMessage = `Olá Alice! Meu nome é ${name}.
        
E-mail: ${email}
Telefone: ${phone}

Mensagem: ${message}

Gostaria de agendar uma consulta.`;
        
        const whatsappUrl = `https://wa.me/5585999242320?text=${encodeURIComponent(whatsappMessage)}`;
        window.open(whatsappUrl, '_blank');
        
        // Limpar formulário
        this.reset();
        
        // Mostrar mensagem de sucesso
        alert('Redirecionando para WhatsApp...');
    });
}

// Animação de entrada dos elementos
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Aplicar animação aos elementos
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.benefit-item, .value-item, .testimonial-item, .step-item, .problem-item');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.backdropFilter = 'blur(10px)';
    } else {
        header.style.background = '#ffffff';
        header.style.backdropFilter = 'none';
    }
});

// Botões CTA com WhatsApp
document.querySelectorAll('.cta-button').forEach(button => {
    if (button.textContent.includes('Agendar') || button.textContent.includes('contato')) {
        button.addEventListener('click', (e) => {
            if (button.getAttribute('href') === '#contato') {
                return; // Deixar o scroll normal funcionar
            }
            
            e.preventDefault();
            const whatsappMessage = `Olá Alice! Gostaria de agendar uma consulta. Vi seu site e tenho interesse em conhecer mais sobre seu trabalho.`;
            const whatsappUrl = `https://wa.me/5585999242320?text=${encodeURIComponent(whatsappMessage)}`;
            window.open(whatsappUrl, '_blank');
        });
    }
});

// Validação de formulário em tempo real
const formInputs = document.querySelectorAll('#contactForm input, #contactForm textarea');
formInputs.forEach(input => {
    input.addEventListener('blur', validateField);
    input.addEventListener('input', clearError);
});

function validateField(e) {
    const field = e.target;
    const value = field.value.trim();
    
    // Remover mensagens de erro anteriores
    clearError(e);
    
    if (!value) {
        showError(field, 'Este campo é obrigatório');
        return false;
    }
    
    if (field.type === 'email' && !isValidEmail(value)) {
        showError(field, 'Por favor, insira um e-mail válido');
        return false;
    }
    
    if (field.type === 'tel' && !isValidPhone(value)) {
        showError(field, 'Por favor, insira um telefone válido');
        return false;
    }
    
    return true;
}

function clearError(e) {
    const field = e.target;
    const errorMsg = field.parentNode.querySelector('.error-message');
    if (errorMsg) {
        errorMsg.remove();
    }
    field.style.borderColor = '#E2BDA8';
}

function showError(field, message) {
    field.style.borderColor = '#e74c3c';
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.style.color = '#e74c3c';
    errorDiv.style.fontSize = '0.9rem';
    errorDiv.style.marginTop = '0.5rem';
    errorDiv.textContent = message;
    
    field.parentNode.appendChild(errorDiv);
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidPhone(phone) {
    const phoneRegex = /^[\d\s\(\)\-\+]{10,}$/;
    return phoneRegex.test(phone);
}

// Adicionar CSS para menu mobile
const mobileMenuCSS = `
@media (max-width: 768px) {
    .nav-links {
        position: fixed;
        top: 70px;
        left: -100%;
        width: 100%;
        height: calc(100vh - 70px);
        background: white;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        padding-top: 2rem;
        transition: left 0.3s ease;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
    
    .nav-links.active {
        left: 0;
    }
    
    .nav-links a {
        padding: 1rem;
        font-size: 1.2rem;
        width: 100%;
        text-align: center;
        border-bottom: 1px solid #f0f0f0;
    }
    
    .mobile-menu-toggle.active span:nth-child(1) {
        transform: rotate(45deg) translate(5px, 5px);
    }
    
    .mobile-menu-toggle.active span:nth-child(2) {
        opacity: 0;
    }
    
    .mobile-menu-toggle.active span:nth-child(3) {
        transform: rotate(-45deg) translate(7px, -6px);
    }
}
`;

// Adicionar CSS ao documento
const style = document.createElement('style');
style.textContent = mobileMenuCSS;
document.head.appendChild(style);