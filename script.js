const timeDisplay = document.querySelector(".head-1" );
const startBtn = document.querySelector(".Start-button" );
const lapBtn = document.querySelector(".lap-button" );
const lapTable = document.getElementById("lap-table" );
const lapList = document.getElementById("lap-list" );


let startTime = 0;
let elapsedTime =0;
let timerInterval ;
let isRunning = false ;


function startTimer(){

startTime = Date.now() - elapsedTime;
timerInterval = setInterval(() => {
elapsedTime = Date.now() - startTime;
timeDisplay.textContent = formatTime(elapsedTime);
},10);

isRunning=true;
startBtn.textContent ="Stop"
startBtn.style.backgroundColor = "#ff4d4d"
lapBtn.disabled = false;
}

function stopTimer(){
    clearInterval(timerInterval);
    isRunning= false;
    startBtn.textContent="Start";
    startBtn.style.backgroundColor = "#5464f1";
}



startBtn.addEventListener("click" , () =>{

    if(!isRunning){
        startTimer();

    }else{
        stopTimer();
    }
});



function formatTime(){
    const minutes = Math.floor((time / 6000) % 60);
    const seconds = Math.floor((time/1000) & 60);
    const miliseconds = Math.floor((time %1000) /10 )

    return `${String(minutes).padStart(2,"0")}:${String(seconds).padStart(2,"0")}:${String(miliseconds),padStart(2,"0")}`;

}



