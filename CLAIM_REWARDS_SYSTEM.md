# 🎁 Claim Rewards System

## Overview

The Claim Rewards System allows users to redeem their earned Raid Points for real rewards (SOL, IMG tokens, USDC, or IMG Burn). When a user claims a reward, a notification is sent to the admin email for manual processing.

---

## 📋 Features

### User Experience
- ✅ **Auto-filled Form**: Username, email, and wallet address are automatically populated from the user's profile
- ✅ **Editable Fields**: Users can modify any field before submitting
- ✅ **Validation**: All fields are validated before submission
- ✅ **Real-time Feedback**: Loading states, success messages, and error handling
- ✅ **Points Deduction**: Points are deducted immediately upon successful claim
- ✅ **Database Storage**: All claims are stored in the `reward_claims` table

### Admin Notification
- 📧 **Email to**: `imgrewards@proton.me`
- 📝 **Contains**:
  - Reward type and amount
  - Points spent
  - User information (username, email, wallet address, user ID)
  - Timestamp

---

## 🗄️ Database Schema

### `reward_claims` Table

```sql
CREATE TABLE reward_claims (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  username TEXT NOT NULL,
  email TEXT NOT NULL,
  wallet_address TEXT NOT NULL,
  reward_type TEXT NOT NULL,          -- e.g., "SOL Tokens", "IMG Tokens"
  reward_amount TEXT NOT NULL,        -- e.g., "5", "10", "25", "50"
  points_spent INTEGER NOT NULL,      -- Points deducted
  status TEXT NOT NULL DEFAULT 'pending',  -- pending, processing, completed, failed
  claimed_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  processed_at TIMESTAMP WITH TIME ZONE,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Indexes
- `idx_reward_claims_user_id`: Fast user lookup
- `idx_reward_claims_status`: Filter by status
- `idx_reward_claims_claimed_at`: Sort by claim date

### Row Level Security (RLS)
- ✅ Users can view their own claims
- ✅ Users can create their own claims
- ✅ Only service role can update claims (admin processing)

---

## 🔧 Setup Instructions

### 1. Database Migration

Run the migration to create the `reward_claims` table:

```bash
# If using Supabase CLI
supabase db push

# Or manually run the SQL file in Supabase Dashboard > SQL Editor
# File: supabase/migrations/create_reward_claims_table.sql
```

### 2. Email Configuration (Optional)

The system attempts to send emails via Supabase Edge Functions. If the function doesn't exist, it will gracefully fail and log the email data to the console for manual processing.

**To enable automatic emails**, create a Supabase Edge Function:

```bash
# Create the function
supabase functions new send-email

# Deploy it
supabase functions deploy send-email
```

**Example Edge Function** (`supabase/functions/send-email/index.ts`):

```typescript
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

serve(async (req) => {
  const { to, subject, body } = await req.json()

  // Use your preferred email service (SendGrid, Resend, etc.)
  // Example with SendGrid:
  const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${Deno.env.get('SENDGRID_API_KEY')}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      personalizations: [{ to: [{ email: to }] }],
      from: { email: 'noreply@imgprotocol.com' },
      subject: subject,
      content: [{ type: 'text/plain', value: body }],
    }),
  })

  return new Response(JSON.stringify({ success: response.ok }), {
    headers: { 'Content-Type': 'application/json' },
  })
})
```

### 3. Manual Email Processing (Fallback)

If automatic emails are not configured, check the browser console for email data:

```javascript
console.log('📧 Email to send:', {
  to: 'imgrewards@proton.me',
  subject: '🎁 New Reward Claim: SOL Tokens - $5 USD',
  body: '...'
})
```

You can manually copy this information and send the email.

---

## 📊 Admin Dashboard (Future Enhancement)

Consider building an admin dashboard to:
- View all pending reward claims
- Update claim status (pending → processing → completed)
- Add processing notes
- Filter and search claims
- Export claims to CSV

**Example Query** (Supabase Dashboard > SQL Editor):

```sql
-- View all pending claims
SELECT 
  rc.*,
  p.username as profile_username,
  p.avatar_name
FROM reward_claims rc
LEFT JOIN profiles p ON rc.user_id = p.id
WHERE rc.status = 'pending'
ORDER BY rc.claimed_at DESC;

-- Mark claim as completed
UPDATE reward_claims
SET 
  status = 'completed',
  processed_at = NOW(),
  notes = 'Sent 5 SOL to wallet address'
WHERE id = 'claim-uuid-here';
```

---

## 🎯 User Flow

1. **User earns Raid Points** by completing raids
2. **User selects reward** and amount on the Raid page
3. **User clicks "Claim Reward"** (if they have enough points)
4. **Modal opens** with pre-filled user information
5. **User reviews/edits** username, email, and wallet address
6. **User submits** the claim
7. **System**:
   - Validates the form
   - Deducts points from user's account
   - Stores claim in database
   - Sends email to admin (or logs to console)
8. **Success message** is shown
9. **Admin processes** the reward within 24-48 hours
10. **Admin sends** the reward to the user's wallet

---

## 🔒 Security Considerations

- ✅ **RLS Policies**: Users can only view/create their own claims
- ✅ **Validation**: All inputs are validated on the frontend
- ✅ **Points Check**: System verifies user has enough points before allowing claim
- ✅ **Immediate Deduction**: Points are deducted to prevent double-claiming
- ✅ **Audit Trail**: All claims are logged with timestamps and user IDs

---

## 🐛 Troubleshooting

### Issue: Email not sending
**Solution**: Check browser console for logged email data. Manually process or set up Supabase Edge Function.

### Issue: Points not deducting
**Solution**: Check `spendPoints` function in `useRaidProfile` hook. Verify database permissions.

### Issue: Modal not opening
**Solution**: Check browser console for errors. Verify `ClaimRewardModal` component is imported correctly.

### Issue: Database error on claim
**Solution**: Ensure `reward_claims` table exists and RLS policies are set up correctly.

---

## 📝 Files Modified/Created

### New Files
- `src/components/raid/ClaimRewardModal.tsx` - The claim rewards modal component
- `supabase/migrations/create_reward_claims_table.sql` - Database migration
- `CLAIM_REWARDS_SYSTEM.md` - This documentation

### Modified Files
- `src/pages/Raid.tsx` - Integrated the claim modal

---

## 🚀 Future Enhancements

1. **Automated Reward Distribution**: Integrate with Solana blockchain to automatically send rewards
2. **Email Confirmations**: Send confirmation emails to users when rewards are processed
3. **Admin Dashboard**: Build a UI for admins to manage claims
4. **Claim History**: Show users their past claims in their profile
5. **Webhook Integration**: Notify external systems when claims are made
6. **Multi-currency Support**: Add more reward types
7. **Reward Tiers**: Implement loyalty tiers with bonus rewards

---

## 📞 Support

For issues or questions, contact the development team or check the main project README.

