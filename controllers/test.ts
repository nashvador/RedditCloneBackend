import { Router } from "express";
const testRouter = Router()


testRouter.get("/", async(_req, res) => {
    res.send("hello hi")
})


export {testRouter}