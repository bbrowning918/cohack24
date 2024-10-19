// pages/api/signup.js
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { firstName, email, occupation } = req.body;

    // Insert user data into the 'profiles' table
    const { data, error } = await supabase
      .from('profiles')
      .insert([{ firstName, email, occupation }]);

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.status(200).json({ message: 'User data saved successfully', data });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
