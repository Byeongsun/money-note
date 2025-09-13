import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

declare global {
  interface ImportMeta {
    env: {
      VITE_SUPABASE_URL: string;
      VITE_SUPABASE_PUBLISHABLE_KEY: string;
      DEV: boolean;
    };
  }
}

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

if (!SUPABASE_URL) throw new Error('Missing SUPABASE_URL');
if (!SUPABASE_ANON_KEY) throw new Error('Missing SUPABASE_ANON_KEY');

// Get current domain for OAuth redirect
const SITE_URL = import.meta.env.DEV 
  ? 'http://localhost:5173'
  : 'https://money-note.vercel.app';

const REDIRECT_URL = `${SITE_URL}/auth/callback`;

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    storage: localStorage,
    flowType: 'pkce',
  },
  global: {
    headers: {
      'x-redirect-url': REDIRECT_URL,
    },
  },
});
