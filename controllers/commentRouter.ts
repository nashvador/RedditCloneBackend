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






export {commentRouter}