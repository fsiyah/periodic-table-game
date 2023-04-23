import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("Game2");
    }

    async getHtml() {
        return `
            <h1>Game2</h1> 
            <table>
                <tr>
                    <td>Current Player: </td>
                    <td id="current-player">-</td>
                </tr>
            </table>        
            <table>
                <td>
                    <table>
                        <tr>
                            <h2>Scoreboard</h2>
                            <td>Bordo Team:</td>
                            <td id="team1-score">0</td>
                            <td>-</td>
                            <td>Mavi Team:</td>
                            <td id="team2-score">0</td>
                        </tr>
                        <tr>
                            <td>Time:</td>
                            <td id="team1-time">0</td>
                            <td>-</td>
                            <td>Time:</td>
                            <td id="team2-time">0</td>
                        </tr>
                    </table>
                </td>
                <td>
                    <table>
                        <tr>
                            <h2>Chronometer</h2>
                            <p id="timer">00:00:00</p>
                            <button id="start-btn">Start</button>
                            <button id="stop-btn">Stop</button>
                            <button id="reset-btn">Reset</button>
                        </tr>
                    </table>
                </td>
            </table>      

            <!--<video muted autoplay loop class="video video js-video" id="hero-vid">-->
            <video id="myVideo" width="320" height="240" autoplay muted loop>
                <source src="static/1.mp4" type="video/mp4">
            </video>
            <h1 id="descriptionText">Description</h1>
            <img id="hintImage" src="" alt="Hint Image" width="320" height="240">
            <img id="infoImage" src="" alt="Info Image" width="320" height="240">
        `;
    }
}