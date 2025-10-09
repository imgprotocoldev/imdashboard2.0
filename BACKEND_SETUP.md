# Backend API Setup for Delete Profile Feature

## Overview
The backend API handles secure user deletion using Supabase's service role key, which should never be exposed in frontend code.

## Quick Setup

### 1. Create Environment File
Create `/home/van/imgdashboard2.0/backend/.env` with the following content:

```env
SUPABASE_URL=https://bxnkvezalchegmulbkwo.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ4bmt2ZXphbGNoZWdtdWxia3dvIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1ODg4NzE5NSwiZXhwIjoyMDc0NDYzMTk1fQ.W_yZUPKYHEXVvYZcPWFGS7lCZLYSrI7W6xNIjJEqgFk
PORT=3001
```

**⚠️ IMPORTANT:** This file is gitignored. Never commit the service role key to version control!

### 2. Start the Backend Server

```bash
cd backend
npm start
```

The API will run on `http://localhost:3001`

### 3. Test the API

```bash
curl http://localhost:3001/api/health
```

Should return: `{"status":"ok","message":"IMG Dashboard API is running"}`

## How It Works

### Frontend Flow (Already Implemented)
1. User clicks "Delete Profile" button
2. Confirmation: Button changes to "Delete now"
3. User clicks "Delete now"
4. Frontend:
   - Deletes profile data from `profiles` table
   - Calls backend API to delete auth user
   - Shows success message
   - Signs out user
   - Redirects to home page

### Backend API
- **Endpoint:** `POST /api/deleteUser`
- **Body:** `{ "user_id": "uuid" }`
- **Action:** Uses Supabase Admin Client to delete user from auth system
- **Security:** Service role key is only on backend, never exposed to frontend

## Fallback Behavior

If the backend API is not running:
- Profile data is still deleted from the database
- User is signed out
- Auth user remains in Supabase (but has no profile data)
- This is acceptable for development/testing

## Production Deployment

For production, you'll need to:
1. Deploy the backend API to a server (e.g., Vercel, Railway, Render)
2. Update the API URL in `UserInfoCard.tsx` line 804
3. Set environment variables on your hosting platform
4. Ensure CORS allows your production domain

## Alternative: Supabase Database Function

If you prefer not to run a separate backend, you can create a Supabase database function:

```sql
CREATE OR REPLACE FUNCTION delete_user_account()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Delete the user's profile
  DELETE FROM profiles WHERE id = auth.uid();
  
  -- Note: Cannot delete auth.users from SQL
  -- User will need to contact support or use backend API
END;
$$;
```

Then call it from frontend:
```typescript
await supabase.rpc('delete_user_account');
```

