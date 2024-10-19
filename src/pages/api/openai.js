// src/pages/api/openai.js
import OpenAI from 'openai';



const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,  
});

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { prompt } = req.body; // Extract the prompt from the request body

    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    try {
      // Call the OpenAI API to generate a completion
      const response = await openai.chat.completions.create({
        model: 'gpt-4o',  // You can choose a different model if needed
        messages: [
          {
            role: 'user', content: prompt,
          },
          {
            role: "system",
            content: "You are an AI assistant summarizing a user's journal entries. The user has chosen to receive a [weekly/bi-weekly/monthly] summary of their progress. Based on their goal and the journal entries provided below, create a summary that includes key accomplishments, areas for improvement, and actionable advice."

          }
        ],
      });

      // Respond with the completion result
      return res.status(200).json({ result: response.choices[0].message.content });
    } catch (error) {
      console.error('Error with OpenAI API:', error);
      return res.status(500).json({ error: 'Failed to generate completion' });
    }
  } else {
    // Handle non-POST requests
    return res.status(405).json({ error: 'Method not allowed' });
  }
}
