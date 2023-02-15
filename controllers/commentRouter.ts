import { Router, Request, Response } from "express";
import { User, Post, Comment } from "../models";
import { GetUserAuthInfoRequest } from "../util/middleware";
const commentRouter = Router()


commentRouter.post('/postId/:id', async (request: GetUserAuthInfoRequest, response: Response) => {
    const postId = request.params.id
    const userId = request.user?.dataValues.id
    const {comment} = request.body

    const newComment = await Comment.create({commentText: comment, postId: postId, userId: userId})
    response.json(newComment)
})

commentRouter.post('/replyId/:id', async (request: GetUserAuthInfoRequest, response: Response) => {
    const commentToRespondTo = await Comment.findByPk(request.params.id)
    const commentToRespondToId = commentToRespondTo?.id
    const postId = commentToRespondTo?.postId
    const userId = request.user?.dataValues.id
    const {comment} = request.body

    const newComment = await Comment.create({commentText: comment, postId: postId, userId: userId, commentRespondToId: commentToRespondToId})
    response.json(newComment)
})




export {commentRouter}