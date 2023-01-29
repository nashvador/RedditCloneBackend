import { Router } from "express";
const router = Router()


router.get("/", async(_req, res) => {
    res.send("hello")
})


export {router}