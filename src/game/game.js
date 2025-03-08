export class Game {
    constructor(server) {
        this.server = server;
        this.commandManager = {}
        this.stateManager = {}
    }

    addPlayer(playerInfo) {
        this.stateManager.addPlayer(playerInfo.lat, playerInfo.long, playerInfo.humanDesign);
    }

    onPayload(payload) {
        this.commandManager.handlePayload(payload.commands);
    }

    start() {
        this.stateManager.start(this.server);
    }
}