import { Router, Request, Response } from "express";
import { User, Post, Like } from "../models";
import { GetUserAuthInfoRequest } from "../util/middleware";
const postRouter = Router();

postRouter.get(
  "/",
  async (request: GetUserAuthInfoRequest, response: Response) => {
    const user: User | null | undefined = request.user;
    let userLikeModel = [];

    if (user) {
      userLikeModel = [
        {
          model: User,
          attributes: ["username"],
        },
        {
          model: Like,
          attributes: ["likeOrDislike", "userId"],
          where: { userId: user.dataValues.id },
          required: false,
        },
      ];
    } else {
      userLikeModel = [
        {
          model: User,
          attributes: ["username"],
        },
      ];
    }
    const posts = await Post.findAll({
      attributes: { exclude: ["userId"] },
      include: userLikeModel,
    });
    response.json(posts);
  }
);

postRouter.get("/:id", async (request: Request, response: Response) => {
  const posts = await Post.findByPk(request.params.id, {
    attributes: { exclude: ["userId"] },
    include: [
      {
        model: Like,
        attributes: ["likeOrDislike", "userId"],
        include: [
          {
            model: User,
            attributes: ["username"],
          },
        ],
      },
    ],
  });
  response.json(posts);
});

postRouter.get("/userId/:id", async (request: Request, response: Response) => {
  const posts = await Post.findAll({
    include: {
      model: User,
      attributes: ["username"],
      where: { username: request.params.id },
    },
  });
  response.json(posts);
});

postRouter.post(
  "/",
  async (request: GetUserAuthInfoRequest, response: Response) => {
    const { postTitle, postContent } = request.body;
    const user = request.user;

    if (postTitle.length === 0) {
      return response.status(400).json({ error: "You must have a title!" });
    }
    if (postContent.length === 0) {
      return response
        .status(400)
        .json({ error: "You must have some post content!" });
    }

    const newPost = await Post.create({
      postTitle: postTitle,
      upVotes: 0,
      postContent: postContent,
      userId: user?.dataValues.id,
    });

    response.status(201).json(newPost);
  }
);

postRouter.delete(
  "/:id",
  async (request: GetUserAuthInfoRequest, response: Response) => {
    const post: Post | null = await Post.findByPk(request.params.id);
    const user = request.user;

    if (user?.dataValues.admin) {
      await post?.destroy();
      response.status(404).end();
    }
    if (post?.userId === user?.dataValues.id) {
      await post?.destroy();
      response.status(404).end();
    }
  }
);

postRouter.put(
  "/:id",
  async (request: GetUserAuthInfoRequest, response: Response) => {
    const post: Post | null = await Post.findByPk(request.params.id);
    const user = request.user;
    const { content } = request.body;

    if (post && post?.userId === user?.dataValues.id) {
      post.postContent = content;
      await post.save();
      response.json(post);
    }
  }
);

export { postRouter };
