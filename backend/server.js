import path from 'path'
import express from 'express'
import dotenv from 'dotenv'
import { connectDB } from './config/db.js'
import router from './routes/question.route.js'


dotenv.config()
const app=express()
const PORT=process.env.PORT
const __dirname=path.resolve()
app.use(express.json())

app.use('/api/questions',router)

if(process.env.NODE_ENV==="production"){
    app.use(express.static(path.join(__dirname,"/frontend/dist")))

    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(__dirname,"frontend","dist","index.html"))
    })
    
}

app.listen(PORT,()=>{
    connectDB();
    console.log(`server started at http://localhost:${PORT}`);
})