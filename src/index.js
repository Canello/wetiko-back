import { Game } from "./game/game.js";
import { Server } from "./server/server.js";

const server = new Server();
const game = new Game(server);
game.start();
server.start(3001);