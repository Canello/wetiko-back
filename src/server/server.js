import express from 'express';
import http from 'http';
import { Server as SocketIo } from 'socket.io';

export class Server {
    constructor(game) {
        this.app = express();
        this.server = http.createServer(this.app);
        this.io = new SocketIo(this.server);
        this.game = game;
    }

    setupEvents() {
        this.io.on('connection', (socket) => {
            console.log('User connected');

            socket.on('disconnect', () => {
                console.log('User disconnected');
            });

            socket.on('player', (playerInfo) => {
                console.log('Player created');
                console.log(playerInfo);
                this.game.addPlayer(playerInfo);
            });

            socket.on('payload', (payload) => {
                console.log('Payload received');
                console.log(payload);
                this.game.onPayload(payload);
            });
        });
    }

    emit(event, data) {
        this.io.emit(event, data);
    }

    start(port) {
        const PORT = port || process.env.PORT || 3000;
        this.server.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    }
}