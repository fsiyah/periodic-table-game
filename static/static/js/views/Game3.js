import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("Game3");
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
        `;
    }
}