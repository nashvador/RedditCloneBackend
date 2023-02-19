import { Router, Request, Response } from "express";
import { User, Post, Comment, Saved } from "../models";
import { GetUserAuthInfoRequest } from "../util/middleware";
const savedRouter = Router()

savedRouter.get("/", async (request: GetUserAuthInfoRequest, response: Response) => {
    const userId = request.user?.dataValues.id

    const savedPostsAndComments = await Saved.findAll({where: {userId: userId}, order: [['createdAt','DESC']], include: [{
        model: Comment, include: [{model: User}]
    }, {model: Post, include: [{model: User}]}]})
    response.json(savedPostsAndComments)
})

savedRouter.post("/commentId/:id", async (request: GetUserAuthInfoRequest, response: Response) => {
    const commentId = request.params.id
    const userId = request.user?.dataValues.id
    const savedComment = await Saved.create({userId: userId, commentId: commentId})

    response.json(savedComment)
})


savedRouter.post("/postId/:id", async (request: GetUserAuthInfoRequest, response: Response) => {
    const postId = request.params.id
    const userId = request.user?.dataValues.id
    const savedComment = await Saved.create({userId: userId, postId: postId})

    response.json(savedComment)
})



export {savedRouter}