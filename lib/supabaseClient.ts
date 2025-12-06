import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// これがアプリ全体で使う「Supabaseへの直通電話」です
export const supabase = createClient(supabaseUrl, supabaseKey);