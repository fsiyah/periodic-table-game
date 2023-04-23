import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("Game2");
    }

    async getHtml() {
        return `
            <h1>Game2</h1>
        `;
    }
}