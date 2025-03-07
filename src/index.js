import { Game } from "./game/game";
import { Server } from "./server/server";

const server = new Server();
const game = new Game(server);
game.start();
server.start(3001);