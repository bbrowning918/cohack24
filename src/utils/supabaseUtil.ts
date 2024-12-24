import { createClient, SupabaseClient } from '@supabase/supabase-js';

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
	const { data, error } = await supabaseClient
		.from('profiles')
		.select('*');

	if (error) {
		throw new Error(`Error fetching profiles: ${error.message}`);
	}

	return data!;
}

async function getProfileById(id: number): Promise<Profile | null> {
	const { data, error } = await supabaseClient
		.from('profiles')
		.select('*')
		.eq('id', id)
		.single();

	if (error) {
		throw new Error(`Error fetching profile by ID (${id}): ${error.message}`);
	}

	return data;
}

async function addProfile(firstname: string, email: string, occupation: string, goalId: number, msgFrequencyId: number): Promise<Profile | null> {
	const { data, error } = await supabaseClient
		.from('profiles')
		.insert([
			{
				firstname,
				email,
				occupation,
				goal_id: goalId,
				msg_frequency_id: msgFrequencyId,
			},
		])
		.single();

	if (error) {
		throw new Error(`Error adding profile: ${error.message}`);
	}

	return data;
}

async function deleteProfileById(id: number): Promise<void> {
	const { error } = await supabaseClient
		.from('profiles')
		.delete()
		.eq('id', id);

	if (error) {
		throw new Error(`Error deleting profile by ID (${id}): ${error.message}`);
	}

}

// Goals (Static Data)
async function getAllGoals(): Promise<Goal[]> {
	const { data, error } = await supabaseClient
		.from('goals')
		.select('*');

	if (error) {
		throw new Error(`Error fetching goals: ${error.message}`);
	}

	return data!;
}

async function getGoalById(id: number): Promise<Goal | null> {
	const { data, error } = await supabaseClient
		.from('goals')
		.select('*')
		.eq('id', id)
		.single();

	if (error) {
		throw new Error(`Error fetching goal by ID (${id}): ${error.message}`);
	}

	return data;
}

async function getGoalByHeading(heading: string): Promise<Goal | null> {
	const { data, error } = await supabaseClient
		.from('goals')
		.select('*')
		.eq('heading', heading)
		.single();

	if (error) {
		throw new Error(`Error fetching goal by heading (${heading}): ${error.message}`);
	}

	return data;
}

// Message Frequencies (Static Data)
async function getAllMsgFrequencies(): Promise<MsgFrequency[]> {
	const { data, error } = await supabaseClient
		.from('msg_frequencies')
		.select('*');

	if (error) {
		throw new Error(`Error fetching message frequencies: ${error.message}`);
	}

	return data!;
}

async function getMsgFrequencyById(id: number): Promise<MsgFrequency | null> {
	const { data, error } = await supabaseClient
		.from('msg_frequencies')
		.select('*')
		.eq('id', id)
		.single();

	if (error) {
		throw new Error(`Error fetching message frequency by ID (${id}): ${error.message}`);
	}

	return data;
}

// Journal Entries
async function getJournalEntriesByUserId(userId: number): Promise<JournalEntry[]> {
	const { data, error } = await supabaseClient
		.from('journal_entries')
		.select('*')
		.eq('user_id', userId);

	if (error) {
		throw new Error(`Error fetching journal entries for user ID (${userId}): ${error.message}`);
	}

	return data!;
}

async function addJournalEntry(userId: number, content: string): Promise<JournalEntry | null> {
	const { data, error } = await supabaseClient
		.from('journal_entries')
		.insert([
			{
				user_id: userId,
				content,
			},
		])
		.single();

	if (error) {
		throw new Error(`Error adding journal entry for user ID (${userId}): ${error.message}`);
	}

	return data;
}

async function deleteJournalEntryById(id: number): Promise<boolean> {
	const { error } = await supabaseClient
		.from('journal_entries')
		.delete()
		.eq('id', id);

	if (error) {
		throw new Error(`Error deleting journal entry by ID (${id}): ${error.message}`);
	}

	return true;
}

const db = {
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

export default db;
