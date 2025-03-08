import { CommandManager } from "./command-manager.js";
import { StateManager } from "./state-manager.js";

export class Game {
    constructor(server) {
        this.server = server;
        this.commandManager = new CommandManager();
        this.stateManager = new StateManager(this.commandManager);
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