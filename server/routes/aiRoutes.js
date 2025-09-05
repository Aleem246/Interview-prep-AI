import express, { raw } from "express"
// import {GoogleGenAI} from "@google/genai";
import {GoogleGenerativeAI} from "@google/generative-ai";
import {protect} from "./authMiddleware.js";
import dotenv from "dotenv"
import {questionAnswerPrompt, conceptExplainPrompt} from "../utils/prompts.js";
dotenv.config();

const router = express.Router();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY
const ai = new GoogleGenerativeAI( GEMINI_API_KEY);
const model = ai.getGenerativeModel({model : "gemini-2.0-flash-001"});

router.post("/generate-questions" , protect , async(req , res)=>{
    try{
        // console.log("keys", GEMINI_API_KEY.slice(0,6));
        const {role , experience , topicsToFocus , numberOfQuestions } = req.body;

        if(!role || !experience || !topicsToFocus || !numberOfQuestions){
            return res.status(400).json({message : "All fields are required"});
        }
        const prompt = questionAnswerPrompt(role, experience, topicsToFocus, numberOfQuestions);

        const result = await model.generateContent(prompt);
        let rawtext = result.response.text();

        const cleanedText = rawtext
            .replace(/^```json\s*/, "") // remove start
            .replace(/```$/, "") // remove ending ``
            .trim(); // remove extra spaces


            // Now safe to parse
            try{
                const data = JSON.parse(cleanedText);
                return res.status(200).json(data);
            }
            catch(err){
                console.log(err);
                console.log(cleanedText);
                return res.status(500).json({message : "Failed to parse json"})
            }

       

    }catch(err){
        console.log(err);
        return res.status(500).json({message : "Failed to generate questions",
            error :err
        });
    }
})

router.post("/generate-explanation" , protect , async(req , res)=>{
    try{
        const {question} = req.body;
        if(!question){
            return res.status(400).json({message : "Question is required"});
        }
        const prompt = conceptExplainPrompt(question);
        
        // console.log(question);

        const result = await model.generateContent(prompt);
        let rawtext = result.response.text();

        const cleanedText = rawtext
            .replace(/^```json\s*/, "") // remove start
            .replace(/```$/, "") // remove ending ``
            .trim(); // remove extra spaces


            // Now safe to parse
            try{
                const data = JSON.parse(cleanedText);
                return res.status(200).json(data);
            }
            catch(err){
                console.log(err);
                // console.log(cleanedText);
                return res.status(500).json({message : "Failed to parse json"})
            }

    }catch(err){
        console.log(err);
        return res.status(500).json({message : "Failed to generate explanation",
            error :err
        });
    }
})


export {router};