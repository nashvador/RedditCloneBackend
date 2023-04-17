import { Router, Request, Response } from "express";
import { User, Post, Like } from "../models";
import { GetUserAuthInfoRequest } from "../util/middleware";
import { Op, OrderItem } from "sequelize";
const postRouter = Router();

type UserLikeModel =
  | Array<
      | {
          model: typeof User;
          attributes: string[];
        }
      | {
          model: typeof Like;
          attributes: string[];
          where: { userId: number };
          required: boolean;
        }
    >
  | [];

type wherePost = {
  postTitle: Record<string, string>;
};

postRouter.get(
  "/",
  async (request: GetUserAuthInfoRequest, response: Response) => {
    const user: User | null | undefined = request.user;
    let userLikeModel: UserLikeModel = [];
    const where: Partial<wherePost> = {};
    let orderArray: OrderItem = ["created_at", "desc"];

    if (request.query.search) {
      where.postTitle = {
        [Op.substring]: request.query.search,
      };
    }

    if (request.query.order) {
      if (request.query.order === "likes") {
        orderArray = ["up_votes", "desc"];
      } else if (request.query.order === "latest") {
        orderArray = ["created_at", "asc"];
      } else if (request.query.order === "comment") {
        orderArray = ["comment_count", "desc"];
      }
    }

    if (user) {
      userLikeModel = [
        {
          model: User,
          attributes: ["username"],
        },
        {
          model: Like,
          attributes: ["likeOrDislike"],
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
    const posts: Post[] = await Post.findAll({
      attributes: { exclude: ["userId"] },
      where,
      include: userLikeModel,
      order: [orderArray],
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
    const {
      postTitle,
      postContent,
    }: { postTitle: string; postContent: string } = request.body;
    const user: User | null | undefined = request.user;

    if (postTitle.length === 0) {
      return response.status(400).json({ error: "You must have a title!" });
    }
    if (postContent.length === 0) {
      return response
        .status(400)
        .json({ error: "You must have some post content!" });
    }

    const newPost: Post = await Post.create({
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
    const { content }: { content: string } = request.body;

    if (post && post?.userId === user?.dataValues.id) {
      post.postContent = content;
      await post.save();
      response.json(post);
    }
  }
);

export { postRouter };
