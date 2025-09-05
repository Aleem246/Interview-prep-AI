import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import connectDB from "./config/db.js";
import {router as aiRoutes} from "./routes/aiRoutes.js";
import {router as authRoutes} from "./routes/authRoutes.js";
import {router as sessionRoutes} from "./routes/sessionRoutes.js";  
import {router as questionRoutes} from "./routes/questionRoutes.js";

const app = express();
dotenv.config();

const port = process.env.PORT;

app.use(express.json()); //middleware

app.get("/", async(req , res)=>{
    res.send("Server is running");
})

const front_end_port = 5173;
//middleware to handle cors 
app.use(cors());

app.use(cors({
    origin : "*",
}))
//routes
app.use("/api/auth", authRoutes);
app.use("/api/sessions", sessionRoutes);
app.use("/api/questions", questionRoutes);
app.use("/api/ai", aiRoutes);


//start server
app.listen(port , ()=>{
    console.log(`Server is running on port ${port}`);
    console.log(`http://localhost:${port}`);
    connectDB();
})


// bcrypt.hash(password, 10);
// bcrypt.compare(password, hashedpsswrd);
// jwt.sign({id}, process.env.SECRET_KEY, {expiresIn: "2d"});
//  const authHeader = req.headers["authorization"];
//  const token = authHeader && authHeader.split(" ")[1];
//   jwt.verify(token, process.env.SECRET_KEY, (err, user)=>{
//              if(err){
//                  return res.status(403).json({message:"Forbidden, Invalid Token"});
//              }
//              req.user = user;
//              next();
//          });

// moment for time formats
// {motion , animatepresence} from frame-motion for animations


// [
//   {
//     "question": "Explain the difference between state and props in React. Give an example of when you would use each.",
//     "answer": "In React, both state and props are used to handle data that affects the rendering of a component, but they serve different purposes and are managed differently.\n\n**Props (Properties):**\n\n*   **Purpose:** Props are used to pass data from a parent component to a child component. Think of them like arguments you 
//     pass into a function.\n*   **Data Flow:** Props are read-only from the child component's perspective. A child component cannot directly modify the props it receives from its parent. The parent component is responsible for updating the props.\n*   **Use Case:** You would use props when you want to configure a child component with data that the parent component owns or manages. For example, passing a user's name and avatar URL to a `ProfileCard` component.\n\n**State:**\n\n*   **Purpose:** State is used to manage data that is local to a component and can change over time. It represents the internal data of a component.\n*   **Data Flow:** State is mutable within the component. When the state changes, the component re-renders to reflect the updated data.\n*   **Use Case:** You would use state when a component needs to manage its own data, such as the input value of a form field, a toggle state for a modal, or a list of items fetched from an API.\n\n**Example:**\n\n```jsx
//     import React, { useState } from 'react';

//     function ParentComponent() {
//       const [message, setMessage] = useState('Hello from Parent!');

//       return (
//         <div>
//           <ChildComponent message={message} />
//           <button onClick={() => setMessage('New Message!')}>Update Message</button>
//         </div>
//       );
//     }

//     function ChildComponent(props) {
//       return (
//         <div>
//           <p>{props.message}</p>
//         </div>
//       );
//     }

//     export default ParentComponent;
//     ```\n\nIn this example:\n\n*   `ParentComponent` manages the `message` state. It passes `message` as a prop to `ChildComponent`.\n*   `ChildComponent` receives the `message` prop and displays it. `ChildComponent` cannot change the `message` directly; it can only display the value it receives from the parent.\n*   The button in `ParentComponent` updates the state, causing `ParentComponent` and, consequently, `ChildComponent`, to re-render with the new message."
//   },
//   {
//     "question": "Explain the concept of React Hooks. What problem do they solve, and can you give an example of using the `useState` hook?",
//     "answer": "React Hooks are functions that let you “hook into” React state and lifecycle features from function components. They were introduced in React 16.8 and solve several problems with the class-based component approach.\n\n**Problems Hooks Solve:**\n\n*   **Code Reusability:** Before hooks, reusing stateful logic between components was difficult. Common patterns like render props and higher-order components led to wrapper hell. Hooks allow you to extract stateful logic into reusable functions.\n*   **Complex Components:** Class components often become large and complex due to lifecycle methods that handle unrelated logic. Hooks allow you to split a component into smaller functions based on related pieces of logic.\n*   **Confusion with `this`:** In class components, you need to be careful about binding `this` correctly, which can be a source of errors, especially for beginners. Hooks avoid the need to use `this`.\n\n**Example: Using `useState` Hook**\n\n`useState` is one of the most basic and frequently used hooks. It allows you to add state to functional components.\n\n```jsx
//     import React, { useState } from 'react';

//     function Counter() {
//       // Declare a piece of state called 'count' and initialize it to 0
//       const [count, setCount] = useState(0);

//       return (
//         <div>
//           <p>You clicked {count} times</p>
//           <button onClick={() => setCount(count + 1)}>
//             Click me
//           </button>
//         </div>
//       );
//     }

//     export default Counter;
//     ```\n\n**Explanation:**\n\n1.  **Import `useState`:** We import the `useState` hook from the `react` library.\n2.  **Declare State Variable:** Inside the `Counter` function component, we call `useState(0)`. This does the following:\n    *   Declares a state variable called `count`. This is our current state value (initially 0). This variable will hold a number representing the current count.\n    *   Creates a function called `setCount`. This function is used to update the `count` state variable. This function is used to modify the state.\n    *   `useState(0)`: The `0` is the initial value of the `count` state. So it starts at zero.\n    *   useState returns an array with two elements : the current state, and a function that allows you to update the state.\n3.  **Using the State:**\n    *   We display the `count` state in the paragraph.\n4.  **Updating the State:**\n    *   We attach an `onClick` handler to the button. When the button is clicked, we call `setCount(count + 1)`. This updates the `count` state by incrementing it by 1.\n    *   When `setCount` is called, React re-renders the component, and the updated `count` is displayed.\n\nIn summary, `useState` allows you to easily manage state within functional components, making them more powerful and flexible. The `setCount` function returned by `useState` is crucial for updating the state and triggering re-renders."
//   }
// ]
