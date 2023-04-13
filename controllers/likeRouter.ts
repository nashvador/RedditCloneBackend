import e, { Router, Request, Response } from "express";
import { User, Post, Comment, Like } from "../models";
import { GetUserAuthInfoRequest } from "../util/middleware";
const likeRouter = Router();

likeRouter.get(
  "/upvoted",
  async (request: GetUserAuthInfoRequest, response: Response) => {
    const requestingUserId: number | undefined = request.user?.dataValues.id;
    const likedPostsAndComments = await Like.findAll({
      where: { userId: requestingUserId, likeOrDislike: true },
    });
    response.json(likedPostsAndComments);
  }
);

likeRouter.get(
  "/downvoted",
  async (request: GetUserAuthInfoRequest, response: Response) => {
    const requestingUserId: number | undefined = request.user?.dataValues.id;
    const dislikedPostsAndComments = await Like.findAll({
      where: { userId: requestingUserId, likeOrDislike: false },
    });
    response.json(dislikedPostsAndComments);
  }
);

likeRouter.post(
  "/postIdUpVote/:id",
  async (request: GetUserAuthInfoRequest, response: Response) => {
    const postId = request.params.id;
    const requestingUserId: number | undefined = request.user?.dataValues.id;
    const LikedPost = await Like.findOne({
      where: { postId: postId, userId: requestingUserId },
    });
    const referringPost = await Post.findByPk(postId);
    const creatorOfPost = await User.findByPk(referringPost?.userId);

    if (LikedPost) {
      if (LikedPost.likeOrDislike === true) {
        creatorOfPost!.postKarma--;
        await creatorOfPost?.save();
        await LikedPost.destroy();
        referringPost!.upVotes--;
        await referringPost?.save();
        response.status(404).end();
      } else {
        creatorOfPost!.postKarma += 2;
        await creatorOfPost?.save();
        LikedPost.likeOrDislike = !LikedPost.likeOrDislike;
        await LikedPost.save();
        referringPost!.upVotes += 2;
        await referringPost?.save();
        response.status(404).end();
      }
    } else {
      const newLikedPost = await Like.create({
        postId: postId,
        userId: requestingUserId,
        likeOrDislike: true,
      });
      referringPost!.upVotes++;
      referringPost?.save();
      creatorOfPost!.postKarma++;
      creatorOfPost?.save();
      response.json(newLikedPost);
    }
  }
);

likeRouter.post(
  "/commentIdUpVote/:id",
  async (request: GetUserAuthInfoRequest, response: Response) => {
    const commentId = request.params.id;
    const requestingUserId: number | undefined = request.user?.dataValues.id;
    const LikedComment = await Like.findOne({
      where: { commentId: commentId, userId: requestingUserId },
    });
    const referringComment = await Comment.findByPk(commentId);
    const creatorOfComment = await User.findByPk(referringComment?.userId);

    if (LikedComment) {
      if (LikedComment.likeOrDislike === true) {
        creatorOfComment!.commentKarma--;
        await creatorOfComment?.save();
        await LikedComment.destroy();
        referringComment!.upVotes--;
        await referringComment?.save();
        response.status(404).end();
      } else {
        creatorOfComment!.postKarma += 2;
        await creatorOfComment?.save();
        LikedComment.likeOrDislike = !LikedComment.likeOrDislike;
        await LikedComment.save();
        referringComment!.upVotes += 2;
        await referringComment?.save();
        response.status(404).end();
      }
    } else {
      const newLikedComment = await Like.create({
        commentId: commentId,
        userId: requestingUserId,
        likeOrDislike: true,
      });
      referringComment!.upVotes++;
      referringComment?.save();
      creatorOfComment!.commentKarma++;
      creatorOfComment?.save();
      response.json(newLikedComment);
    }
  }
);

likeRouter.post(
  "/postIdDownVote/:id",
  async (request: GetUserAuthInfoRequest, response: Response) => {
    const postId = request.params.id;
    const requestingUserId: number | undefined = request.user?.dataValues.id;
    const LikedPost = await Like.findOne({
      where: { postId: postId, userId: requestingUserId },
    });
    const referringPost = await Post.findByPk(postId);
    const creatorOfPost = await User.findByPk(referringPost?.userId);

    if (LikedPost) {
      if (LikedPost.likeOrDislike === true) {
        creatorOfPost!.postKarma -= 2;
        await creatorOfPost?.save();
        LikedPost.likeOrDislike = !LikedPost.likeOrDislike;
        await LikedPost.save();
        referringPost!.upVotes -= 2;
        await referringPost?.save();
        response.status(404).end();
      } else {
        creatorOfPost!.postKarma++;
        await creatorOfPost?.save();
        await LikedPost.destroy();
        referringPost!.upVotes++;
        await referringPost?.save();
        response.status(404).end();
      }
    } else {
      const newLikedPost = await Like.create({
        postId: postId,
        userId: requestingUserId,
        likeOrDislike: false,
      });
      referringPost!.upVotes--;
      referringPost?.save();
      creatorOfPost!.postKarma--;
      creatorOfPost?.save();
      response.json(newLikedPost);
    }
  }
);

likeRouter.post(
  "/commentIdDownVote/:id",
  async (request: GetUserAuthInfoRequest, response: Response) => {
    const commentId = request.params.id;
    const requestingUserId: number | undefined = request.user?.dataValues.id;
    const LikedComment = await Like.findOne({
      where: { commentId: commentId, userId: requestingUserId },
    });
    const referringComment = await Comment.findByPk(commentId);
    const creatorOfComment = await User.findByPk(referringComment?.userId);

    if (LikedComment) {
      if (LikedComment.likeOrDislike === true) {
        creatorOfComment!.commentKarma -= 2;
        await creatorOfComment?.save();
        !LikedComment.likeOrDislike;
        await LikedComment.save();
        referringComment!.upVotes -= 2;
        await referringComment?.save();
        response.status(404).end();
      } else {
        creatorOfComment!.postKarma++;
        await creatorOfComment?.save();
        await LikedComment.save();
        await LikedComment.destroy();
        referringComment!.upVotes++;
        await referringComment?.save();
        response.status(404).end();
      }
    } else {
      const newLikedComment = await Like.create({
        commentId: commentId,
        userId: requestingUserId,
        likeOrDislike: false,
      });
      referringComment!.upVotes--;
      referringComment?.save();
      creatorOfComment!.commentKarma--;
      creatorOfComment?.save();
      response.json(newLikedComment);
    }
  }
);

export { likeRouter };
