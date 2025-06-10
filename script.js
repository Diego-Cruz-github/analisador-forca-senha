document.addEventListener("DOMContentLoaded", () => {
  const passwordInput = document.getElementById("password");
  const strengthBar = document.getElementById("strengthBar");
  const strengthText = document.getElementById("strengthText");
  const feedbackDiv = document.getElementById("feedback");
  const togglePasswordButton = document.getElementById("togglePassword");

  // Função para alternar visibilidade da senha
  togglePasswordButton.addEventListener("click", () => {
    if (passwordInput.type === "password") {
      passwordInput.type = "text";
      togglePasswordButton.textContent = "Esconder";
    } else {
      passwordInput.type = "password";
      togglePasswordButton.textContent = "Mostrar";
    }
  });

  // Função para analisar a força da senha
  passwordInput.addEventListener("input", () => {
    const password = passwordInput.value;
    let score = 0;
    let feedbackMessages = [];

    // Critérios de força
    if (password.length >= 8) {
      score += 1;
    } else {
      feedbackMessages.push("A senha deve ter pelo menos 8 caracteres.");
    }
    if (password.length >= 12) {
      score += 1;
    }

    if (/[a-z]/.test(password)) {
      // Letras minúsculas
      score += 1;
    } else {
      feedbackMessages.push("A senha deve conter letras minúsculas.");
    }
    if (/[A-Z]/.test(password)) {
      // Letras maiúsculas
      score += 1;
    } else {
      feedbackMessages.push("A senha deve conter letras maiúsculas.");
    }
    if (/\d/.test(password)) {
      // Números
      score += 1;
    } else {
      feedbackMessages.push("A senha deve conter números.");
    }
    if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~`]/.test(password)) {
      // Caracteres especiais
      score += 1;
    } else {
      feedbackMessages.push("A senha deve conter caracteres especiais.");
    }

    // Atribui a força com base no score
    let strength = "";
    let barWidth = 0;
    let barColor = "";

    if (score <= 1) {
      strength = "Muito Fraca";
      barWidth = 20;
      barColor = "#dc3545"; // Vermelho
    } else if (score === 2) {
      strength = "Fraca";
      barWidth = 40;
      barColor = "#ffc107"; // Laranja
    } else if (score === 3 || score === 4) {
      strength = "Média";
      barWidth = 60;
      barColor = "#ffc107"; // Laranja
    } else if (score === 5) {
      strength = "Boa";
      barWidth = 80;
      barColor = "#28a745"; // Verde
    } else {
      // score >= 6
      strength = "Excelente";
      barWidth = 100;
      barColor = "#28a745"; // Verde
    }

    strengthBar.style.width = barWidth + "%";
    strengthBar.style.backgroundColor = barColor;
    strengthText.textContent = strength;

    // Mostra o feedback
    if (feedbackMessages.length > 0 && password.length > 0) {
      feedbackDiv.innerHTML =
        "Sugestões para melhorar:<ul>" +
        feedbackMessages.map((msg) => `<li>${msg}</li>`).join("") +
        "</ul>";
    } else {
      feedbackDiv.innerHTML = "";
    }
    if (password.length === 0) {
      strengthBar.style.width = "0%";
      strengthText.textContent = "Muito Fraca";
      feedbackDiv.innerHTML = "";
    }
  });
});
