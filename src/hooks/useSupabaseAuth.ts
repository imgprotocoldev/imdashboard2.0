import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import type { Session, User } from '@supabase/supabase-js';

// Supabase configuration - using your provided credentials
const supabaseUrl = 'https://bxnkvezalchegmulbkwo.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ4bmt2ZXphbGNoZWdtdWxia3dvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg4ODcxOTUsImV4cCI6MjA3NDQ2MzE5NX0.tT3h83AKp_wsWDEahYTfYPot0fxFpgk_4fKOaonq5Qo';

// Create Supabase client with proper configuration for Vite
export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true, // Enable to detect OAuth callback
    flowType: 'pkce'
  },
  global: {
    headers: {
      'X-Client-Info': 'img-dashboard',
      'Content-Type': 'application/json'
    }
  },
  db: {
    schema: 'public'
  }
});

export function useSupabaseAuth() {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log('🔵 [Auth] Initial session check:', session ? 'Active' : 'None');
      if (session?.user) {
        console.log('🔵 [Auth] User:', {
          id: session.user.id,
          email: session.user.email,
          provider: session.user.app_metadata?.provider
        });
      }
      setSession(session);
      setUser(session?.user || null);
      setLoading(false);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      console.log('🔵 [Auth] State changed:', event);
      console.log('🔵 [Auth] Session:', session ? 'Active' : 'None');
      if (session?.user) {
        console.log('🔵 [Auth] User:', {
          id: session.user.id,
          email: session.user.email,
          provider: session.user.app_metadata?.provider
        });
      }
      setSession(session);
      setUser(session?.user || null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  return {
    session,
    user,
    loading,
    supabase,
  };
}
