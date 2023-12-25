//@ts-nocheck
// import type { NextApiRequest, NextApiResponse } from "next";

import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { prompt } = req.body;
      console.log(prompt);

      const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: `"${prompt}". Now return creative response`,
        temperature: 0,
        max_tokens: 3000,
        top_p: 1,
        frequency_penalty: 0.5,
        presence_penalty: 0,
      });

      const { choices } = response.data;
      const completion = choices[0].text.trim();

      // Respond with a success message
      res.status(200).json({prompt, completion });
    } catch (error) {
      console.error("Error processing data:", error);
      res.status(500).json({ error: "some error" });
    }
  } else if (req.method === "GET") {
    try {
      const { prompt } = req.query;
      console.log(prompt);

       const response = await openai.createCompletion({
         model: "text-davinci-003",
         prompt: `You are embedded in my website, and you are given the following prompt: "${prompt}". Now return best creative response`,
         temperature: 0,
         max_tokens: 3000,
         top_p: 1,
         frequency_penalty: 0.5,
         presence_penalty: 0,
       });

       const { choices } = response.data;
       const completion = choices[0].text.trim();

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
