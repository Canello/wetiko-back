export class CommandManager {
    constructor() {
        this.overwriteCommands = [];
        this.enqueueCommands = [];
    }

    getCommands() {
        return [...this.overwriteCommands, ...this.enqueueCommands];
    }

    handlePayload(payload) {
        const commands = payload.actions.map((action) => CommandFactory.create(payload.playerId, action));

        for (const command of commands) {
            const handleType = CommandFactory.getHandleType(command.type);

            if (handleType === 'OVERWRITE') {
                this.overwriteCommands.push(command);
            } else {
                this.enqueueCommands.push(command);
            }
        }
    }
}

class MoveCommand {
    constructor(playerId, data) {
        this.playerId = playerId;
        this.lat = data.lat;
        this.long = data.long;
    }

    execute(player) {
        player.lat = this.lat;
        player.long = this.long;
    }
}

class CommandFactory {
    static overwriteCommandTypes = new Set(['MOVE']);
    static commands = {
        'MOVE': MoveCommand
    }

    static create(playerId, action) {
        return new this.commands[action.type](playerId, action.data);
    }

    static getHandleType(type) {
        return CommandFactory.overwriteCommandTypes.has(type) ? 'OVERWRITE' : 'ENQUEUE';
    }
}