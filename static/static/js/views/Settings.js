import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("Settings");
    }

    async getHtml() {
        return `
            <h1>Settings</h1>
            <p>Burda butonların, arduinonun ve qrın web sokete bağlı olup olmadığını gösteren iconlar koyulabilir.</p>
        `;
    }
}