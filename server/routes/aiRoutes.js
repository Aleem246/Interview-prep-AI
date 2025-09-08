import express, { raw } from "express"
// import {GoogleGenAI} from "@google/genai";
import {GoogleGenerativeAI} from "@google/generative-ai";
import {protect} from "./authMiddleware.js";
import dotenv from "dotenv"

import {questionAnswerPrompt, conceptExplainPrompt, loadMorePrompt} from "../utils/prompts.js";

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

        // const cleanedText = rawtext
        //     .replace(/^```json\s*/, "") // remove start
        //     .replace(/```$/, "") // remove ending ``
        //     .trim(); // remove extra spaces

        let cleanedText =
      typeof rawtext === "string"
        ? rawtext
            .replace(/^```(?:json)?\s*/i, "") // remove ```json
            .replace(/```$/i, "") // remove trailing ```
            .trim()
        : rawtext;

    let data;

    if (typeof cleanedText === "string") {
      try {
        data = JSON.parse(cleanedText); // strict parse
      } catch (err) {
        console.error("Strict JSON.parse failed, returning raw string instead.");
        return res.status(500).json({
          message: "Failed to parse AI response as JSON",
          raw: cleanedText,
        });
      }
    } else if (typeof cleanedText === "object") {
      // ✅ Already parsed (like the object you pasted)
      data = cleanedText;
    } else {
      return res.status(500).json({ message: "AI returned unexpected format" });
    }

    return res.status(200).json(data);
  } 

       

    catch(err){
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

        // const cleanedText = rawtext
        //     .replace(/^```json\s*/, "") // remove start
        //     .replace(/```$/, "") // remove ending ``
        //     .trim(); // remove extra spaces

        let cleanedText =
      typeof rawtext === "string"
        ? rawtext
            .replace(/^```(?:json)?\s*/i, "") // remove ```json
            .replace(/```$/i, "") // remove trailing ```
            .trim()
        : rawtext;

    let data;

    if (typeof cleanedText === "string") {
      try {
        data = JSON.parse(cleanedText); // strict parse
      } catch (err) {
        console.error("Strict JSON.parse failed, returning raw string instead.");
        return res.status(500).json({
          message: "Failed to parse AI response as JSON",
          raw: cleanedText,
        });
      }
    } else if (typeof cleanedText === "object") {
      // ✅ Already parsed (like the object you pasted)
      data = cleanedText;
    } else {
      return res.status(500).json({ message: "AI returned unexpected format" });
    }

    return res.status(200).json(data);
  } 
  

catch(err){
        console.log(err);
        return res.status(500).json({message : "Failed to generate explanation",
            error :err
        });
    }
})

router.post("/loadMore-questions" , protect , async(req , res)=>{
    try{
        // console.log("keys", GEMINI_API_KEY.slice(0,6));
        
        const {role , experience , topicsToFocus , numberOfQuestions, questions } = req.body;
        
        const prompt = loadMorePrompt(role, experience, topicsToFocus, numberOfQuestions , questions);

        // console.log(questions);
        const result = await model.generateContent(prompt);
        let rawtext = result.response.text();


      let cleanedText =
      typeof rawtext === "string"
        ? rawtext
            .replace(/^```(?:json)?\s*/i, "") // remove ```json
            .replace(/```$/i, "") // remove trailing ```
            .trim()
        : rawtext;

    let data;

    if (typeof cleanedText === "string") {
      try {
        data = JSON.parse(cleanedText); // strict parse
      } catch (err) {
        console.error("Strict JSON.parse failed, returning raw string instead.");
        console.log(cleanedText)
        return res.status(500).json({
          message: "Failed to parse AI response as JSON",
          raw: cleanedText,
        });
      }
    } else if (typeof cleanedText === "object") {
      // ✅ Already parsed (like the object you pasted)
      data = cleanedText;
    } else {
      return res.status(500).json({ message: "AI returned unexpected format" });
    }

    return res.status(200).json(data);
  } catch (err) {
    console.error(err);
    console.log(cleanedText);
    return res.status(500).json({
      message: "Failed to generate questions",
      error: err.message,
    });
  }
})

export {router};