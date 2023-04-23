from fastapi import FastAPI, WebSocket
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles

app = FastAPI()
app.mount("/static", StaticFiles(directory="static"), name="static")

html = """
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Single Page App (Vanilla JS)</title>
    <link rel="stylesheet" href="/static/static/css/index.css">
</head>
<body>
    <nav class="nav">
        <a href="/" class="nav__link" data-link>Dashboard</a>
        <a href="/posts" class="nav__link" data-link>Posts</a>
        <a href="/settings" class="nav__link" data-link>Settings</a>
        <a href="/game1" class="nav__link" data-link>Game 1</a>
        <a href="/game2" class="nav__link" data-link>Game 2</a>
        <a href="/game3" class="nav__link" data-link>Game 3</a>
    </nav>
    <div id="app"></div>
    <script type="module" src="/static/static/js/index.js"></script>
</body>
</html>
"""

@app.get("/", response_class=HTMLResponse)
async def get():
    return HTMLResponse(content=html, media_type="text/html")

'''
@app.get("/")
async def get():
    return HTMLResponse(html)
'''


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

@app.websocket("/ws/buttons")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    connections["buttons"] = websocket
    print("buttons are connected")
    while True:
        data = await websocket.receive_text()
        await connections["buttonsWS"].send_text(f"{data}")

@app.websocket("/ws/qr")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    connections["qr"] = websocket
    print("qr reader are connected")
    while True:
        data = await websocket.receive_text()
        await connections["qrWS"].send_text(f"{data}")

@app.websocket("/ws/arduino")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    connections["arduino"] = websocket
    print("arduino reader are connected")
    while True:
        data = await websocket.receive_text()
        await connections["arduinoWS"].send_text(f"{data}")

@app.websocket("/ws/qrWS")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    connections["qrWS"] = websocket
    print("qrWS is connected")
    while True:
        data = await websocket.receive_text()
        await connections["qrWS"].send_text(f"Message from arduino: {data}")

@app.websocket("/ws/arduinoWS")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    connections["arduinoWS"] = websocket
    print("arduinoWS is connected")
    while True:
        data = await websocket.receive_text()
        await connections["arduinoWS"].send_text(f"Message from arduino: {data}")

@app.websocket("/ws/buttonsWS")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    connections["buttonsWS"] = websocket
    print("buttonsWS is connected")
    while True:
        data = await websocket.receive_text()
        await connections["buttonsWS"].send_text(f"Message from buttons: {data}")
