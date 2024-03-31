//Mapeando HTML
const botaoIniciar = document.getElementById("botao-iniciar");
const containerTimerFoco = document.getElementById("containerTimerFoco");
const botaoStop = document.getElementById("botao-stop");
const containerTimerDescanso = document.getElementById(
  "containerTimerDescanso"
);
const botaoConcluido = document.getElementById("botao-concluido");
const circulo = document.getElementById("circulo");
const body = document.getElementById("body");
const botaoPausar = document.getElementsByClassName("botao-pausar");
const botaoRetomar = document.getElementsByClassName("botao-retomar");
const timerDisplay = document.getElementById("timerDisplay");
const botaoAvancar = document.getElementsByClassName("botao-avancar");
const containerAlongamentoConcluido = document.getElementById(
  "container-alongamento-concluido"
);
const botaoAlongarSe = document.getElementById("botao-alongar");

let timer; // Variável para armazenar o identificador do setInterval
let timerRunning = false; // Variável para controlar se o timer está em execução
let milliseconds = 0; // Variável para armazenar os milissegundos
let exerciseTimer;
let exerciseTimeLeft = 300; // 5 minutes

function startTimer() {
  if (!timerRunning) {
    timerRunning = true; // Ativa o timer
    timer = setInterval(updateTimer, 10); // Inicia o intervalo de atualização do timer a cada 10 milissegundos
    botaoIniciar.style.display = "none";
    containerTimerFoco.style.display = "flex";
    botaoRetomar[0].style.display = "none";
    botaoStop.style.display = "none";
    botaoPausar[0].style.display = "block";
    circulo.style.animation = "grow 10s forwards";
  }
}

function pauseTimer(local) {
  clearInterval(timer); // Para o intervalo do timer
  timerRunning = false; // Desativa o timer
  circulo.style.animationPlayState = "paused";

  const div = local;
  if (div.id === "containerTimerFoco") {
    botaoStop.style.display = "block";
    botaoRetomar[0].style.display = "block";
    botaoAvancar[0].style.display = "none";
    botaoPausar[0].style.display = "none";
  }
  if (div.id === "containerTimerDescanso") {
    botaoPausar[1].style.display = "none";
    botaoAvancar[1].style.display = "block";
    botaoAlongarSe.style.display = "none";
    botaoRetomar[1].style.display = "block";
  }
}

function avancar(local) {
  const div = local;
  if (div.id === "containerTimerFoco") {
    clearInterval(timer); // Para o intervalo do timer
    timerRunning = false; // Desativa o timer
    milliseconds = 0; // Reseta os milissegundos
    TelaDescanso();
  }

  if (div.id === "containerTimerDescanso") {
    clearInterval(timer); // Para o intervalo do timer
    timerRunning = false; // Desativa o timer
    milliseconds = 0; // Reseta os milissegundos
    containerTimerDescanso.style.display = "none";
    botaoIniciar.style.display = "block";
    circulo.style.animation = "none";
    body.style.backgroundImage = "url(assets/foco.png)";
    botaoRetomar[1].style.display = "none";
    botaoAvancar[1].style.display = "none";
    containerAlongamentoConcluido.style.display = "none";
    botaoPausar[1].style.display = "block";
    botaoAlongarSe.style.display = "block";
  }
}

function interromperTimer() {
  clearInterval(timer); // Para o intervalo do timer
  timerRunning = false; // Desativa o timer
  milliseconds = 0; // Reseta os milissegundos
  containerTimerFoco.style.display = "none";
  botaoIniciar.style.display = "block";
  circulo.style.animation = "none";
}

function retomarTimer(local) {
  timerRunning = true; // Ativa o timer
  timer = setInterval(updateTimer, 10); // Inicia o intervalo de atualização do timer a cada 10 milissegundos
  circulo.style.animationPlayState = "running";

  const div = local;
  if (div.id === "containerTimerFoco") {
    botaoPausar[0].style.display = "block";
    botaoRetomar[0].style.display = "none";
    botaoStop.style.display = "none";
    botaoAvancar[0].style.display = "block";
  }
  if (div.id === "containerTimerDescanso") {
    botaoPausar[1].style.display = "block";
    botaoAvancar[1].style.display = "none";
    botaoRetomar[1].style.display = "none";

    if (containerAlongamentoConcluido.style.display !== "flex") {
      botaoAlongarSe.style.display = "block";
    }
  }
}

function updateTimer() {
  milliseconds++; // Incrementa os milissegundos
  const displayElement = document.querySelector(".timerDisplay"); // Seleciona o elemento que exibe o timer

  const minutes = Math.floor((milliseconds / 6000) % 60); // Calcula os minutos
  const seconds = Math.floor((milliseconds / 100) % 60); // Calcula os segundos
  const milisecs = milliseconds % 100; // Calcula os milissegundos

  displayElement.textContent = `${(minutes < 10 ? "0" : "") + minutes}:${
    (seconds < 10 ? "0" : "") + seconds
  }`; // Atualiza o display com o tempo formatado
  // .${(milisecs < 10 ? "00" : milisecs < 100 ? "0" : "") + milisecs} Supressão da apresentação do milissegundos

  // (minutes === 25 && seconds === 0 && milisecs === 0)  esse seria o código normal caso não precisa-se fazer o teste com 10 segundos

  if (minutes === 0 && seconds === 10 && milisecs === 0) {
    TelaDescanso();

    // alert(
    //   "Pomodoro completo! Agora aperte o botão para saber o exercício que fará por 5 minutos."
    // ); // Exibe uma mensagem informando que o Pomodoro foi completado
  }
}

//Apresenta a tela de descanso
function TelaDescanso() {
  body.style.backgroundImage = "url(assets/descanso.png)";
  containerTimerFoco.style.display = "none";
  circulo.style.animation = "none";
  circulo.style.animation = "pulse 12s 25";
  containerTimerDescanso.style.display = "flex";
}

// Essa função é assíncrona e faz o fetch de exercícios para então mostrar o nome do alongamento e começar o timer do exercício
async function alongarSe() {
  await GetExercise();
  botaoAlongarSe.style.display = "none";
  containerAlongamentoConcluido.style.display = "flex";
  await exibirAlongamento();
  startExerciseTimer();
}

// Inicia o timer de exercício e atualiza a cada 1 segundo
function startExerciseTimer() {
  exerciseTimer = setInterval(updateExerciseTimer, 1000);
}

// A função de mudar o tempo mostrado no HTML que para quando o tempo restante chega ao valor desejado dentro do If
function updateExerciseTimer() {
  const minutes = Math.floor(exerciseTimeLeft / 60);
  const seconds = exerciseTimeLeft % 60;

  const timerDisplay = document.getElementById("exerciseTimerDisplay");
  timerDisplay.textContent = `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;

  // (exerciseTimeLeft === 0) seria o tempo exato mas 290 e para poder fazer o teste
  if (exerciseTimeLeft === 290) {
    stopExerciseTimer();
    botaoConcluido.style.display = "block";
  }
  exerciseTimeLeft--;
}

// Para o timer e mostra o botão para resumir o timer
function stopExerciseTimer() {
  clearInterval(exerciseTimer);
  botaoRetomar[1].style.display = "block";
}

// Resume o timer e apaga o botão para resumir o timer
function resumeExerciseTimer() {
  startExerciseTimer();
  botaoRetomar[1].style.display = "none";
}

// Conclui o alongamento assim resetando o timer de exercício e voltando para a tela inicial da aplicação
function concluir() {
  const timerDisplay = document.getElementById("exerciseTimerDisplay");
  timerDisplay.textContent = `05:00`;
  exerciseTimeLeft == 300;
  containerAlongamentoConcluido.style.display = "none";
  botaoAlongarSe.style.display = "block";
  containerTimerDescanso.style.display = "none";
  interromperTimer();
}
