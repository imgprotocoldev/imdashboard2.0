# 📧 Send Email Edge Function

Supabase Edge Function for sending emails via Resend API.

## 🚀 Quick Deploy

```bash
# Set your Resend API key
supabase secrets set RESEND_API_KEY=re_your_api_key_here

# Deploy the function
supabase functions deploy send-email

# Test it
supabase functions invoke send-email \
  --body '{"to":"test@example.com","subject":"Test","body":"Hello!"}'
```

## 📋 API

### Request

```json
{
  "to": "user@example.com",           // or ["user1@example.com", "user2@example.com"]
  "subject": "Email Subject",
  "body": "Plain text body",
  "html": "<h1>HTML body</h1>"        // optional
}
```

### Response (Success)

```json
{
  "success": true,
  "message": "Email sent successfully",
  "data": {
    "id": "email-id-from-resend"
  }
}
```

### Response (Error)

```json
{
  "success": false,
  "error": "Error message"
}
```

## 🔧 Configuration

### Required Environment Variables

- `RESEND_API_KEY` - Your Resend API key (set via `supabase secrets set`)
- `SUPABASE_URL` - Auto-set by Supabase
- `SUPABASE_ANON_KEY` - Auto-set by Supabase

### Sender Email

Default: `IMG Dashboard <no-reply@imgsolana.com>`

To change, edit line 83 in `index.ts`:
```typescript
from: 'Your Name <your-email@yourdomain.com>',
```

## 📊 Monitoring

```bash
# View logs
supabase functions logs send-email

# Real-time logs
supabase functions logs send-email --follow
```

## 🔒 Security

- ✅ CORS enabled for all origins
- ✅ Optional authentication check (currently logs warning)
- ✅ Input validation
- ✅ Error handling

## 📚 Learn More

- [Resend Documentation](https://resend.com/docs)
- [Supabase Edge Functions](https://supabase.com/docs/guides/functions)

