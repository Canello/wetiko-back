export class Game {
    constructor() {
        this.commandManager = {}
        this.stateManager = {}
    }

    onPayload(payload) {
        console.log(payload);
        // this.commandManager.handlePayload(payload);
    }

    start() {
        // this.stateManager.start();
    }
}