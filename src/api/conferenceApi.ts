import { supabase } from './supabaseClient';

export interface Conference {
  id: string;
  name: string;
  website_url?: string;
  requirements?: string;
}

export const getConferences = async (): Promise<Conference[]> => {
  try {
    const { data, error } = await supabase
      .from('conferences')
      .select('*')
      .order('name');

    if (error) {
      console.error('Error fetching conferences:', error.message);
      throw new Error(error.message);
    }

    return data || [];
  } catch (error) {
    console.error('Error in getConferences:', error);
    throw error;
  }
};

export const addConference = async (conference: Omit<Conference, 'id'>) => {
  try {
    console.log('Attempting to add conference:', conference);
    
    const { data, error } = await supabase
      .from('conferences')
      .insert([conference])
      .select();

    if (error) {
      console.error('Supabase error details:', {
        message: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code
      });
      throw new Error(error.message);
    }

    console.log('Successfully added conference:', data);
    return data?.[0];
  } catch (error) {
    console.error('Error in addConference:', error);
    throw error;
  }
};

export const updateConference = async (id: string, conference: Partial<Conference>) => {
  const { data, error } = await supabase
    .from('conferences')
    .update(conference)
    .eq('id', id)
    .select();

  if (error) {
    console.error('Error updating conference:', error);
    throw error;
  }

  return data?.[0];
};

export const deleteConference = async (id: string) => {
  const { error } = await supabase
    .from('conferences')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting conference:', error);
    throw error;
  }
}; 