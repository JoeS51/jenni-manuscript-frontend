import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://eaqbueomezhvczprfwgo.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVhcWJ1ZW9tZXpodmN6cHJmd2dvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY4MTAxNjUsImV4cCI6MjA1MjM4NjE2NX0.dH5AxJELCLP9bR8cKcff_HuEFzzZ-yu4NQ13e6RwuTI';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
