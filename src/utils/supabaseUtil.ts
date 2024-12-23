
import { createClient, PostgrestError, SupabaseClient } from '@supabase/supabase-js';

const supabaseClient: SupabaseClient = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

interface Profile {
	id: number;
	firstname: string;
	email: string;
	occupation: string;
	created_at: string;
	goals: number; // Foreign key to goals table
	msg_frequencies: number; // Foreign key to msg_frequencies table
}

interface Goal {
	id: number;
	heading: string;
	description: string;
	created_at: string;
}

interface MsgFrequency {
	id: number;
	time_interval: string;
	created_at: string;
}

interface JournalEntry {
	id: number;
	user_id: number;
	content: string;
	created_at: string;
}

// Profiles
async function getAllProfiles(): Promise<Profile[]> {
	// Fetch and return all profiles
	const { data, error } = await supabaseClient.from('profiles').select('*');
	if (error) {
		console.error("Error Fetching Profiles: ", error);
		return [];
	}

	return data;

}	

async function getProfileById(id: number): Promise<Profile | null> {
	// Fetch and return a profile by ID

	const { data, error } = await supabaseClient.from('profiles').select('*').eq('id', id).single();
	if (error) {
        console.error("Error Fetching Profile by ID: ", error);
        return null;
    }

	return data;
	
}
async function addProfile(firstname: string, email: string, occupation: string, goalId: number, msgFrequencyId: number): Promise<Profile | null> {
	// Add a new profile and return it
	const { data, error } = await supabaseClient.from('profiles').insert({firstname, email, occupation, goals: goalId, msg_frequencies: msgFrequencyId}).single();

	if (error) {
		console.error("Error Adding Profile: ", error);
		return null;
	}

	return data;
}

async function deleteProfileById(id: number): Promise<boolean> {
	// Delete a profile by ID and return success status
	const { error } = await supabaseClient.from('profiles').delete().eq('id', id);

	if (error) {
		console.error("Error Deleting Profile by ID: ", error);
		return false;
	}

	return true;



}

// Goals (Static Data)
async function getAllGoals(): Promise<Goal[]> {
	// Fetch and return all goals

	const { data, error } = await supabaseClient.from('goals').select('*');

	if (error) {
		console.error("Error Fetching Goals: ", error);
		return [];
	}

	return data;
}



async function getGoalById(id: number): Promise<Goal | null> {

	const { data, error } = await supabaseClient.from('goals').select('*').eq('id', id).single();

	if (error) {
		console.error("Error Fetching Goal by ID: ", error);
		return null;
	}

	return data;
}

async function getGoalByHeading(heading: string): Promise<Goal | null> {
	// Fetch and return a goal by heading
	const { data, error } = await supabaseClient.from('goals').select('*').eq('heading', heading).single();

	if (error) {
		console.error("Error Fetching Goal by Heading: ", error);
		return null;
	}

	return data;
}

// Message Frequencies (Static Data)
async function getAllMsgFrequencies(): Promise<MsgFrequency[]> {
	// Fetch and return all message frequencies

	const { data, error } = await supabaseClient.from('msg_frequencies').select('*');

	if (error) {
		console.error("Error Fetching Message Frequencies: ", error);
		return [];
	}

	return data;
}

async function getMsgFrequencyById(id: number): Promise<MsgFrequency | null> {
	// Fetch and return a message frequency by ID
	const { data, error } = await supabaseClient.from('msg_frequencies').select('*').eq('id', id).single();

	if (error) {
		console.error("Error Fetching Message Frequency by ID: ", error);
		return null;
	}

	return data;
}
// Journal Entries
async function getJournalEntriesByUserId(userId: number): Promise<JournalEntry[]> {
	// Fetch and return all journal entries for a user

	const { data, error } = await supabaseClient.from('journal_entries').select('*').eq('user_id', userId);

	if (error) {
		console.error("Error Fetching Journal Entries by User ID: ", error);
		return [];
	}

	return data;
}

async function addJournalEntry(userId: number, content: string): Promise<JournalEntry | null> {
	// Add a new journal entry and return it
	const { data, error } = await supabaseClient.from('journal_entries').insert({user_id: userId, content}).single();

	if (error) {
		console.error("Error Adding Journal Entry: ", error);
		return null;
	}

	return data;

}

async function deleteJournalEntryById(id: number): Promise<boolean> {
	// Delete a journal entry by ID and return success status
	const { error } = await supabaseClient.from('journal_entries').delete().eq('id', id);

	if (error) {
		console.error("Error Deleting Journal Entry by ID: ", error);
		return false;
	}

	return true;
}

export {
	getAllProfiles,
	getProfileById,
	addProfile,
	deleteProfileById,
	getAllGoals,
	getGoalById,
	getGoalByHeading,
	getAllMsgFrequencies,
	getMsgFrequencyById,
	getJournalEntriesByUserId,
	addJournalEntry,
	deleteJournalEntryById,
};