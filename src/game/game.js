export class Game {
    constructor() {
        this.stateManager = {}
        this.commandsManager = {}
    }

    onPayload(payload) {
        console.log(payload);
        // this.commandsManager.handle(payload);
    }

    start() {
        // this.stateManager.start();
    }
}