import jwt from "jsonwebtoken";
import { Response, Request, Router } from "express";
import { User } from "../models";
import bcrypt from "bcryptjs";
const loginRouter = Router();

loginRouter.post("/", async (request: Request, response: Response) => {
  const { username, password }: { username: string; password: string } =
    request.body;

  const user: User | null = await User.findOne({
    where: { username: username },
  });
  const passwordCorrect =
    user === null ? false : bcrypt.compareSync(password, user.password);

  if (!(user && passwordCorrect)) {
    return response.status(401).json({
      error: "Invalid username or password",
    });
  }

  const userForToken = {
    username: user.username,
    id: user.id,
  };

  const token = jwt.sign(userForToken, process.env.SECRET!);
  response
    .status(200)
    .send({
      token,
      username: user.username,
      name: user.name,
      admin: user.admin,
      disabled: user.disabled,
    });
});

export { loginRouter };
