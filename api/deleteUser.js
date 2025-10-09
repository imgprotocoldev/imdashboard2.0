import { createClient } from '@supabase/supabase-js';

// Initialize Supabase Admin Client with service role key
const supabaseAdmin = createClient(
  process.env.SUPABASE_URL || 'https://bxnkvezalchegmulbkwo.supabase.co',
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
);

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // Handle preflight OPTIONS request
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { user_id } = req.body;

    if (!user_id) {
      return res.status(400).json({ error: 'Missing user_id' });
    }

    console.log(`Attempting to delete user: ${user_id}`);

    // Delete user from Supabase Auth using admin privileges
    const { data, error } = await supabaseAdmin.auth.admin.deleteUser(user_id);

    if (error) {
      console.error('Error deleting user:', error);
      return res.status(400).json({ error: error.message });
    }

    console.log(`Successfully deleted user: ${user_id}`);
    return res.status(200).json({ success: true, message: 'User deleted successfully' });
  } catch (err) {
    console.error('Server error:', err);
    return res.status(500).json({ error: 'Internal server error', details: err.message });
  }
}

