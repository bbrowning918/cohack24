import OpenAI from 'openai';
import nodemailer from 'nodemailer';
import { createClient } from '@supabase/supabase-js';

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Initialize Supabase
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

/**
 * Fetch user profile by email.
 */
const fetchUserProfile = async (email) => {
  const { data: profile, error } = await supabase
    .from('profiles')
    .select('id, firstname, goal_id, msg_frequency_id')
    .eq('email', email)
    .single();

  return { profile, error };
};

/**
 * Fetch goal by goal_id.
 */
const fetchGoal = async (goal_id) => {
  const { data: goal, error } = await supabase
    .from('goals')
    .select('heading')
    .eq('id', goal_id)
    .single();

  return { goal, error };
};

/**
 * Fetch message frequency by msg_frequency_id.
 */
const fetchMsgFrequency = async (msg_frequency_id) => {
  const { data: msgFrequency, error } = await supabase
    .from('msg_frequencies')
    .select('time_interval')
    .eq('id', msg_frequency_id)
    .single();

  return { msgFrequency, error };
};

/**
 * Fetch journal entries by user_id.
 */
const fetchJournalEntries = async (user_id) => {
  const { data: journalEntries, error } = await supabase
    .from('journal_entries')
    .select('content, created_at')
    .eq('user_id', user_id)
    .order('created_at', { ascending: true });

  return { journalEntries, error };
};

/**
 * Send email using Nodemailer.
 */
const sendEmail = async ({ to, subject, text, html }) => {
  const transporter = nodemailer.createTransport({
    host: 'smpt.imitate.email',
    port: 587,
    secure: true,
    auth: {
        user: process.env.EMAIL_USER,
        password: process.env.EMAIL_PASS,
    }
})

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject,
    text,
    html,
  };

  return transporter.sendMail(mailOptions);
};

/**
 * Main handler function for the API route.
 */
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  // Fetch user profile
  const { profile, error: profileError } = await fetchUserProfile(email);
  if (profileError || !profile) {
    return res.status(404).json({ error: 'User not found' });
  }

  // Fetch goal
  const { goal, error: goalError } = await fetchGoal(profile.goal_id);
  if (goalError || !goal) {
    return res.status(404).json({ error: 'Goal not found' });
  }

  // Fetch message frequency
  const { msgFrequency, error: msgFrequencyError } = await fetchMsgFrequency(profile.msg_frequency_id);
  if (msgFrequencyError || !msgFrequency) {
    return res.status(404).json({ error: 'Message frequency not found' });
  }

  // Fetch journal entries
  const { journalEntries, error: journalError } = await fetchJournalEntries(profile.id);
  if (journalError) {
    return res.status(500).json({ error: 'Failed to fetch journal entries' });
  }

  if (!journalEntries || journalEntries.length === 0) {
    return res.status(404).json({ error: 'No journal entries found' });
  }

  // Construct the user message with goal and journal entries
  let userMessage = `Goal: ${goal.heading} - Tailored for users who need to organize their workday better and track task completion. Prompts will help them focus on what’s been accomplished and how to be more efficient.\n\nJournal Entries:\n\n`;
  journalEntries.forEach((entry, index) => {
    userMessage += `${index + 1}. Entry: ${entry.content}\n\n`;
  });

  // Define the system message
  const systemMessage = `
    You are an AI assistant tasked with summarizing a user's journal entries for their progress report. 
    The user has chosen a ${msgFrequency.time_interval} summary format, focusing on the goal: '${goal.heading}'.
    Generate a structured summary that includes:

    1. **Introduction**:
      - Address the user by their first name (${profile.firstname}).
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
      model: 'gpt-4o',
      messages: [
        { role: "system", content: systemMessage },
        { role: "user", content: userMessage }
      ],
    });

    // Send email with the AI-generated summary
    const emailInfo = await sendEmail({
      to: email,
      subject: 'Your Progress Report',
      text: response.choices[0].message.content,
      html: `<p>${response.choices[0].message.content}</p>`,
    });

    console.log('Email sent:', emailInfo.messageId);

    return res.status(200).json({ result: response.choices[0].message.content });
  } catch (error) {
    console.error('Error with OpenAI API or email:', error);
    return res.status(500).json({ error: 'Failed to generate completion or send email' });
  }
}
