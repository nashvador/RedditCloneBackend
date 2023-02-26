import e, { Router, Request, Response } from "express";
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
            creatorOfPost!.postKarma --
            await creatorOfPost?.save()
            await LikedPost.destroy()
            referringPost!.upVotes --
            await referringPost?.save()
            response.status(404).end()
        } else {
            creatorOfPost!.postKarma += 2
            await creatorOfPost?.save()
            LikedPost.likeOrDislike = !LikedPost.likeOrDislike
            await LikedPost.save()
            referringPost!.upVotes +=2
            await referringPost?.save()
            response.status(404).end()
        }
    } else {
        const newLikedPost = await Like.create({postId: postId, userId: requestingUserId, likeOrDislike: true})
        referringPost!.upVotes ++
        referringPost?.save()
        creatorOfPost!.postKarma ++
        creatorOfPost?.save()
        response.json(newLikedPost)
    }

})




















export {likeRouter}





