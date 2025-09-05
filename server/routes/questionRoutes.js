import express from "express"
import Question from "../models/Question.js";
import Session from "../models/Session.js"
import {protect} from "./authMiddleware.js";


const router = express.Router();
//add question
router.post('/create' , protect , async(req , res)=>{
    try{
         // we get the session id and questions from the request body
         const {sessionId , questions} = req.body;

         // we check if the session id is present and if the questions are present and if they are an array
         if(!sessionId || !questions || !Array.isArray(questions)){
            return res.status(400).json({message : "Invalid input data"});
         }

         // we find the session by the id
         const result = await Session.findById(sessionId);

         // if the session is not found we return a 404 error
         if(!result){
            return res.status(404).json({message : "Session not found"});
         }

         // we create an array of objects with the question and answer
         const questionsToBeAdded = questions.map((q)=>({
            session : sessionId,
            question  : q.question,
            answer : q.answer
         }));
        //  console.log("questions to be added" , questionsToBeAdded);

         // we insert the questions into the questions collection
         const createdQuestions = await Question.insertMany(questionsToBeAdded);
         
        //  console.log("created questions" , createdQuestions);
         // we add the questions to the session
         result.questions.push(...createdQuestions.map((q)=>q._id));

         // we save the session
         await result.save();

         return res.status(200).json({message : "Questions added successfully"});

    }catch(err){
        console.log(err);
        return res.status(500).json({message:"Server Error"});
    }
})

//upadate pin
router.put("/pin/:id", protect, async(req , res)=>{
    try{
       const id = req.params.id;
       const result = await Question.findById(id);
       if(!result){
        return res.status(404).json({message : "Question not found"});
       }

       result.isPinned = !result.isPinned;
       await result.save();
       return res.status(200).json({message : "Question unpinned / pinned successfully"});


    }catch(err){
        console.log(err);
        return res.status(500).json({message:"Server Error"});
    }
});

//update note
router.put("/note/:id", protect , async(req, res)=>{
    try{
      const id = req.params.id;
      const {note} = req.body;
      const result = await Question.findById(id);

      if(!result){
        return res.status(404).json({message : "Question not found"});
      }
      result.note = note || "";

      await result.save();
      return res.status(200).json({message : "Note updated successfully"});

    }catch(err){
        console.log(err);
        return res.status(500).json({message:"Server Error"});
    }
});
export {router};
