//@ts-nocheck
// import type { NextApiRequest, NextApiResponse } from "next";
const { GoogleGenerativeAI } = require("@google/generative-ai");

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);


export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { prompt } = req.body;
      console.log(prompt);

       const model = genAI.getGenerativeModel({ model: "gemini-pro" });

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const completion = response.text();
      
      // Respond with a success message
      res.status(200).json({ prompt, completion });
    } catch (error) {
      console.error("Error processing data:", error);
      res.status(500).json({ error: "some error" });
    }
  } else if (req.method === "GET") {
    try {
      const { prompt } = req.query;
      console.log(prompt);

      // Respond with a success message
      //   res.status(200).json({ prompt: prompt });

      res.status(200).json({ completion });
    } catch (error) {
      console.error("Error processing data:", error);
      res.status(500).json({ error: "some error" });
    }
  } else {
    // Return a method not allowed error for non-POST requests
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
