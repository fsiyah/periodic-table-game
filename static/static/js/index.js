import Dashboard from "./views/Dashboard.js";
import Settings from "./views/Settings.js";
import Game1 from "./views/Game1.js";
import Game2 from "./views/Game2.js";
import Game3 from "./views/Game3.js";
import Game1Model from "./models/Game1.js";
import Game2Model from "./models/Game2.js";
import Game3Model from "./models/Game3.js";

var GAME_MODE = 1 

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

var wsQr = new WebSocket("ws://localhost:8000/ws/qrWS");
wsQr.onmessage = function(event) {
    if(GAME_MODE == 1) 
    {
        Game1Model.qrWS(event)
    }
    else if(GAME_MODE == 2) 
    { 
        Game2Model.qrWS(event) 
    }  
    else if(GAME_MODE == 3) 
    {
        Game3Model.qrWS(event)
    } 
};

var wsArduino = new WebSocket("ws://localhost:8000/ws/arduinoWS");
wsArduino.onmessage = function(event) {
    if(GAME_MODE == 1) 
    {
        Game1Model.arduinoWS(event)
    }
    else if(GAME_MODE == 2) 
    { 
        Game2Model.arduinoWS(event) 
    }  
    else if(GAME_MODE == 3) 
    {
        Game3Model.arduinoWS(event)
    }          
};

var wsButtons = new WebSocket("ws://localhost:8000/ws/buttonsWS");
wsButtons.onmessage = function(event) {   
    if(String(event.data)=="ok")
    {                 
        if(GAME_MODE == 1) 
        {
            navigateTo("/game2");
            router()
            GAME_MODE = 2 
            console.log("A GAME_MODE: " + GAME_MODE)
        }
        else if(GAME_MODE == 2) 
        { 
            navigateTo("/game3");
            router()
            GAME_MODE = 3 
            console.log("B GAME_MODE: " + GAME_MODE)
        }  
        else if(GAME_MODE == 3) 
        {
            navigateTo("/game1");
            router()
            GAME_MODE = 1 
            console.log("C GAME_MODE: " + GAME_MODE)
        }          
    }
    else
    {
        if(GAME_MODE == 1) 
        {
            Game1Model.buttonsWS(event)
        }
        else if(GAME_MODE == 2) 
        { 
            Game2Model.buttonsWS(event) 
        }  
        else if(GAME_MODE == 3) 
        {
            Game3Model.buttonsWS(event)
        }   
    }       
};