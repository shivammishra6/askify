import express from "express"
import { getQuestions, updateLikes } from "../controller/question.controller.js"

const router=express.Router()

router.get("/",getQuestions)
router.put('/likes/:id',updateLikes)

export default router;