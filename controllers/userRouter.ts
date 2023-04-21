import { Router, Request, Response } from "express";
import { User, Post } from "../models";
import { GetUserAuthInfoRequest } from "../util/middleware";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
const userRouter = Router();

userRouter.get("/", async (_request: Request, response: Response) => {
  const users = await User.findAll({
    include: {
      model: Post,
    },
  });
  response.json(users);
});

userRouter.get("/:id", async (request: Request, response: Response) => {
  const user = await User.findOne({ where: { username: request.params.id } });
  response.json(user);
});

userRouter.post("/", async (request: Request, response: Response) => {
  const {
    username,
    name,
    password,
  }: { username: string; name: string; password: string } = request.body;
  if (password.length === 0) {
    return response.status(400).json({ error: "You must return a password" });
  }
  if (password.length < 3) {
    return response.status(400).json({ error: "Password is too short" });
  }
  if (username.length === 0) {
    return response.status(400).json({ error: "You must return a username" });
  }
  if (name.length === 0) {
    return response.status(400).json({ error: "You must return a name" });
  }

  const existingUser: User | null = await User.findOne({
    where: { username: username },
  });
  if (existingUser) {
    return response.status(400).json({
      error: "username must be unique",
    });
  }

  const saltRounds = bcrypt.genSaltSync(10);
  const passwordHash: string = await bcrypt.hashSync(password, saltRounds);

  const savedUser = await User.create({
    username: username,
    name: name,
    password: passwordHash,
  });

  const userForToken = {
    username: savedUser.username,
    id: savedUser.id,
  };

  const token = jwt.sign(userForToken, process.env.SECRET!);
  response.status(200).send({
    token,
    username: savedUser.username,
    name: savedUser.name,
    admin: savedUser.admin,
    disabled: savedUser.disabled,
  });
});

userRouter.put(
  "/:id/disableAccount",
  async (request: GetUserAuthInfoRequest, response: Response) => {
    const userToDisable = await User.findByPk(request.params.id);
    const userRequesting = request.user;

    if (userToDisable) {
      if (
        userRequesting?.dataValues.admin ||
        userRequesting?.dataValues.id === userToDisable.id
      ) {
        userToDisable.disabled = !userToDisable?.disabled;
        await userToDisable.save();
        response.json(userToDisable);
      } else {
        response.status(400).json({ error: "" });
      }
    } else {
      response.status(400).json({ error: "User does not exist" });
    }
  }
);

userRouter.put(
  "/:id/addTag",
  async (request: GetUserAuthInfoRequest, response: Response) => {
    const userToAddTag = await User.findByPk(request.params.id);
    const userRequesting = request.user;
    const tag: string = request.body.tag;

    if (userToAddTag && userToAddTag?.id == userRequesting?.dataValues.id) {
      userToAddTag.tag = tag;
      await userToAddTag.save();
      response.json(userToAddTag);
    } else {
      response.status(400).json({ error: "User does not exist" });
    }
  }
);

userRouter.put(
  "/:id/addAdminStatus",
  async (request: GetUserAuthInfoRequest, response: Response) => {
    const userToAddTag = await User.findByPk(request.params.id);
    const userRequesting = request.user;
    const tag: string = request.body.tag;

    if (userToAddTag && userToAddTag?.id == userRequesting?.dataValues.id) {
      userToAddTag.tag = tag;
      await userToAddTag.save();
      response.json(userToAddTag);
    } else {
      response.status(400).json({ error: "User does not exist" });
    }
  }
);

export { userRouter };
