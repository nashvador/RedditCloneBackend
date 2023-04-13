import { Router, Request, Response } from "express";
import { User, Post, Comment } from "../models";
import { GetUserAuthInfoRequest } from "../util/middleware";
const commentRouter = Router();

commentRouter.post(
  "/postId/:id",
  async (request: GetUserAuthInfoRequest, response: Response) => {
    const postId = request.params.id;
    const post = await Post.findByPk(postId);
    const userId: number | undefined = request.user?.dataValues.id;
    const { comment }: { comment: string } = request.body;
    let newComment: Comment | null = null;
    if (userId) {
      newComment = await Comment.create({
        commentText: comment,
        postId: postId,
        userId: userId,
      });
      if (post && newComment) {
        post.commentCount++;
        post.save();
      }
    }
    response.json(newComment);
  }
);

commentRouter.post(
  "/replyId/:id",
  async (request: GetUserAuthInfoRequest, response: Response) => {
    const commentToRespondTo = await Comment.findByPk(request.params.id);
    let postCommentIsRespondingTo: Post | null = null;
    const commentToRespondToId = commentToRespondTo?.id;
    const postId = commentToRespondTo?.postId;
    if (postId) postCommentIsRespondingTo = await Post.findByPk(postId);
    const userId: number | undefined = request.user?.dataValues.id;
    const { comment }: { comment: string } = request.body;

    const newComment = await Comment.create({
      commentText: comment,
      postId: postId,
      userId: userId,
      commentRespondToId: commentToRespondToId,
    });
    if (newComment && postCommentIsRespondingTo) {
      postCommentIsRespondingTo.commentCount++;
      postCommentIsRespondingTo.save();
    }

    response.json(newComment);
  }
);

commentRouter.get(
  "/postId/:id",
  async (request: GetUserAuthInfoRequest, response: Response) => {
    const rootComments = await Comment.findAll({
      where: { postId: request.params.id, commentRespondToId: null },
    });

    let originalQ = [];

    if (rootComments) {
      for (let i = 0; i < rootComments.length; i++) {
        let queue: any = [];
        let commentStore = [];
        queue.push(rootComments[i]);
        while (queue.length > 0) {
          let currentNode: any = queue[0];
          const otherComment = await Comment.findAll({
            where: { commentRespondToId: currentNode.dataValues.id },
          });
          commentStore.push(currentNode);
          queue.shift();
          if (otherComment) {
            queue = [...queue, ...otherComment];
          } else {
            continue;
          }
        }
        originalQ.push(commentStore);
      }
    }
    response.json(originalQ);
  }
);

commentRouter.get("/:id", async (request: Request, response: Response) => {
  const comment = await Comment.findByPk(request.params.id, {
    include: [
      {
        model: Post,
        attributes: ["postTitle"],
      },
      {
        model: User,
        attributes: ["username"],
      },
    ],
  });
  response.json(comment);
});

export { commentRouter };
