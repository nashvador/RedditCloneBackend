import { Router, Request, Response } from "express";
import { User, Post, Comment } from "../models";
import { GetUserAuthInfoRequest } from "../util/middleware";
const postRouter = Router()

postRouter.get("/", async (_request: Request, response: Response) => {
    const posts = await Post.findAll({ attributes: { exclude: ['userId'] },
    include: {
      model: User,
      attributes: ['username']
    },})
    response.json(posts)
})

postRouter.get("/:id", async (request: Request, response: Response) => {
    const posts = await Post.findByPk(request.params.id, { attributes: { exclude: ['userId'] },
    include: [{
        model: Comment,
        include: [{
          model: User,
          attributes: ['username']
        }]
      }]
})
    response.json(posts)
})


postRouter.post("/", async (request: GetUserAuthInfoRequest, response: Response) => {
    const body = request.body
    const user = request.user


    const newPost = await Post.create({ postTitle: body.title,
        upVotes: 0,
        postContent: body.content,
        userId: user?.dataValues.id,})

    response.json(newPost)

})

postRouter.delete("/:id", async (request: GetUserAuthInfoRequest, response: Response) => {
    const post : Post | null = await Post.findByPk(request.params.id)
    const user = request.user

    if (user?.dataValues.admin) {
        await post?.destroy();
        response.status(404).end();
    }
    if (post?.userId === user?.dataValues.id) {
        await post?.destroy()
        response.status(404).end();
    }
})

postRouter.put("/:id", async (request: GetUserAuthInfoRequest, response: Response) => {
    const post : Post | null = await Post.findByPk(request.params.id)
    const user = request.user
    const {content} = request.body

    if (post && post?.userId === user?.dataValues.id) {
        post.postContent = content
        await post.save()
        response.json(post)
    }


})


export {postRouter}