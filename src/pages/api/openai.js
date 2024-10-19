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

    const systemMessage = `
      You are an AI assistant tasked with summarizing a user's journal entries for their progress report. 
      The user has chosen a [weekly/bi-weekly/monthly] summary format, focusing on the goal: [user's goal, e.g., 'Improve My Daily Productivity'].
      Generate a structured summary that includes:

      1. **Introduction**:
        - Address the user by their first name.
        - State the summary period and encourage the user.

      2. **Goal Overview**:
        - Mention the user's selected goal and its importance.

      3. **Key Insights**:
        - **Tasks Completed**: Highlight significant tasks or milestones achieved by the user, emphasizing their impact or challenge level.
        - **Challenges Faced**: Provide an overview of notable challenges, both practical and emotional, that affected the user’s progress.
        - **Time Management Patterns**: Reflect on how the user allocated their time, providing insights on effective and ineffective time use.
        - **Collaboration & Support**: Offer feedback on the user's interactions with others, support received, and social aspects of their work.

      4. **Suggestions for Improvement**:
        - Provide personalized recommendations aligned with the user’s goal, helping them optimize their progress.

      5. **Emotional Wellbeing**:
        - Include reflections on the user’s emotional state during the period, highlighting moments of uncertainty, confidence, or self-reflection.

      6. **Conclusion**:
        - Wrap up the insights, reinforcing the progress made and encouraging continued journaling and reflection.

      Maintain a friendly and supportive tone throughout, focusing on constructive feedback and actionable advice.
      `;
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
            content: systemMessage
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
