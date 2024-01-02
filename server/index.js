import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { ChatPromptTemplate } from "@langchain/core/prompts";

const app = express();
dotenv.config();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const chatModel = new ChatGoogleGenerativeAI({
  modelName: "gemini-pro",
  maxOutputTokens: 2048,
});

const prompt = ChatPromptTemplate.fromMessages([
  ["system", "You are a cover letter writer"],
  ["user", "{input}"],
]);

const chain = prompt.pipe(chatModel);

app.post("/create", async (req, res) => {
  const input_data = req.body.prompt_data;
  const processed_data = `Write me a cover letter with the following details.
  name : ${input_data.firstname} ${input_data.lastname}, 
  role : ${input_data.role}, 
  manager_name : ${
    input_data.manager_name ? input_data.manager_name : "undefined"
  }, 
  company name i am applying=${input_data.company_name}, 
  expreience=${input_data.experience} years, 
  previous role : ${
    input_data.previous_role ? input_data.previous_role : "undefined"
  }, 
  previous company : ${
    input_data.previous_company ? input_data.previous_company : "undefined"
  }, 
  consider undefined as not applicable.Only take the given inputs.Don't generate other fields.Replace the fields with above data.Generate cover letter only.`;
  console.log("processing");
  const data = await chain.invoke({
    input: processed_data,
  });
  res.send(data);
});

app.listen(8080, (req, res) => {
  console.log("Listening on port 8080");
});
