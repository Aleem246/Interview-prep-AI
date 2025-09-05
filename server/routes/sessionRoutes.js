import express from "express"
import { protect } from "./authMiddleware.js";
import Session from "../models/Session.js"
import Question from "../models/Question.js"
const router = express.Router();

router.post("/create" ,protect, async(req , res)=>{
   try{
    
    const { role , experience , topicsToFocus, desc, questions} = req.body;
    const userId= req.user.id;

    
        const newSession = new Session({
            user : userId,
            role,
            experience,
            topicsToFocus,
            desc
        });
        const questionDocs = await Promise.all(
          questions.map(async (ques) => {
              const newQuestion = new Question({
                  session : newSession._id,
                  question : ques.question,
                  answer : ques.answer,
                  note : ques.note,
              })
              await newQuestion.save();
              return newQuestion;
          })
    );
    newSession.questions = questionDocs;
    await newSession.save();

        return res.status(200).json({message:"Session created successfully", data : newSession});
    }   
   catch(err){
    console.log(err);
    res.status(500).json({message:"Internal Server Error", err});
   }
})

router.get("/my-sessions" , protect, async(req , res)=>{
    try{
        
        const userId = req.user.id;
        // console.log(userId);
        const result = await Session.find({user : userId})
        .sort({createdAt : -1}).populate("questions");
        
        return res.status(200).json({data : result});
    }catch(err){
        console.log(err);
        return res.status(500).json({message:"Internal Server Error", err});
    }
})

router.get("/:id",protect, async(req, res)=>{
    try{
        const {id} = req.params;
        const result = await Session.findById(id)
  .populate({ path: "questions" })
  .lean();

if (result && result.questions) {
  result.questions.sort((a, b) => {
    if (a.isPinned && b.isPinned) {
      return new Date(a.updatedAt) - new Date(b.updatedAt); // pinned → latest first
    }
    if (a.isPinned && !b.isPinned) return -1; // pinned before unpinned
    if (!a.isPinned && b.isPinned) return 1;
    return new Date(a.createdAt) - new Date(b.createdAt); // unpinned → oldest first
  });
}

        if(!result){
            return res.status(404).json({message:"Session not found"});
        }
        return res.status(200).json({data : result});

   }catch(err){
    console.log(err);
    res.status(500).json({message:"Internal Server Error", err});
   }
})

router.delete("/:id" ,protect, async(req , res)=>{
   try{
        const {id} = req.params;
        const result  = await Session.findById(id);
        if(!result){
            return res.status(404).json({message : "Session not found"});
        }

        if(result.user.toString() !== req.user.id){
            return res.status(401).json({message : "Unauthorized to delete this session"});
        }
        await Question.deleteMany({session : id});
        await Session.findByIdAndDelete(id);
        
        return res.status(200).json({message : "Session deleted successfully"});

   }catch(err){
    console.log(err);
    res.status(500).json({message:"Internal Server Error", err});
   }
})
export {router};