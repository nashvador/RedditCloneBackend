import { Router } from "express";
import { GetUserAuthInfoRequest } from "../util/middleware";
const testRouter = Router()


testRouter.get("/", async(req: GetUserAuthInfoRequest, res) => {
    console.log(req.user)
    res.send("hello hi")
})

export {testRouter}