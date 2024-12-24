
declare namespace NodeJS {
	interface ProcessEnv {
		// Add your environment variables here
		SUPABASE_URL: string;
		SUPABASE_KEY: string;
		NODE_ENV: 'development' | 'production' | 'test';
	}
}
