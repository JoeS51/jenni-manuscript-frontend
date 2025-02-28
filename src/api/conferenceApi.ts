import { supabase } from './supabaseClient';

export interface Conference {
  id: string;
  name: string;
  website_url?: string;
  requirements?: string;
}

export const getConferences = async (): Promise<Conference[]> => {
  const { data, error } = await supabase
    .from('conferences')
    .select('*')
    .order('name');

  if (error) {
    console.error('Error fetching conferences:', error);
    throw error;
  }

  return data || [];
};

export const addConference = async (conference: Omit<Conference, 'id'>) => {
  const { data, error } = await supabase
    .from('conferences')
    .insert([conference])
    .select();

  if (error) {
    console.error('Error adding conference:', error);
    throw error;
  }

  return data?.[0];
};
