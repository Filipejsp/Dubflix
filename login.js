// Sistema de login local sem Firebase
let isLoggedIn = false;

// Verificar se usuário já está logado (localStorage)
if (localStorage.getItem('dubflix_logged_in') === 'true') {
  window.location.href = "home.html";
}

// Navegação por teclado/controle remoto
document.addEventListener('keydown', function(e) {
  if (e.key === 'Enter') {
    login();
  }
});

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

function validatePassword(password) {
  return password.length >= 6;
}

function showMessage(message, isError = false) {
  const messageDiv = document.getElementById('message') || createMessageDiv(isError);
  messageDiv.textContent = message;
  messageDiv.className = isError ? 'error-message' : 'success-message';
  messageDiv.style.display = 'block';
  
  setTimeout(() => {
    messageDiv.style.display = 'none';
  }, 3000);
}

function createMessageDiv(isError = false) {
  const div = document.createElement('div');
  div.id = 'message';
  div.style.cssText = `
    position: fixed;
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
    padding: 15px 30px;
    border-radius: 8px;
    font-size: 18px;
    font-weight: bold;
    z-index: 1000;
    display: none;
    background-color: ${isError ? '#ff4444' : '#44ff44'};
    color: white;
  `;
  document.body.appendChild(div);
  return div;
}

function login() {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  
  // Validações
  if (!email || !password) {
    showMessage("Por favor, preencha todos os campos.", true);
    return;
  }
  
  if (!validateEmail(email)) {
    showMessage("Por favor, insira um email válido.", true);
    return;
  }
  
  if (!validatePassword(password)) {
    showMessage("A senha deve ter pelo menos 6 caracteres.", true);
    return;
  }
  
  // Mostrar loading
  const loginBtn = document.querySelector('button');
  const originalText = loginBtn.textContent;
  loginBtn.textContent = "Entrando...";
  loginBtn.disabled = true;
  
  // Simular delay de login
  setTimeout(() => {
    // Login local - aceita qualquer email/senha válida
    localStorage.setItem('dubflix_logged_in', 'true');
    localStorage.setItem('dubflix_user_email', email);
    
    showMessage("Login realizado com sucesso!");
    setTimeout(() => {
      window.location.href = "home.html";
    }, 1000);
  }, 1500);
}

function signup() {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  
  // Validações
  if (!email || !password) {
    showMessage("Por favor, preencha todos os campos.", true);
    return;
  }
  
  if (!validateEmail(email)) {
    showMessage("Por favor, insira um email válido.", true);
    return;
  }
  
  if (!validatePassword(password)) {
    showMessage("A senha deve ter pelo menos 6 caracteres.", true);
    return;
  }
  
  // Mostrar loading
  const signupBtn = document.querySelector('button');
  const originalText = signupBtn.textContent;
  signupBtn.textContent = "Criando conta...";
  signupBtn.disabled = true;
  
  // Simular criação de conta
  setTimeout(() => {
    localStorage.setItem('dubflix_logged_in', 'true');
    localStorage.setItem('dubflix_user_email', email);
    
    showMessage("Conta criada com sucesso!");
    setTimeout(() => {
      window.location.href = "home.html";
    }, 1000);
  }, 1500);
}

function resetPassword() {
  const email = document.getElementById("email").value.trim();
  
  if (!email || !validateEmail(email)) {
    showMessage("Por favor, insira um email válido.", true);
    return;
  }
  
  showMessage("Email de recuperação enviado! (Simulado)");
}

// Expor funções globalmente
window.login = login;
window.signup = signup;
window.resetPassword = resetPassword;
