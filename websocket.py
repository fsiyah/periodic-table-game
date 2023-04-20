from fastapi import FastAPI, WebSocket
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles

app = FastAPI()
app.mount("/static", StaticFiles(directory="static"), name="static")

html = """
<!DOCTYPE html>
<html>
    <head>
        <title>Chat</title>
    </head>
    <body>
        <!--<video muted autoplay loop class="video video js-video" id="hero-vid">-->
        <video id="myVideo" width="320" height="240" autoplay muted loop>
            <source src="static/1.mp4" type="video/mp4">
        </video>
        <img id="hintImage" src="" alt="Girl in a jacket" width="320" height="240">
        <h1>WebSocket Chat</h1>
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
            };
        </script>
    </body>
</html>
"""


@app.get("/")
async def get():
    return HTMLResponse(html)


#connections = list()
#
#@app.websocket("/ws")
#async def websocket_endpoint(websocket: WebSocket):
#    await websocket.accept()
#    connections.append(websocket)
#    print(connections)
#    while True:
#        data = await websocket.receive_text()
#        print(data)
#        if(websocket == connections[1]):
#            await connections[0].send_text(f"Message text was: {data}")
#        else:
#            await websocket.send_text(f"Message text was: {data}")

connections = dict()

@app.websocket("/ws/home")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    connections["home"] = websocket
    print("home is connected")
    while True:
        data = await websocket.receive_text()
        await connections["home"].send_text(f"Message from home: {data}")

@app.websocket("/ws/home/{element_id}")
async def websocket_endpoint(element_id, websocket: WebSocket):
    await websocket.accept()
    connections["home"] = websocket
    print("home is connected")
    while True:
        data = await websocket.receive_text()
        await connections["home"].send_text(f"Message from home: {data}")

@app.websocket("/ws/buttons")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    connections["buttons"] = websocket
    print("buttons are connected")
    while True:
        data = await websocket.receive_text()
        await connections["home"].send_text(f"Message from buttons: {data}")

@app.websocket("/ws/qr")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    connections["qr"] = websocket
    print("qr reader are connected")
    while True:
        data = await websocket.receive_text()
        await connections["home"].send_text(f"Message from qr: {data}") 
        await connections["deneme"].send_text(f"{data}")

@app.websocket("/ws/arduino")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    connections["arduino"] = websocket
    print("arduino reader are connected")
    while True:
        data = await websocket.receive_text()
        await connections["home"].send_text(f"Message from arduino: {data}")
        await connections["arduinoWS"].send_text(f"{data}")

@app.websocket("/ws/deneme")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    connections["deneme"] = websocket
    print("deneme is connected")
    while True:
        data = await websocket.receive_text()
        await connections["deneme"].send_text(f"Message from arduino: {data}")

@app.websocket("/ws/arduinoWS")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    connections["arduinoWS"] = websocket
    print("arduinoWS is connected")
    while True:
        data = await websocket.receive_text()
        await connections["arduinoWS"].send_text(f"Message from arduino: {data}")
