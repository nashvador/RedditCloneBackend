import express from "express";
import {connectionToDatabase } from "./util/db";
import {PORT} from "./util/config";
import {welcomeRouter} from "./controllers/welcomeRouter";
import { userRouter } from "./controllers/userRouter";
import { loginRouter } from "./controllers/loginRouter";
import { postRouter } from "./controllers/postRouter";
import { commentRouter } from "./controllers/commentRouter";
import { savedRouter } from "./controllers/savedRouter";
import { likeRouter } from "./controllers/likeRouter";
import { errorHandler, requestLogger, tokenExtractor, unknownEndpoint, userExtractor } from "./util/middleware";
import cors from 'cors';

const app = express();

app.use(cors())
app.use(express.json());

app.use(requestLogger);
app.use(tokenExtractor);
app.use(userExtractor);

app.use("/", welcomeRouter)
app.use("/api/users", userRouter)
app.use("/api/login", loginRouter)
app.use("/api/post", postRouter)
app.use("/api/comment", commentRouter)
app.use("/api/saved", savedRouter)
app.use("/api/like", likeRouter)

app.use(unknownEndpoint)
app.use(errorHandler)


const start = async () => {
    await connectionToDatabase();
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  };
  
  start();