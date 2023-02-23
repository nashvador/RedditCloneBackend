import { Router, Request, Response } from "express";
import { User, Post, Comment, Like } from "../models";
import { GetUserAuthInfoRequest } from "../util/middleware";
const likeRouter = Router()

likeRouter.post("/postIdUpVote/:id", async (request: GetUserAuthInfoRequest, response: Response) => {
    const postId = request.params.id
    const requestingUserId = request.user?.dataValues.id
    const LikedPost = await Like.findOne({where: {postId: postId, userId: requestingUserId}})
    const referringPost = await Post.findByPk(postId)
    let numberOfLikes = referringPost?.upVotes
    const creatorOfPost = await User.findByPk(referringPost?.userId)

    if (LikedPost) {
        if (LikedPost.likeOrDislike === true) {
            
        }
    }

})




















export {likeRouter}





