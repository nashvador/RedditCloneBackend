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

commentRouter.get('/postId/:id', async (request: GetUserAuthInfoRequest, response: Response) => {
    const rootComments = await Comment.findAll({where: {postId: request.params.id, commentRespondToId: null}})

    let originalQ = []

    if (rootComments) {
        for (let i=0; i <rootComments.length; i++) {
            let queue:any = []
            let commentStore = []
            queue.push(rootComments[i])
            while (queue.length > 0) {
                let currentNode: any = queue[0]
                const otherComment = await Comment.findAll({where : {commentRespondToId: currentNode.dataValues.id}})
                commentStore.push(currentNode)
                queue.shift()
                if (otherComment) {
                    queue = [...queue, ...otherComment]
                } else {
                    continue
                }
            }
            originalQ.push(commentStore)
        }
    }
    response.json(originalQ)
})

commentRouter.get("/:id", async (request: Request, response: Response) => {
    const comment = await Comment.findByPk(request.params.id)
    response.json(comment)
})


export {commentRouter}