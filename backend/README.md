# IMG Dashboard Backend API

This is the backend API server for handling secure operations that require admin privileges.

## Setup

1. Install dependencies:
```bash
cd backend
npm install
```

2. Create `.env` file with your Supabase credentials:
```bash
SUPABASE_URL=https://bxnkvezalchegmulbkwo.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
PORT=3001
```

**IMPORTANT:** Get your service role key from Supabase Dashboard > Settings > API > service_role key

## Running the Server

Development mode (with auto-reload):
```bash
npm run dev
```

Production mode:
```bash
npm start
```

The API will run on `http://localhost:3001`

## Endpoints

### Health Check
- **GET** `/api/health`
- Returns server status

### Delete User
- **POST** `/api/deleteUser`
- Body: `{ "user_id": "uuid" }`
- Securely deletes user from Supabase Auth
- Requires service role key (never exposed to frontend)

## Security

- Service role key is stored in `.env` (never committed to git)
- CORS configured for localhost and production domain
- Only accepts requests from authorized origins

