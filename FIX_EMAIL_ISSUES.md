# 🔧 Fix Email Issues - Step by Step

## 🚨 Issues Identified:

1. ❌ **OPTIONS request returning 500 error** - CORS preflight failing
2. ❌ **Database error** - `reward_claims` table not created
3. ❌ **Edge Function outdated** - Needs redeployment with updated code

---

## ✅ **Solution 1: Create the Database Table**

The `reward_claims` table doesn't exist yet. Let's create it:

### **Step 1: Go to Supabase Dashboard**
1. Open https://supabase.com/dashboard
2. Select your project: `bxnkvezalchegmulbkwo`
3. Go to **SQL Editor** (left sidebar)

### **Step 2: Run This SQL**

Copy and paste this entire SQL script:

```sql
-- Create reward_claims table to store reward claim requests
CREATE TABLE IF NOT EXISTS reward_claims (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  username TEXT NOT NULL,
  email TEXT NOT NULL,
  wallet_address TEXT NOT NULL,
  reward_type TEXT NOT NULL,
  reward_amount TEXT NOT NULL,
  points_spent INTEGER NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  claimed_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  processed_at TIMESTAMP WITH TIME ZONE,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add indexes for faster queries
CREATE INDEX IF NOT EXISTS idx_reward_claims_user_id ON reward_claims(user_id);
CREATE INDEX IF NOT EXISTS idx_reward_claims_status ON reward_claims(status);
CREATE INDEX IF NOT EXISTS idx_reward_claims_claimed_at ON reward_claims(claimed_at DESC);

-- Enable Row Level Security
ALTER TABLE reward_claims ENABLE ROW LEVEL SECURITY;

-- Policy: Users can view their own claims
CREATE POLICY "Users can view own reward claims"
  ON reward_claims
  FOR SELECT
  USING (auth.uid() = user_id);

-- Policy: Users can insert their own claims
CREATE POLICY "Users can create own reward claims"
  ON reward_claims
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Add trigger to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_reward_claims_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_reward_claims_updated_at_trigger
  BEFORE UPDATE ON reward_claims
  FOR EACH ROW
  EXECUTE FUNCTION update_reward_claims_updated_at();

-- Add comment to table
COMMENT ON TABLE reward_claims IS 'Stores reward claim requests from users';
```

### **Step 3: Click "Run"**

You should see: `Success. No rows returned`

---

## ✅ **Solution 2: Redeploy the Edge Function**

Your Edge Function needs to be updated with the CORS fix.

### **Option A: Via Supabase Dashboard** (Easiest)

1. Go to https://supabase.com/dashboard
2. Select your project: `bxnkvezalchegmulbkwo`
3. Go to **Edge Functions** (left sidebar)
4. Click on **`send-email`** function
5. Click **"Edit"** or **"Deploy new version"**
6. Copy the entire code from: `/home/van/imgdashboard2.0/supabase/functions/send-email/index.ts`
7. Paste it into the editor
8. Click **"Deploy"**

### **Option B: Via Supabase CLI** (If installed)

```bash
# Install Supabase CLI first (if not installed)
npm install -g supabase

# Login
supabase login

# Link project
supabase link --project-ref bxnkvezalchegmulbkwo

# Deploy
supabase functions deploy send-email --no-verify-jwt
```

---

## ✅ **Solution 3: Set Environment Variables**

Make sure your Edge Function has the required environment variables:

### **In Supabase Dashboard:**

1. Go to **Project Settings** → **Edge Functions**
2. Add these secrets:
   - **`RESEND_API_KEY`**: Your Resend API key (starts with `re_`)

### **Via CLI:**

```bash
supabase secrets set RESEND_API_KEY=re_your_actual_api_key_here
```

---

## 🧪 **Test After Fixes**

### **Test 1: Check if Table Exists**

In Supabase Dashboard → SQL Editor:

```sql
SELECT * FROM reward_claims LIMIT 1;
```

Should return: `Success. No rows returned` (or show existing claims)

### **Test 2: Test Edge Function via curl**

```bash
curl -X POST https://bxnkvezalchegmulbkwo.supabase.co/functions/v1/send-email \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_SUPABASE_ANON_KEY" \
  -d '{
    "email": "your-test-email@example.com",
    "subject": "Test Email",
    "message": "This is a test"
  }'
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Email sent successfully",
  "data": { ... }
}
```

### **Test 3: Claim a Reward in Dashboard**

1. Open your dashboard
2. Go to Raid page
3. Click "Claim Reward"
4. Fill in the form
5. Submit

**Check Console (F12):**
- Should see: `✅ Email sent successfully!`
- NOT: `❌ Failed to send email`

**Check Admin Emails:**
- `imgrewards@proton.me`
- `imgprotocol18@gmail.com`

---

## 🔍 **Debugging**

### **View Edge Function Logs**

In Supabase Dashboard:
1. Go to **Edge Functions**
2. Click on **`send-email`**
3. Click **"Logs"** tab
4. Look for errors

### **Common Errors:**

#### **Error: "RESEND_API_KEY is not set"**
**Fix**: Set the secret in Project Settings → Edge Functions

#### **Error: "CORS preflight failed"**
**Fix**: Redeploy the Edge Function with updated code

#### **Error: "relation 'reward_claims' does not exist"**
**Fix**: Run the SQL script to create the table

#### **Error: "Failed to send a request to the Edge Function"**
**Fix**: 
1. Check if function is deployed
2. Check CORS headers
3. Redeploy with `--no-verify-jwt` flag

---

## 📋 **Quick Checklist**

- [ ] Create `reward_claims` table (SQL script)
- [ ] Redeploy Edge Function with updated code
- [ ] Set `RESEND_API_KEY` environment variable
- [ ] Test Edge Function via curl
- [ ] Test claim reward in dashboard
- [ ] Check admin emails for notification

---

## 🆘 **Still Having Issues?**

### **Check These:**

1. **Supabase Project Settings**:
   - Project URL: `https://bxnkvezalchegmulbkwo.supabase.co`
   - Anon Key: Check in Project Settings → API

2. **Resend Account**:
   - API key is valid
   - Domain is verified (optional but recommended)

3. **Browser Console**:
   - Look for detailed error messages
   - Check Network tab for failed requests

4. **Edge Function Logs**:
   - Check for runtime errors
   - Check for CORS errors

---

## 📧 **Alternative: Manual Email Processing**

If you can't get the Edge Function working immediately, you can manually process claims:

1. Claims are still saved to the database
2. Check browser console for email data
3. Manually send emails using the logged information

---

**Last Updated**: $(date)  
**Status**: Troubleshooting Guide

