# Deployment Guide for IMG Protocol Dashboard

## Server Setup Steps

### 1. Upload Files
- Upload the entire `integrated-dashboard` folder to your web server
- Ensure Node.js and npm are installed on your server

### 2. Install Dependencies
```bash
cd /path/to/your/integrated-dashboard
npm install
```

### 3. Build for Production
```bash
npm run build
```

### 4. Configure Web Server

#### For Apache (.htaccess):
```
RewriteEngine On
RewriteRule ^$ dist/index.html [L]
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /dist/index.html [L]
```

#### For Nginx:
```
location / {
    try_files $uri $uri/ /index.html;
}
```

### 5. Set Document Root
Point your web server's document root to the `dist` folder generated after building.

## Production Notes
- The dashboard requires JavaScript to be enabled
- Solana wallet connection features work best over HTTPS
- Premium features require local storage to work properly
- Make sure CORS is properly configured for API calls
