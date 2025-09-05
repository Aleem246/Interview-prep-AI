const questionAnswerPrompt = (role , experience , topicToFocus , numberOfQuestions)=>(
    `
    You are an AI trained to generate technical interview questions and answers.

    Task : 
    -Role : ${role}
    -Candidate Experience : ${experience}
    -Topics to Focus : ${topicToFocus}
    -generate ${numberOfQuestions} questions and answers.
    -For each quesiton , generate a detailed but beginner-friendly answers.
    -If the answer needs a code example , add a small code block inside.
    -keep formatting very clean.
    -return a pure JSON array like this :
    [
        {
            "question" : "question here?",
            "answer" : "answer here."
        },
        ...
    ]
        Important : Do not return any other text other than the JSON array, only return a valid JSON array.
    
    `)

const conceptExplainPrompt = (question)=>(
    `
    You are an AI trained to generate explanations for a given interview question.

    Task :
    -Explain the following interview question and its concept in depth as if you're teaching a beginner developer.
    -Question : ${question}
    -After the explanation , provide a short and clear title that summarizes the concept for the article or page header
    - If the explanation includes a code example, provide a small and easy to understand code block inside.
    -keep the formatting very clean and clear
    -return a pure JSON object like this :
    {
        "title" : "title here",
        "explanation" : "explanation here."
    }
        Important: Do not add any extra text outside the JSON object, only return a valid JSON object.

    `
)

export {questionAnswerPrompt , conceptExplainPrompt};
