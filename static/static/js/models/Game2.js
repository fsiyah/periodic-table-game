//BURDAN SONRASI WEB SOCKETLER  
var elementID = 999
var pluggedElementID = 999
var hintCount = 1
var MAX_HINT_COUNT = 5

var isButtonsActive = false
var infoCount = 1
var MAX_INFO_COUNT = 5

var currentPlayer = "teamOne"

var teamOneScore = 0
var teamTwoScore = 0

var teamOneRoundTime = 0
var teamTwoRoundTime = 0

var isRoundEnded = false
var roundCounter = 0

let timer = document.getElementById("timer");
let startBtn = document.getElementById("start-btn");
let stopBtn = document.getElementById("stop-btn");
let resetBtn = document.getElementById("reset-btn");
let startTime;
let elapsedTime = 0;
let timerInterval;

      
function qrWS(event) {
    elementID = event.data
    var string = String(event.data)
    var video = document.getElementById("myVideo");  
    video.src = "static/"+string+".mp4"; 
    video.load(); 
    if(currentPlayer == "teamTwo")
    {
        updateCurrentPlayer("teamTwo")
    }
    else
    {
        updateCurrentPlayer("teamOne")
    }
    resetTimer()
    startTimer()

    //Reset states
    document.getElementById("hintImage").src = "";
    document.getElementById("infoImage").src = "";
    hintCount = 1
    infoCount = 1
};

function arduinoWS(event) {
    pluggedElementID = event.data
    var string = String(event.data)
    console.log("ARDUINO: " + string)
    if(elementID != pluggedElementID && hintCount<=MAX_HINT_COUNT)
    {
        var image = document.getElementById("hintImage");   
        image.src = "static/hints/"+String(elementID)+"-"+String(hintCount)+".png";
        hintCount = hintCount+1 
        
    }
    else if(hintCount>MAX_HINT_COUNT)
    {
        console.log("Doğru cevap bu idi")
        isButtonsActive = true
        var image = document.getElementById("infoImage");   
        image.src = "static/infos/"+String(elementID)+"-"+String(infoCount)+".png";
        stopTimer()
        if(currentPlayer == "teamTwo")
        {
            teamTwoRoundTime = Date.now() - startTime
            updateTeamTime(2, teamTwoRoundTime)
            currentPlayer = "teamOne"
            resetTimer()
        }
        else
        {
            teamOneRoundTime = Date.now() - startTime
            updateTeamTime(1, teamOneRoundTime)
            currentPlayer = "teamTwo"
            resetTimer()
        }
        roundCounter = roundCounter+1
        if(roundCounter == 2) {isRoundEnded=true}
        if(isRoundEnded)
        {
            if(teamOneRoundTime<teamTwoRoundTime)
            {
                increaseScore(1)
            }
            else if(teamOneRoundTime>teamTwoRoundTime)
            {
                increaseScore(2)
            }
            roundCounter = 0
        }
    }
    else if(elementID == pluggedElementID)
    {
        console.log("Doğru Bildin")
        isButtonsActive = true
        var image = document.getElementById("infoImage");   
        image.src = "static/infos/"+String(elementID)+"-"+String(infoCount)+".png";
        stopTimer()
        if(currentPlayer == "teamTwo")
        {
            teamTwoRoundTime = Date.now() - startTime
            updateTeamTime(2, teamTwoRoundTime)
            currentPlayer = "teamOne"
            resetTimer()
        }
        else
        {
            teamOneRoundTime = Date.now() - startTime
            updateTeamTime(1, teamOneRoundTime)
            currentPlayer = "teamTwo"
            resetTimer()
        }
        roundCounter = roundCounter+1
        if(roundCounter == 2) {isRoundEnded=true}
        if(isRoundEnded)
        {
            if(teamOneRoundTime<teamTwoRoundTime)
            {
                increaseScore(1)
            }
            else if(teamOneRoundTime>teamTwoRoundTime)
            {
                increaseScore(2)
            }
            roundCounter = 0
        }
    }
    else
    {
        console.log("Something went wrong: Arduino web socket")
    }
};

function buttonsWS(event) {
    var string = String(event.data)
    console.log("BUTTONS: " + string)
    if(isButtonsActive && string=="back" && infoCount>1)
    {
        infoCount = infoCount-1 

        var image = document.getElementById("infoImage");   
        image.src = "static/infos/"+String(elementID)+"-"+String(infoCount)+".png";
    }
    else if(isButtonsActive && string=="forward" && infoCount<MAX_INFO_COUNT)
    {                    
        infoCount = infoCount+1 

        var image = document.getElementById("infoImage");   
        image.src = "static/infos/"+String(elementID)+"-"+String(infoCount)+".png";
    }
    else if(string=="ok")
    {
        //pass
    }
    else
    {
        console.log("Something went wrong: Buttons web socket")
    }    
};

function startTimer() {
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(updateTimer, 10);
    document.getElementById("start-btn").disabled = true;
    document.getElementById("stop-btn").disabled = false;
}

function stopTimer() {
clearInterval(timerInterval);
document.getElementById("start-btn").disabled = false;
document.getElementById("stop-btn").disabled = true;
}

function resetTimer() {
clearInterval(timerInterval);
elapsedTime = 0;
document.getElementById("timer").innerHTML = "00:00:00";
document.getElementById("start-btn").disabled = false;
document.getElementById("stop-btn").disabled = true;
}

function updateTimer() {
elapsedTime = Date.now() - startTime;
let minutes = Math.floor(elapsedTime / 60000);
let seconds = Math.floor((elapsedTime % 60000) / 1000);
let milliseconds = elapsedTime % 1000;
document.getElementById("timer").innerHTML =
    (minutes < 10 ? "0" + minutes : minutes) +
    ":" +
    (seconds < 10 ? "0" + seconds : seconds) +
    ":" +
    (milliseconds < 100 ? "0" : "") +
    (milliseconds < 10 ? "0" : "") +
    milliseconds;
}

//document.getElementById("start-btn").addEventListener("click", startTimer);
//document.getElementById("stop-btn").addEventListener("click", stopTimer);
//document.getElementById("reset-btn").addEventListener("click", resetTimer);

function increaseScore(team) {
let score = document.getElementById("team" + team + "-score");
score.innerHTML = parseInt(score.innerHTML) + 1;
}

function decreaseScore(team) {
let score = document.getElementById("team" + team + "-score");
let newScore = parseInt(score.innerHTML) - 1;
if (newScore < 0) {
    newScore = 0;
}
score.innerHTML = newScore;
}

function updateTeamTime(team, time) {
console.log("team" + team + "-time"+"|"+time)
let score = document.getElementById("team" + team + "-time");
score.innerHTML = time;
}

function updateCurrentPlayer(team) {
let currentPlayer = document.getElementById("current-player");
currentPlayer.innerHTML = team;
}


export default { arduinoWS, qrWS, buttonsWS }

