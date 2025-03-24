document.addEventListener('DOMContentLoaded', () => {
    // Seleciona os elementos do DOM
    const registrationForm = document.getElementById('registrationForm');
    const loginForm = document.getElementById('loginForm');
    const responseMessage = document.getElementById('responseMessage');
    const loginResponseMessage = document.getElementById('loginResponseMessage'); // Nova ID para mensagens de login

    // Função para exibir mensagens
    const showMessage = (message, isError = false, isLoginMessage = false) => {
        if (isLoginMessage) {
            loginResponseMessage.textContent = message; // Mensagem de login
            loginResponseMessage.style.color = isError ? 'red' : 'green';
        } else {
            responseMessage.textContent = message; // Mensagem de cadastro
            responseMessage.style.color = isError ? 'red' : 'green';
        }
    };

    // Lógica para o formulário de cadastro
    if (registrationForm) {
        registrationForm.addEventListener('submit', (event) => {
            event.preventDefault(); // Impede o envio padrão do formulário

            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const password = document.getElementById('password').value.trim();

            // Verifica se todos os campos estão preenchidos
            if (!name || !email || !password) {
                showMessage('Por favor, preencha todos os campos.', true);
                return;
            }

            // Recupera os usuários existentes do localStorage
            const existingUsers = JSON.parse(localStorage.getItem('users')) || [];

            // Verifica se o usuário já está cadastrado
            if (existingUsers.some(user => user.email === email)) {
                showMessage('Este email já está cadastrado.', true);
                return;
            }

            // Adiciona o novo usuário ao array
            existingUsers.push({ name, email, password });
            localStorage.setItem('users', JSON.stringify(existingUsers));

            showMessage('Usuário cadastrado com sucesso!');

            // Redireciona para a página inicial após 2 segundos
            setTimeout(() => {
                window.location.href = 'index.html'; // Redireciona para index.html
            }, 2000); // 2000 milissegundos = 2 segundos

            registrationForm.reset(); // Limpa o formulário
        });
    }

    // Lógica para o formulário de login
    if (loginForm) {
        loginForm.addEventListener('submit', (event) => {
            event.preventDefault(); // Impede o envio padrão do formulário

            const email = document.getElementById('loginEmail').value.trim();
            const password = document.getElementById('loginPassword').value.trim();

            // Verifica se os campos de login estão preenchidos
            if (!email || !password) {
                showMessage('Por favor, preencha todos os campos.', true, true);
                return;
            }

            // Recupera os usuários do localStorage
            const existingUsers = JSON.parse(localStorage.getItem('users')) || [];

            // Verifica se o usuário existe e se a senha está correta
            const user = existingUsers.find(user => user.email === email && user.password === password);

            if (user) {
                // Redireciona para a página inicial após login bem-sucedido
                window.location.href = 'index.html'; // Redireciona para index.html
            } else {
                showMessage('Email ou senha incorretos.', true, true);
            }
        });
    }
});