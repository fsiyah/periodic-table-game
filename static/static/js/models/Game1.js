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
    }
    else if(elementID == pluggedElementID)
    {
        console.log("Doğru Bildin")
        isButtonsActive = true
        var image = document.getElementById("infoImage");   
        image.src = "static/infos/"+String(elementID)+"-"+String(infoCount)+".png";
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


export default { arduinoWS, qrWS, buttonsWS }

