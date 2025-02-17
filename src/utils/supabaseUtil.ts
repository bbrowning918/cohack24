import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseClient: SupabaseClient = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

import { Profile, JournalEntry, Goal, EmailFrequency, AuthData } from '@/types/interfaces';
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

async function addProfile(firstname: string, email: string, occupation: string, goalId: number, emailFrequnecyId: number, authUserId: string): Promise<Profile | null> {
	const { data, error } = await supabaseClient
		.from('profiles')
		.insert([
			{
				firstname,
				email,
				occupation,
				goal_id: goalId,
				email_frequency_id: emailFrequnecyId,
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
async function getAllEmailFrequencies(): Promise<EmailFrequency[]> {
	const { data, error } = await supabaseClient
		.from('email_frequencies')
		.select('*');

	if (error) {
		throw new Error(`Error fetching message frequencies: ${error.message}`);
	}

	return data!;
}

async function getEmailFrequencyById(id: number): Promise<EmailFrequency | null> {
	const { data, error } = await supabaseClient
		.from('email_frequencies')
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

async function createVerificationCode(authUserId: string): Promise<string> {
	// Generate a 6-digit random verification code
	const code = Math.floor(100000 + Math.random() * 900000).toString();

	// Insert the code into the verification_codes table
	const { data, error } = await supabaseClient.from('verification_codes').insert([
		{
			user_id: authUserId,
			code,
			expires_at: new Date(Date.now() + 15 * 60 * 1000), // Code expires in 15 minutes
		},
	]);

	if (error) {
		throw new Error(`Error creating verification code: ${error.message}`);
	}

	// Return the generated code
	return code;
}

async function createUser(email: string, password: string): Promise<AuthData> {
	const { data, error } = await supabaseClient.auth.signUp({
        email,
        password,
    });
	
	if (!data.user) {
		throw new Error('Failed to create user: No user returned from Supabase');
	}

	if (!data.session) {
		throw new Error('Failed to create user: No session returned from Supabase');
	}

    if (error) {
        throw new Error(`Error creating user: ${error.message}`);
    }

    return {
		user: data.user,
		session: data.session,
	};
}

async function getAuthIdByEmail(email: string): Promise<string| null> {
	const {data, error} = await supabaseClient
		.from('auth.users')
		.select('id')
		.eq('email', email)
		.single();
	
	if (error) {
		throw new Error(`Error fetching auth ID by email (${email}): ${error.message}`);
	}
	

	

	return data?.id || null;

}

async function getVerificationByAuthId(authId: string | null): Promise<string| null> {
	const {data, error} = await supabaseClient
        .from('verification_codes')
        .select('code')
        .eq('user_id', authId)
        .single();

	if (!authId) {
		throw new Error("Can't pass in null value for authId")
	}
    
    if (error) {
        throw new Error(`Error fetching verification code by auth ID (${authId}): ${error.message}`);
    }

    return data?.code || null;
}


const db = {
	getAllProfiles,
	getProfileById,
	addProfile,
	deleteProfileById,
	getAllGoals,
	getGoalById,
	getGoalByHeading,
	getAllEmailFrequencies,
	getEmailFrequencyById,
	getJournalEntriesByUserId,
	addJournalEntry,
	deleteJournalEntryById,
	createVerificationCode,
	createUser,
	getAuthIdByEmail,
	getVerificationByAuthId,
};

export default db;
