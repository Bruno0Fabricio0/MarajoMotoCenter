// Menu mobile
// Gerenciamento do Menu Mobile
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const header = document.querySelector('.main-header');

menuToggle.addEventListener('click', () => {
    const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', !isExpanded);
    menuToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
    menuToggle.setAttribute('aria-label', isExpanded ? 'Abrir menu' : 'Fechar menu');
});

// Gerenciamento da navegação ativa
function setActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            item.removeAttribute('aria-current');
            if (item.getAttribute('href').slice(1) === current) {
                item.classList.add('active');
                item.setAttribute('aria-current', 'page');
            }
        });
    });
}

// Scroll suave para as seções
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });

            // Fecha o menu mobile se estiver aberto
            if (navLinks.classList.contains('active')) {
                menuToggle.click();
            }
        }
    });
});

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    setActiveNavLink();
});

// Header responsivo ao scroll
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        header.classList.remove('scroll-up');
        return;
    }

    if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
        // Scroll para baixo
        header.classList.remove('scroll-up');
        header.classList.add('scroll-down');
    } else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
        // Scroll para cima
        header.classList.remove('scroll-down');
        header.classList.add('scroll-up');
    }
    lastScroll = currentScroll;
});

// Formulário WhatsApp
document.getElementById('whatsapp-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const nome = this.nome.value;
    const email = this.email.value;
    const telefone = this.telefone.value;
    const mensagem = this.mensagem.value;
    
    // Número do WhatsApp da empresa (substitua pelo número correto)
    const whatsappNumber = '5511999999999';
    
    // Monta a mensagem
    const text = `Olá! Me chamo ${nome}\n\nE-mail: ${email}\nTelefone: ${telefone}\n\nMensagem: ${mensagem}`;
    
    // Cria o link do WhatsApp
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;
    
    // Abre o WhatsApp em uma nova aba
    window.open(whatsappUrl, '_blank');
    
    // Limpa o formulário
    this.reset();
});

const modelosSwiper = new Swiper('.modelos-swiper', {
    slidesPerView: 1,
    spaceBetween: 30,
    centeredSlides: true,
    loop: true,
    speed: 800,
    autoplay: {
        delay: 5000,
        disableOnInteraction: false,
    },
    effect: 'coverflow',
    coverflowEffect: {
        rotate: 0,
        stretch: 0,
        depth: 100,
        modifier: 2,
        slideShadows: false,
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    keyboard: {
        enabled: true,
    },
    breakpoints: {
        640: {
            slidesPerView: 1,
        },
        768: {
            slidesPerView: 2,
        },
        1024: {
            slidesPerView: 3,
        },
    },
    a11y: {
        prevSlideMessage: 'Modelo anterior',
        nextSlideMessage: 'Próximo modelo',
        firstSlideMessage: 'Primeiro modelo',
        lastSlideMessage: 'Último modelo',
        paginationBulletMessage: 'Ir para o modelo {{index}}',
    }
});