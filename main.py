from fastapi import FastAPI, WebSocket
from fastapi.responses import StreamingResponse, HTMLResponse

app = FastAPI()

async def fake_video_streamer():
    for i in range(10):
        yield b"some fake video bytes"

@app.get("/")
async def root():
    return {"message": "Hello World"}
    

#@app.get("/elements/{element_id}")
#async def read_item(element_id):
#    return {"element_id": element_id}

@app.get("/home/", response_class=HTMLResponse)
async def read_items():
    with open("index.html") as fh:
        data = fh.read()
    return HTMLResponse(content=data, media_type="text/html")

#@app.get("/elements/{element_id}")
#def main(element_id):
#    def iterfile(element_id):  # 
#        with open("./videos/"+str(element_id)+".mp4", mode="rb") as file_like:  # 
#            yield from file_like  # 
#
#    return StreamingResponse(iterfile(element_id), media_type="video/mp4")

import httpx
@app.get("/send")
async def receiveElementRequest():
    responseData = {"message": "Hello from backend!"}
    async with httpx.AsyncClient() as client:
        try:
            response = await client.post('http://localhost:8081/send_response', json=responseData)
            # Check for response status code and handle errors if needed
            response.raise_for_status()
        except httpx.HTTPError as e:
            return {"error": str(e)}

    return {"status": "Response sent to another port"}

@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    while True:
        data = await websocket.receive_text()
        await websocket.send_text(f"Message text was: {data}")