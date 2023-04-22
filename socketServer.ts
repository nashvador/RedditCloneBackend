import { Server, Socket } from "socket.io";
import { Server as HttpServer } from "http";
import jwt, { JwtPayload } from "jsonwebtoken";

interface userSocketInterface extends Socket {
  userId?: number | string;
}

const authMiddleware = (socket: userSocketInterface, next: Function) => {
  const token = socket.handshake.auth.token;

  if (!token) {
    return next(new Error("Authentication error: Missing token"));
  }
  const decodedToken = jwt.verify(token, process.env.SECRET!) as JwtPayload;

  if (!decodedToken) {
    return next(new Error("Authentication error: Invalid token"));
  }

  const userId = decodedToken.id;

  socket.userId = userId;

  next();
};

const socketServer = (server: HttpServer): void => {
  const io: Server = new Server(server, {
    cors: {
      origin: "*",
    },
  });

  io.use(authMiddleware);

  io.on("connection", (socket: userSocketInterface) => {
    console.log(`User ${socket.userId} connected`);

    socket.on("disconnect", () => {
      console.log(`User ${socket.userId} disconnected`);
    });

    socket.on("message", function (data) {
      console.log(data);
    });
  });
};

export default socketServer;
