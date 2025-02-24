import express from "express"
import { createQuestion, getQuestions, updateLikes, getComments, createComment, getUserQuestions, deleteQuestion, getUserComments } from "../controller/question.controller.js"

const router=express.Router()

router.get("/",getQuestions)
router.get("/:id",getUserQuestions)
router.get('/comments/:id',getComments)
router.get('/getUserComments/:userId',getUserComments)
router.put('/likes/:id',updateLikes)
router.post('/',createQuestion)
router.post('/comments',createComment)
router.delete("/:id",deleteQuestion)

export default router;