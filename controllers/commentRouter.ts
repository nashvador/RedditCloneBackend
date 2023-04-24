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
    const postId = request.params.id;

    try {
      const comments = await Comment.findAll({
        where: {
          postId: postId,
        },
        include: {
          model: User,
          attributes: ["username"],
        },
      });

      const commentGroups: Record<string, Comment[]> = comments.reduce(
        (acc: Record<string, Comment[]>, comment: Comment) => {
          const parentId: string =
            comment.commentRespondToId?.toString() ?? "topLevel";
          acc[parentId] = acc[parentId] || [];
          acc[parentId].push(comment.toJSON() as Comment);
          return acc;
        },
        {}
      );

      const buildCommentTree = (
        commentGroup: Record<string, Comment[]>,
        parentCommentId: string
      ): Comment[] => {
        const nestedComments: Comment[] = commentGroup[parentCommentId] || [];

        nestedComments.forEach((comment: any) => {
          comment.replies = buildCommentTree(
            commentGroup,
            comment.id.toString()
          );
        });

        return nestedComments;
      };

      const commentTree = buildCommentTree(commentGroups, "topLevel");

      response.status(200).json(commentTree);
    } catch (error) {
      console.error(error);
      response.status(500).send("Internal server error");
    }
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
