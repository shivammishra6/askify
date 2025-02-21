import express from "express"
import { createQuestion, getQuestions, updateLikes } from "../controller/question.controller.js"

const router=express.Router()

router.get("/",getQuestions)
router.put('/likes/:id',updateLikes)
router.post('/',createQuestion)

export default router;