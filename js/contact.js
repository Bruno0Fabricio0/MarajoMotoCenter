// Máscara para o campo de WhatsApp
document.getElementById('whatsapp').addEventListener('input', function (e) {
    let value = e.target.value;
    value = value.replace(/\D/g, ''); // Remove tudo que não é número
    if (value.length >= 2) {
        value = '(' + value.substring(0,2) + ')' + (value.length > 2 ? ' ' + value.substring(2) : '');
    }
    if (value.length >= 10) {
        value = value.substring(0,10) + '-' + value.substring(10);
    }
    e.target.value = value.substring(0,15);
});

// Função para validar e-mail
function validarEmail(email) {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(email);
}

// Função para validar nome
function validarNome(nome) {
    return nome.trim().length >= 3;
}

// Função para validar WhatsApp
function validarWhatsApp(whatsapp) {
    const re = /^\([0-9]{2}\)\s[0-9]{5}-[0-9]{4}$/;
    return re.test(whatsapp);
}

// Função para enviar mensagem para o WhatsApp
function enviarParaWhatsApp(event) {
    event.preventDefault();

    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const whatsapp = document.getElementById('whatsapp').value;
    const mensagem = document.getElementById('mensagem').value;

    // Validação dos campos
    if (!validarNome(nome)) {
        alert('Por favor, insira um nome válido com pelo menos 3 caracteres');
        return false;
    }

    if (!validarEmail(email)) {
        alert('Por favor, insira um e-mail válido');
        return false;
    }

    if (!validarWhatsApp(whatsapp)) {
        alert('Por favor, insira um número de WhatsApp válido');
        return false;
    }

    if (mensagem.trim().length < 10) {
        alert('Por favor, insira uma mensagem com pelo menos 10 caracteres');
        return false;
    }

    // Número do WhatsApp da empresa (substitua pelo número correto)
    const numeroEmpresa = '559185682151'; // Formato: 55 + DDD + número

    // Formata a mensagem para o WhatsApp
    const mensagemWhatsApp = `Olá! Me chamo ${nome}\n\nE-mail: ${email}\nTelefone: ${whatsapp}\n\nMensagem: ${mensagem}`;

    // Codifica a mensagem para URL
    const mensagemCodificada = encodeURIComponent(mensagemWhatsApp);

    // Cria o link do WhatsApp
    const linkWhatsApp = `https://wa.me/${numeroEmpresa}?text=${mensagemCodificada}`;

    // Abre o WhatsApp em uma nova janela
    window.open(linkWhatsApp, '_blank');

    // Limpa o formulário
    document.getElementById('contato-form').reset();

    return false;
}