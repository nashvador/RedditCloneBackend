import express from "express";
import {connectionToDatabase } from "./util/db";
import {PORT} from "./util/config";
import {testRouter} from "./controllers/test";
import { userRouter } from "./controllers/userRouter";
import { loginRouter } from "./controllers/loginRouter";
import { errorHandler, requestLogger, unknownEndpoint } from "./util/middleware";
import cors from 'cors';

const app = express();

app.use(cors())
app.use(express.json());

app.use(requestLogger);

app.use("/api/test", testRouter)
app.use("/api/users", userRouter)
app.use("/api/login", loginRouter)

app.use(unknownEndpoint)
app.use(errorHandler)


const start = async () => {
    await connectionToDatabase();
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  };
  
  start();