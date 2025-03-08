import { Player } from "./player.js";

export class StateManager {
    constructor(commandManager)  {
        this.commandManager = commandManager;
        this.players = {};
        this.commands = [];
    }

    start(server) {
        this.tick();
        server.emit('state', Object.values(this.players));
        setTimeout(() => this.start(server), 1000);
    }

    tick() {
        this.commands = this.commandManager.getCommands();

        this.commands.forEach(command => {
            const player = this.players[command.playerId];
            command.execute(player, players);
        });

        for (const playerId in this.players) {
            const player = this.players[playerId];
            player.tick(players);
        }
    }

    addPlayer(lat, long, humanDesign) {
        const playerId = new Date().toISOString() + Math.random() + Math.random();

        this.players[playerId] = new Player(
            playerId,
            lat,
            long,
            humanDesign
        );

        return this.players[playerId];
    }
}