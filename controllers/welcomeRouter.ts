import { Router, Request, Response } from "express";
const welcomeRouter = Router();

welcomeRouter.get("/", async (_request: Request, response: Response) => {
  response.send(
    "Hello, welcome to the backend of my Reddit clone application."
  );
});

export { welcomeRouter };
