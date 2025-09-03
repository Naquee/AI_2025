import express from "express";
import cors from "cors"
import { generate } from "./chatbot.js";
const app = express()
const port = 3001

app.use(express.json());
app.use(cors())

app.get('/', (req, res) => {
  res.send('Welcome to Chatbot!')
})

app.post('/chat',async(req,res) => {
    const {message,threadId} = req.body;
    // console.log(message);
    // todo: validate above fields

    if(!message || !threadId){
      res.status(400).json({message:"All field are required"})
      return;
    }

   const result = await generate(message,threadId);

    res.json({message:result})
})

app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})
