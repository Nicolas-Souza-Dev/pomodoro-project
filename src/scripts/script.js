let timer;
let timerRunning = false;
let milliseconds = 0;

function startTimer() {
    if (!timerRunning) {
        timerRunning = true;
        timer = setInterval(updateTimer, 10);
        document.getElementById('startBtn').style.display = 'none';
        document.getElementById('stopBtn').style.display = 'inline-block';
        document.getElementById('resetBtn').style.display = 'none';
    }
}

function stopTimer() {
    clearInterval(timer);
    timerRunning = false;
    document.getElementById('startBtn').style.display = 'inline-block';
    document.getElementById('stopBtn').style.display = 'none';
    document.getElementById('resetBtn').style.display = 'inline-block';
}

function resetTimer() {
    clearInterval(timer);
    timerRunning = false;
    milliseconds = 0;
    document.querySelector('.timer-display').textContent = '00:00.000';
    document.getElementById('startBtn').style.display = 'inline-block';
    document.getElementById('stopBtn').style.display = 'none';
    document.getElementById('resetBtn').style.display = 'none';
}

function updateTimer() {
    milliseconds++;
    const displayElement = document.querySelector('.timer-display');
    const minutes = Math.floor((milliseconds / 6000) % 60);
    const seconds = Math.floor((milliseconds / 100) % 60);
    const milisecs = milliseconds % 100;
    displayElement.textContent = `${(minutes < 10 ? '0' : '') + minutes}:${(seconds < 10 ? '0' : '') + seconds}.${(milisecs < 10 ? '00' : milisecs < 100 ? '0' : '') + milisecs}`;
}
