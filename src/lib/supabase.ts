import { createClient } from '@supabase/supabase-js';

const DEFAULT_SUPABASE_URL = 'https://evomrjbbedgpxdwinzyt.supabase.co';
const DEFAULT_SUPABASE_ANON_KEY = 'sb_publishable_uWnW6VyQQY6Nb4xBL8Mv8w_EOARB_1f';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || DEFAULT_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || DEFAULT_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const isSupabaseConfigured = (): boolean => true;
