import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("Game3");
    }

    async getHtml() {
        return `
            <h1>Game3</h1>
        `;
    }
}