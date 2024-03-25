//Mapeando HTML
const botaoIniciar = document.getElementById("botao-iniciar")
const containerTimerFoco = document.getElementById("containerTimerFoco")
const botaoStop = document.getElementById("botao-stop")
const containerTimerDescanso = document.getElementById("containerTimerDescanso")
const botaoConcluido = document.getElementById("botao-concluido")
const circulo = document.getElementById("circulo")
const body = document.getElementById("body")
const botaoPausar = document.getElementsByClassName("botao-pausar")
const botaoRetomar = document.getElementsByClassName("botao-retomar")
const timerDisplay = document.getElementById("timerDisplay")
const botaoAvancar = document.getElementsByClassName("botao-avancar")
const containerAlongamentoConcluido = document.getElementById("container-alongamento-concluido")
const botaoAlongarSe = document.getElementById("botao-alongar")



let timer; // Variável para armazenar o identificador do setInterval
let timerRunning = false; // Variável para controlar se o timer está em execução
let milliseconds = 0; // Variável para armazenar os milissegundos




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
  circulo.style.animationPlayState = 'paused';

  const div = local;
  if (div.id === "containerTimerFoco") {
    botaoStop.style.display = 'block';
    botaoRetomar[0].style.display = 'block';
    botaoAvancar[0].style.display ='none';
    botaoPausar[0].style.display = 'none';    
  }
  if (div.id === "containerTimerDescanso") {
    botaoPausar[1].style.display = 'none';
    botaoAvancar[1].style.display ='block';
    botaoAlongarSe.style.display ='none';
    botaoRetomar[1].style.display = 'block';
  }
}


function avancar(local) {
  const div = local;
  if (div.id === "containerTimerFoco") {
    clearInterval(timer); // Para o intervalo do timer
    timerRunning = false; // Desativa o timer
    milliseconds = 0; // Reseta os milissegundos
    TelaDescanso()
  }

  if (div.id === "containerTimerDescanso") {
    clearInterval(timer); // Para o intervalo do timer
    timerRunning = false; // Desativa o timer
    milliseconds = 0; // Reseta os milissegundos
    containerTimerDescanso.style.display = 'none';
    botaoIniciar.style.display = 'block';
    circulo.style.animation = "none";
    body.style.backgroundImage = "url(assets/foco.png)";
    botaoRetomar[1].style.display = 'none';
    botaoAvancar[1].style.display = 'none';
    containerAlongamentoConcluido.style.display ='none';
    botaoPausar[1].style.display='block';
    botaoAlongarSe.style.display='block';
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
  circulo.style.animationPlayState = 'running';

  const div = local;
  if (div.id === "containerTimerFoco") {
    botaoPausar[0].style.display = 'block';
    botaoRetomar[0].style.display = 'none';
    botaoStop.style.display = 'none';
    botaoAvancar[0].style.display = 'block';  
  }
  if (div.id === "containerTimerDescanso") {
    botaoPausar[1].style.display = 'block';
    botaoAvancar[1].style.display = 'none';
    botaoRetomar[1].style.display = 'none';
    
    if (containerAlongamentoConcluido.style.display !== 'flex') {
      botaoAlongarSe.style.display = 'block'
    }
  }
}



function updateTimer() {
  milliseconds++; // Incrementa os milissegundos
  const displayElement = document.querySelector(".timerDisplay"); // Seleciona o elemento que exibe o timer
  const minutes = Math.floor((milliseconds / 6000) % 60); // Calcula os minutos
  const seconds = Math.floor((milliseconds / 100) % 60); // Calcula os segundos
  const milisecs = milliseconds % 100; // Calcula os milissegundos
  displayElement.textContent = `${(minutes < 10 ? "0" : "") + minutes}:${(seconds < 10 ? "0" : "") + seconds
    }`; // Atualiza o display com o tempo formatado
  // .${(milisecs < 10 ? "00" : milisecs < 100 ? "0" : "") + milisecs} Supressão da apresentação do milissegundos 

  if (minutes === 25 && seconds === 0 && milisecs === 0) {

    TelaDescanso()

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




function alongarSe() {
  //chama a função que altera o html -----> GetExercise
  botaoAlongarSe.style.display = 'none';
  containerAlongamentoConcluido.style.display = 'flex';  
}



function concluir() {
  containerAlongamentoConcluido.style.display = 'none';
  botaoAlongarSe.style.display = 'block'; 
}
