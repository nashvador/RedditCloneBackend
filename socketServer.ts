import { Server, Socket } from "socket.io";
import { Server as HttpServer } from "http";

const socketServer = (server: HttpServer): void => {
  const io: Server = new Server(server, {
    cors: {
      origin: "*",
    },
  });

  io.on("connection", (socket: Socket) => {
    console.log("a user connected");

    socket.on("disconnect", () => {
      console.log("user disconnected");
    });

    socket.on("message", function (data) {
      console.log(data);
    });
  });
};

export default socketServer;
