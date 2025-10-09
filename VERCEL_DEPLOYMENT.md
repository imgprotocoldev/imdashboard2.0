# Vercel Serverless API Deployment Guide

This guide shows you how to deploy the delete user API as a serverless function on Vercel.

## Option 1: Deploy via Vercel CLI (Recommended)

### 1. Install Vercel CLI
```bash
npm install -g vercel
```

### 2. Login to Vercel
```bash
vercel login
```

### 3. Deploy
```bash
cd /home/van/imgdashboard2.0
vercel
```

Follow the prompts:
- **Set up and deploy?** Yes
- **Which scope?** Your account
- **Link to existing project?** No (first time) or Yes (updating)
- **Project name?** img-dashboard-api
- **Directory?** ./ (current directory)

### 4. Set Environment Variable
After deployment, add the environment variable:

```bash
vercel env add SUPABASE_SERVICE_ROLE_KEY
```

Paste this value when prompted:
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ4bmt2ZXphbGNoZWdtdWxia3dvIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1ODg4NzE5NSwiZXhwIjoyMDc0NDYzMTk1fQ.W_yZUPKYHEXVvYZcPWFGS7lCZLYSrI7W6xNIjJEqgFk
```

Select: **Production, Preview, and Development**

### 5. Redeploy with Environment Variable
```bash
vercel --prod
```

Your API will be available at: `https://your-project.vercel.app/api/deleteUser`

## Option 2: Deploy via Vercel Dashboard

### 1. Go to [vercel.com](https://vercel.com)
- Sign in with GitHub
- Click "Add New" → "Project"

### 2. Import Repository
- Select your `imdashboard2.0` repository
- Click "Import"

### 3. Configure Project
- **Framework Preset:** Other
- **Root Directory:** ./
- **Build Command:** Leave empty (we're only deploying the API)
- **Output Directory:** Leave empty

### 4. Add Environment Variable
- Go to **Settings** → **Environment Variables**
- Add:
  - **Name:** `SUPABASE_SERVICE_ROLE_KEY`
  - **Value:** `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ4bmt2ZXphbGNoZWdtdWxia3dvIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1ODg4NzE5NSwiZXhwIjoyMDc0NDYzMTk1fQ.W_yZUPKYHEXVvYZcPWFGS7lCZLYSrI7W6xNIjJEqgFk`
  - **Environments:** Production, Preview, Development

### 5. Deploy
- Click "Deploy"
- Wait for deployment to complete

## Option 3: Use Your Existing Server (FileZilla)

If you want to use your current hosting:

### 1. Upload via FileZilla
Upload the `api/` folder to your server where your main site is hosted.

### 2. Install Dependencies on Server (via SSH)
```bash
cd /path/to/your/site/api
npm install
```

### 3. Set Up Environment Variable
Create `.env` file on server:
```bash
nano .env
```
Add:
```
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ4bmt2ZXphbGNoZWdtdWxia3dvIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1ODg4NzE5NSwiZXhwIjoyMDc0NDYzMTk1fQ.W_yZUPKYHEXVvYZcPWFGS7lCZLYSrI7W6xNIjJEqgFk
```

### 4. Configure Your Server
You'll need to configure your web server (Apache/Nginx) to handle the `/api/deleteUser` endpoint as a Node.js function.

## Recommendation

**I recommend Option 1 or 2 (Vercel)** because:
- ✅ Free for serverless functions
- ✅ Automatic HTTPS
- ✅ No server configuration needed
- ✅ Scales automatically
- ✅ Easy environment variable management

Once deployed, the API will be at: `https://your-vercel-project.vercel.app/api/deleteUser`

Then you'll need to update the frontend code to use that URL in production!

Which option would you like to use?
