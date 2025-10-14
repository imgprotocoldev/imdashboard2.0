# 📧 Email Notification Setup Guide

Complete guide to setting up automated email notifications for your IMG Dashboard using Supabase Edge Functions and Resend.

---

## 📋 Overview

This setup enables your dashboard to send automated emails for:
- ✅ Reward claim notifications to admins
- ✅ Welcome emails to new users
- ✅ XP reward notifications
- ✅ Custom notifications

**Email Service**: Resend (https://resend.com)  
**Sender**: `IMG Dashboard <no-reply@imgsolana.com>`  
**Admin Recipients**: 
- `imgrewards@proton.me`
- `imgprotocol18@gmail.com`

---

## 🚀 Quick Setup (5 Steps)

### Step 1: Sign Up for Resend

1. Go to https://resend.com
2. Sign up for a free account (100 emails/day free)
3. Verify your email address

### Step 2: Add Your Domain to Resend

1. In Resend Dashboard, go to **Domains**
2. Click **Add Domain**
3. Enter your domain: `imgsolana.com`
4. Follow the DNS verification steps:
   - Add the provided DNS records to your domain registrar
   - Wait for verification (usually 5-30 minutes)

**DNS Records to Add:**
```
Type: TXT
Name: _resend
Value: [provided by Resend]

Type: MX
Name: @
Value: [provided by Resend]
Priority: 10
```

### Step 3: Get Your Resend API Key

1. In Resend Dashboard, go to **API Keys**
2. Click **Create API Key**
3. Name it: `IMG Dashboard Production`
4. Copy the API key (starts with `re_`)
5. **Save it securely** - you won't see it again!

**Your API Key**: `re_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`

### Step 4: Install Supabase CLI (if not already installed)

```bash
# macOS/Linux
brew install supabase/tap/supabase

# Windows (PowerShell)
scoop bucket add supabase https://github.com/supabase/scoop-bucket.git
scoop install supabase

# Or use npm
npm install -g supabase
```

### Step 5: Deploy the Edge Function

```bash
# Navigate to your project
cd /home/van/imgdashboard2.0

# Login to Supabase (if not already logged in)
supabase login

# Link your project (replace with your project ref)
supabase link --project-ref YOUR_PROJECT_REF

# Set the Resend API key as a secret
supabase secrets set RESEND_API_KEY=re_your_actual_api_key_here

# Deploy the send-email function
supabase functions deploy send-email

# Test the function (optional)
supabase functions invoke send-email --body '{"to":"your-email@example.com","subject":"Test Email","body":"This is a test email from IMG Dashboard"}'
```

---

## 🔧 Configuration Details

### Environment Variables

The Edge Function requires these environment variables (automatically set by Supabase):

| Variable | Description | Set By |
|----------|-------------|--------|
| `RESEND_API_KEY` | Your Resend API key | You (via `supabase secrets set`) |
| `SUPABASE_URL` | Your Supabase project URL | Supabase (automatic) |
| `SUPABASE_ANON_KEY` | Your Supabase anon key | Supabase (automatic) |

### Project Reference

Your Supabase project reference can be found in:
- Supabase Dashboard → Project Settings → General → Reference ID

**Example**: `bxnkvezalchegmulbkwo`

---

## 📁 File Structure

```
/home/van/imgdashboard2.0/
├── supabase/
│   └── functions/
│       └── send-email/
│           ├── index.ts          # Edge Function code
│           └── deno.json          # Deno configuration
└── src/
    └── utils/
        └── emailService.ts        # Frontend email utility
```

---

## 🎯 Usage Examples

### 1. Send Reward Claim Notification (Already Integrated)

```typescript
import { sendRewardClaimNotification } from '../../utils/emailService';

const result = await sendRewardClaimNotification({
  rewardName: 'SOL Tokens',
  rewardAmount: '5',
  requiredPoints: 300,
  username: 'john_doe',
  email: 'john@example.com',
  walletAddress: 'ABC123...',
  userId: 'user-uuid',
});

if (result.success) {
  console.log('✅ Notification sent to admins');
}
```

### 2. Send Welcome Email

```typescript
import { sendWelcomeEmail } from '../utils/emailService';

// After user signs up
const result = await sendWelcomeEmail(
  user.email,
  user.username
);
```

### 3. Send XP Reward Notification

```typescript
import { sendXPRewardNotification } from '../utils/emailService';

// After user earns XP
const result = await sendXPRewardNotification(
  user.email,
  user.username,
  50,
  'Completed a raid'
);
```

### 4. Send Custom Email

```typescript
import { sendEmail } from '../utils/emailService';

const result = await sendEmail({
  to: 'user@example.com',
  subject: 'Custom Subject',
  body: 'Plain text body',
  html: '<h1>HTML body (optional)</h1>',
});
```

---

## 🧪 Testing

### Test via Supabase CLI

```bash
# Test with a simple email
supabase functions invoke send-email \
  --body '{
    "to": "your-email@example.com",
    "subject": "Test Email",
    "body": "This is a test email from IMG Dashboard"
  }'
```

### Test via Frontend

1. Open your dashboard
2. Earn enough points to claim a reward
3. Click "Claim Reward"
4. Fill in the form and submit
5. Check both admin emails:
   - `imgrewards@proton.me`
   - `imgprotocol18@gmail.com`
6. Check browser console for logs:
   ```
   📧 Sending reward claim notification to admin emails...
   ✅ Email sent successfully
   ```

---

## 🔍 Troubleshooting

### Issue: "RESEND_API_KEY is not set"

**Solution**: Set the secret using Supabase CLI:
```bash
supabase secrets set RESEND_API_KEY=re_your_actual_api_key_here
```

### Issue: "Domain not verified"

**Solution**: 
1. Check DNS records in your domain registrar
2. Wait 5-30 minutes for propagation
3. Verify in Resend Dashboard

### Issue: "Failed to send email"

**Solution**: Check browser console and Supabase logs:
```bash
# View function logs
supabase functions logs send-email
```

### Issue: "Authentication failed"

**Solution**: The Edge Function allows unauthenticated requests for admin notifications. If you want to restrict it, modify the function to require authentication.

---

## 📊 Monitoring

### View Function Logs

```bash
# Real-time logs
supabase functions logs send-email --follow

# Recent logs
supabase functions logs send-email --limit 50
```

### Check Email Delivery in Resend

1. Go to Resend Dashboard
2. Click **Emails** in the sidebar
3. View delivery status, opens, clicks, etc.

---

## 💰 Pricing

### Resend Free Tier
- ✅ 100 emails/day
- ✅ 3,000 emails/month
- ✅ All features included

### Resend Paid Plans
- **Pro**: $20/month for 50,000 emails/month
- **Business**: Custom pricing

### Supabase Edge Functions
- ✅ 500,000 invocations/month (free tier)
- ✅ 2GB outbound data transfer/month (free tier)

---

## 🔒 Security Best Practices

1. ✅ **Never commit API keys** to Git
2. ✅ **Use Supabase Secrets** for sensitive data
3. ✅ **Enable domain verification** in Resend
4. ✅ **Monitor email logs** for suspicious activity
5. ✅ **Set rate limits** if needed (in Edge Function)

---

## 🎨 Customization

### Change Sender Email

Edit `/supabase/functions/send-email/index.ts`:

```typescript
const emailData = {
  from: 'Your Name <your-email@yourdomain.com>',
  // ...
};
```

### Add HTML Templates

Use the `html` parameter for rich emails:

```typescript
await sendEmail({
  to: 'user@example.com',
  subject: 'Welcome!',
  body: 'Plain text fallback',
  html: `
    <div style="font-family: Arial, sans-serif;">
      <h1>Welcome to IMG Dashboard!</h1>
      <p>We're excited to have you.</p>
    </div>
  `,
});
```

### Add More Recipients

Edit `/src/utils/emailService.ts`:

```typescript
const adminEmails = [
  'imgrewards@proton.me',
  'imgprotocol18@gmail.com',
  'another-admin@example.com', // Add more
];
```

---

## 📚 Additional Resources

- **Resend Documentation**: https://resend.com/docs
- **Supabase Edge Functions**: https://supabase.com/docs/guides/functions
- **Deno Documentation**: https://deno.land/manual

---

## ✅ Verification Checklist

Before going live, verify:

- [ ] Resend account created
- [ ] Domain verified in Resend
- [ ] API key generated and saved
- [ ] Supabase CLI installed
- [ ] Project linked to Supabase
- [ ] `RESEND_API_KEY` secret set
- [ ] Edge Function deployed
- [ ] Test email sent successfully
- [ ] Admin emails received test notification
- [ ] Frontend integration working
- [ ] Browser console shows success logs

---

## 🆘 Support

If you encounter issues:

1. Check the [Troubleshooting](#-troubleshooting) section
2. View Supabase function logs: `supabase functions logs send-email`
3. Check Resend Dashboard for email delivery status
4. Review browser console for frontend errors

---

**Last Updated**: $(date)  
**Version**: 1.0.0

