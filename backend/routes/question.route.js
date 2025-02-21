import express from "express"
import { createQuestion, getQuestions, updateLikes, getComments } from "../controller/question.controller.js"

const router=express.Router()

router.get("/",getQuestions)
router.put('/likes/:id',updateLikes)
router.post('/',createQuestion)
router.get('/comments/:id',getComments)

export default router;