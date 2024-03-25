//Mapeando HTML
const botaoIniciar = document.getElementById("botao-iniciar")
const containerTimerFoco = document.getElementById("containerTimerFoco")
const botaoStop = document.getElementById("botao-stop")
const containerTimerDescanso = document.getElementById("containerTimerDescanso")
const botaoConcluido = document.getElementById("botao-concluido")
const circulo = document.getElementById("circulo")
const body = document.getElementById("body")
const botaoPausar = document.getElementById("botao-pausar")
const botaoRetomar = document.getElementById("botao-retomar")
const timerDisplay = document.getElementById("timerDisplay")



let timer; // Variável para armazenar o identificador do setInterval
let timerRunning = false; // Variável para controlar se o timer está em execução
let milliseconds = 0; // Variável para armazenar os milissegundos




function startTimer() {
  if (!timerRunning) {
    timerRunning = true; // Ativa o timer
    timer = setInterval(updateTimer, 10); // Inicia o intervalo de atualização do timer a cada 10 milissegundos
    botaoIniciar.style.display = "none";
    containerTimerFoco.style.display = "flex";
    botaoRetomar.style.display = "none";
    botaoStop.style.display = "none";
    botaoPausar.style.display = "block";
    circulo.style.animation = "grow 10s forwards";
  }
}

function pauseTimer() {
  clearInterval(timer); // Para o intervalo do timer
  timerRunning = false; // Desativa o timer
  circulo.style.animationPlayState = 'paused';
  botaoPausar.style.display = 'none';
  botaoRetomar.style.display = 'block';
  botaoStop.style.display = 'block';
}

function interromperTimer() {
  clearInterval(timer); // Para o intervalo do timer
  timerRunning = false; // Desativa o timer
  milliseconds = 0; // Reseta os milissegundos
  containerTimerFoco.style.display = "none";
  botaoIniciar.style.display = "block";
  circulo.style.animation = "none";
}

function retomarTimer() {
  timerRunning = true; // Ativa o timer
  timer = setInterval(updateTimer, 10); // Inicia o intervalo de atualização do timer a cada 10 milissegundos
  circulo.style.animationPlayState = 'running';
  botaoPausar.style.display = 'block';
  botaoRetomar.style.display = 'none';
  botaoStop.style.display = 'none';
}

function updateTimer() {
  milliseconds++; // Incrementa os milissegundos
  const displayElement = document.querySelector(".timerDisplay"); // Seleciona o elemento que exibe o timer
  const minutes = Math.floor((milliseconds / 6000) % 60); // Calcula os minutos
  const seconds = Math.floor((milliseconds / 100) % 60); // Calcula os segundos
  const milisecs = milliseconds % 100; // Calcula os milissegundos
  displayElement.textContent = `${(minutes < 10 ? "0" : "") + minutes}:${(seconds < 10 ? "0" : "") + seconds
    }.${(milisecs < 10 ? "00" : milisecs < 100 ? "0" : "") + milisecs}`; // Atualiza o display com o tempo formatado

  if (minutes === 25 && seconds === 0 && milisecs === 0) {
    body.style.backgroundImage = "url(assets/descanso.png)";
    containerTimerFoco.style.display = "none";
    circulo.style.animation = "none";
    circulo.style.animation = "pulse 12s 25";
    containerTimerDescanso.style.display = "flex";
    alert(
      "Pomodoro completo! Agora aperte o botão para saber o exercício que fará por 5 minutos."
    ); // Exibe uma mensagem informando que o Pomodoro foi completado
  }
}
