# Domain Redirect Setup

## Method 1: .htaccess Redirect (Apache)
Create a `.htaccess` file in your website root with:

```apache
# Redirect root domain to integrated-dashboard
RewriteEngine On
RewriteRule ^$ integrated-dashboard/ [L]
RewriteRule ^$ integrated-dashboard/index.html [L]
```

## Method 2: Index file redirect
Create `index.html` in your root directory with:

```html
<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="refresh" content="0; url=integrated-dashboard/">
    <script>window.location.href = "integrated-dashboard/";</script>
</head>
<body>
    <p>Redirecting to dashboard...</p>
</body>
</html>
```

## Method 3: Server configuration
Configure your web server to use integrated-dashboard as document root.

This keeps folder organized and makes main domain point to dashboard.
