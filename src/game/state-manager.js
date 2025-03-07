export class StateManager {
    constructor(commandManager)  {
        this.commandManager = commandManager;
        this.players = {};
        this.commands = [];
    }

    tick() {
        this.commands = this.commandManager.getCommands();
        this.commands.forEach(command => {
            const player = this.players[command.playerId];
            command.execute(player);
        });
    }
}