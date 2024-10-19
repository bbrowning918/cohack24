import { createClient } from '@supabase/supabase-js';

// Initialize Supabase
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { firstname, email, occupation, goal, emailFrequency: msg_frequency } = req.body;

<<<<<<< HEAD

=======
>>>>>>> 4696b774b99ede0e4994baf087a8e3a63dca8041
    // Step 1: Insert a new goal if needed
    
    let goal_id = {"productivity": 1, "workProgress": 2, "midndfulness": 3}[goal];
    if (typeof goal === 'string') {
      const { data: goalData, error: goalError } = await supabase
        .from('goals')
        .insert([{ heading: goal }])
        .select('id')
        .single();

      if (goalError) {
        return res.status(400).json({ error: goalError.message });
      }

      goal_id = goalData.id;
    }

    // Step 2: Insert a new msg_frequency if needed
    let msg_frequency_id = msg_frequency;
    if (typeof msg_frequency === 'string') {
      const { data: freqData, error: freqError } = await supabase
        .from('msg_frequencies')
        .insert([{ frequency: msg_frequency }])
        .select('id')
        .single();

      if (freqError) {
        return res.status(400).json({ error: freqError.message });
      }

      msg_frequency_id = freqData.id;
    }

    // Step 3: Insert user data into the 'profiles' table
    const { data, error } = await supabase
      .from('profiles')
      .insert([{ firstname, email, occupation, goal_id, msg_frequency_id }]);

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.status(200).json({ message: 'User data saved successfully', data });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
