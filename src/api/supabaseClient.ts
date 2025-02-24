import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Add this debug log
console.log('Initializing Supabase with:', {
  url: supabaseUrl,
  hasKey: !!supabaseAnonKey // Don't log the actual key
});

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Add a test function
export const testConnection = async () => {
  const { data, error } = await supabase
    .from('conferences')
    .select('count')
    .single();
  
  console.log('Test connection result:', { data, error });
  return { data, error };
};
