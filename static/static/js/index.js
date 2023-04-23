import Dashboard from "./views/Dashboard.js";
import Posts from "./views/Posts.js";
import PostView from "./views/PostView.js";
import Settings from "./views/Settings.js";
import Game1 from "./views/Game1.js";
import Game2 from "./views/Game2.js";
import Game3 from "./views/Game3.js";

const pathToRegex = path => new RegExp("^" + path.replace(/\//g, "\\/").replace(/:\w+/g, "(.+)") + "$");

const getParams = match => {
    const values = match.result.slice(1);
    const keys = Array.from(match.route.path.matchAll(/:(\w+)/g)).map(result => result[1]);

    return Object.fromEntries(keys.map((key, i) => {
        return [key, values[i]];
    }));
};

const navigateTo = url => {
    history.pushState(null, null, url);
    router();
};

const router = async () => {
    const routes = [
        { path: "/", view: Dashboard },
        { path: "/posts", view: Posts },
        { path: "/posts/:id", view: PostView },
        { path: "/settings", view: Settings },
        { path: "/game1", view: Game1 },
        { path: "/game2", view: Game2 },
        { path: "/game3", view: Game3 }
    ];

    // Test each route for potential match
    const potentialMatches = routes.map(route => {
        return {
            route: route,
            result: location.pathname.match(pathToRegex(route.path))
        };
    });

    let match = potentialMatches.find(potentialMatch => potentialMatch.result !== null);

    if (!match) {
        match = {
            route: routes[0],
            result: [location.pathname]
        };
    }

    const view = new match.route.view(getParams(match));

    document.querySelector("#app").innerHTML = await view.getHtml();
};

window.addEventListener("popstate", router);

document.addEventListener("DOMContentLoaded", () => {
    document.body.addEventListener("click", e => {
        if (e.target.matches("[data-link]")) {
            e.preventDefault();
            navigateTo(e.target.href);
        }
    });

    router();
});

//BURDAN SONRASI WEB SOCKETLER  
var elementID = 999
var pluggedElementID = 999
var hintCount = 1
var MAX_HINT_COUNT = 5

var isButtonsActive = false
var infoCount = 1
var MAX_INFO_COUNT = 5

var gameMode = 1

var wsQr = new WebSocket("ws://localhost:8000/ws/qrWS");
wsQr.onmessage = function(event) {
    elementID = event.data
    var string = String(event.data)
    console.log("QR" + string)
    var video = document.getElementById("myVideo");  
    video.src = "static/"+string+".mp4"; 
    video.load(); 

    //Reset states
    document.getElementById("hintImage").src = "";
    document.getElementById("infoImage").src = "";
    hintCount = 1
    infoCount = 1
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
    else if(isButtonsActive && string=="forward" && infoCount<MAX_INFO_COUNT)
    {                    
        infoCount = infoCount+1 
    }
    else if(string=="ok" && gameMode<MAX_INFO_COUNT)
    {                 
        if(gameMode == 1) 
        {
            navigateTo("/game2");
            router()
            gameMode = gameMode+1 
        }
        else if(gameMode == 2) 
        { 
            navigateTo("/game3");
            router()
            gameMode = gameMode+1 
        }  
        else if(gameMode == 3) 
        {
            navigateTo("/game1");
            router()
            gameMode = 1 
        }  
        
    }
    else
    {
        console.log("Something went wrong: Buttons web socket")
    }
    var image = document.getElementById("infoImage");   
    image.src = "static/infos/"+String(elementID)+"-"+String(infoCount)+".png";
};