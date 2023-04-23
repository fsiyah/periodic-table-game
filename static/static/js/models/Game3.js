//BURDAN SONRASI WEB SOCKETLER  
var elementID = 999
var pluggedElementID = 999
var hintCount = 1
var MAX_HINT_COUNT = 5

var isButtonsActive = false
var infoCount = 1
var MAX_INFO_COUNT = 5
      
function qrWS(event) {
    elementID = event.data
    var string = String(event.data)
    var video = document.getElementById("myVideo");  
    video.src = "static/"+string+".mp4"; 
    video.load(); 

    isButtonsActive = true
    var image = document.getElementById("infoImage");   
    image.src = "static/infos/"+String(elementID)+"-"+String(infoCount)+".png";
};

function arduinoWS(event) {
    console.log("Do nothing, we are in game 3 !")
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


export default { arduinoWS, qrWS, buttonsWS }

