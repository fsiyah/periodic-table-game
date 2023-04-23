import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("Game1");
    }

    async getHtml() {
        return `
        <!--<video muted autoplay loop class="video video js-video" id="hero-vid">-->
        <video id="myVideo" width="320" height="240" autoplay muted loop>
            <source src="static/1.mp4" type="video/mp4">
        </video>
        <h1 id="descriptionText">Description</h1>
        <img id="hintImage" src="" alt="Hint Image" width="320" height="240">
        <img id="infoImage" src="" alt="Info Image" width="320" height="240">
        <h1>WebSocket Messages</h1>
        <form action="" onsubmit="sendMessage(event)">
            <input type="text" id="messageText" autocomplete="off"/>
            <button>Send</button>
        </form>
        <ul id='messages'>
        </ul>
        <script>
            var elementID = 999
            var pluggedElementID = 999
            var hintCount = 1
            var MAX_HINT_COUNT = 5

            var isButtonsActive = false
            var infoCount = 1
            var MAX_INFO_COUNT = 5

            var ws = new WebSocket("ws://localhost:8000/ws/home");
            ws.onmessage = function(event) {
                console.log("Message Received")
                var messages = document.getElementById('messages')
                var message = document.createElement('li')
                var content = document.createTextNode(event.data)
                console.log(content)
                message.appendChild(content)
                messages.appendChild(message)                
            };
            function sendMessage(event) {
                var input = document.getElementById("messageText")
                ws.send(input.value)
                input.value = ''
                event.preventDefault()
            }

            var wsQr = new WebSocket("ws://localhost:8000/ws/deneme");
            wsQr.onmessage = function(event) {
                elementID = event.data
                var string = String(event.data)
                console.log("QR" + string)
                var video = document.getElementById("myVideo");  
                video.src = "static/"+string+".mp4"; 
                video.load(); 
            };

            var wsArduino = new WebSocket("ws://localhost:8000/ws/arduinoWS");
            wsArduino.onmessage = function(event) {
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

            var wsButtons = new WebSocket("ws://localhost:8000/ws/buttonsWS");
            wsButtons.onmessage = function(event) {
                var string = String(event.data)
                console.log("BUTTONS: " + string)
                console.log("BUTTONS qrElement: " + elementID)
                console.log("BUTTONS arduinoElement: " + pluggedElementID)
                console.log("BUTTONS infoCount: " + infoCount)
                if(isButtonsActive && string=="back" && infoCount>1)
                {
                    infoCount = infoCount-1 
                }
                if(isButtonsActive && string=="forward" && infoCount<MAX_INFO_COUNT)
                {                    
                    infoCount = infoCount+1 
                }
                else
                {
                    console.log("Something went wrong: Buttons web socket")
                }
                var image = document.getElementById("infoImage");   
                image.src = "static/infos/"+String(elementID)+"-"+String(infoCount)+".png";
            };
        </script>
        `;
    }
}