import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Initialize Supabase Admin Client with service role key
const supabaseAdmin = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
);

// Middleware
app.use(cors({
  origin: ['http://localhost:5173', 'https://app.imgsolana.com'],
  credentials: true
}));
app.use(express.json());

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'IMG Dashboard API is running' });
});

// Delete user endpoint
app.post('/api/deleteUser', async (req, res) => {
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
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 IMG Dashboard API running on http://localhost:${PORT}`);
  console.log(`✅ Supabase Admin Client initialized`);
});

