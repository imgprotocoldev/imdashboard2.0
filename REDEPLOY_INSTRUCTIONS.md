# 🔄 Redeploy Edge Function Instructions

## Why Redeploy?

I've updated the Edge Function to support **both** API formats:
- Your deployed format: `{ email, subject, message }`
- Our codebase format: `{ to, subject, body }`

This ensures backward compatibility and flexibility.

---

## 🚀 Quick Redeploy

```bash
# Navigate to your project
cd /home/van/imgdashboard2.0

# Redeploy the function
supabase functions deploy send-email
```

That's it! The function will now support both formats.

---

## 🧪 Test Both Formats

### Test Format 1 (Your deployed version):
```bash
curl -X POST https://bxnkvezalchegmulbkwo.supabase.co/functions/v1/send-email \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_SUPABASE_ANON_KEY" \
  -d '{
    "email": "test@example.com",
    "subject": "Test Email",
    "message": "This is a test"
  }'
```

### Test Format 2 (Our codebase):
```bash
curl -X POST https://bxnkvezalchegmulbkwo.supabase.co/functions/v1/send-email \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_SUPABASE_ANON_KEY" \
  -d '{
    "to": "test@example.com",
    "subject": "Test Email",
    "body": "This is a test"
  }'
```

Both should work! ✅

---

## 📝 What Changed

### Before:
```typescript
const { to, subject, body, html } = await req.json();
```

### After:
```typescript
const requestData = await req.json();

// Support both formats
const to = requestData.to || requestData.email;
const subject = requestData.subject;
const body = requestData.body || requestData.message;
const html = requestData.html;
```

---

## ✅ Verification

After redeploying, test by claiming a reward in your dashboard:

1. Open dashboard
2. Claim a reward
3. Check browser console for: `✅ Email sent successfully!`
4. Check admin emails for the notification

---

**Status**: Ready to redeploy  
**Command**: `supabase functions deploy send-email`

