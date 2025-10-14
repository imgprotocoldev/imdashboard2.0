#!/bin/bash

# 📧 Deploy Email Function Script
# This script helps you deploy the send-email Edge Function to Supabase

set -e  # Exit on error

echo "📧 IMG Dashboard - Email Function Deployment"
echo "============================================"
echo ""

# Check if Supabase CLI is installed
if ! command -v supabase &> /dev/null; then
    echo "❌ Supabase CLI is not installed."
    echo ""
    echo "Install it with:"
    echo "  brew install supabase/tap/supabase  (macOS/Linux)"
    echo "  npm install -g supabase             (npm)"
    echo ""
    exit 1
fi

echo "✅ Supabase CLI found"
echo ""

# Check if user is logged in
echo "🔐 Checking Supabase login status..."
if ! supabase projects list &> /dev/null; then
    echo "❌ Not logged in to Supabase."
    echo ""
    echo "Please run: supabase login"
    echo ""
    exit 1
fi

echo "✅ Logged in to Supabase"
echo ""

# Prompt for project ref if not linked
echo "🔗 Checking project link..."
if [ ! -f ".supabase/config.toml" ]; then
    echo "⚠️  Project not linked."
    echo ""
    read -p "Enter your Supabase project reference ID: " PROJECT_REF
    echo ""
    echo "Linking project..."
    supabase link --project-ref "$PROJECT_REF"
    echo ""
fi

echo "✅ Project linked"
echo ""

# Prompt for Resend API key
echo "🔑 Setting up Resend API key..."
echo ""
echo "You need a Resend API key to send emails."
echo "Get one at: https://resend.com/api-keys"
echo ""
read -p "Enter your Resend API key (starts with 're_'): " RESEND_API_KEY

if [ -z "$RESEND_API_KEY" ]; then
    echo "❌ API key cannot be empty"
    exit 1
fi

echo ""
echo "Setting secret..."
supabase secrets set RESEND_API_KEY="$RESEND_API_KEY"
echo ""
echo "✅ Secret set successfully"
echo ""

# Deploy the function
echo "🚀 Deploying send-email function..."
echo ""
supabase functions deploy send-email
echo ""
echo "✅ Function deployed successfully!"
echo ""

# Test the function
echo "🧪 Would you like to send a test email? (y/n)"
read -p "> " TEST_EMAIL

if [ "$TEST_EMAIL" = "y" ] || [ "$TEST_EMAIL" = "Y" ]; then
    echo ""
    read -p "Enter your email address for testing: " TEST_EMAIL_ADDRESS
    echo ""
    echo "Sending test email..."
    
    supabase functions invoke send-email \
      --body "{\"to\":\"$TEST_EMAIL_ADDRESS\",\"subject\":\"Test Email from IMG Dashboard\",\"body\":\"This is a test email. If you received this, your email function is working correctly!\"}"
    
    echo ""
    echo "✅ Test email sent! Check your inbox at $TEST_EMAIL_ADDRESS"
fi

echo ""
echo "============================================"
echo "🎉 Email function setup complete!"
echo ""
echo "Next steps:"
echo "  1. Check your email for the test message"
echo "  2. Verify your domain in Resend Dashboard"
echo "  3. Test reward claims in your dashboard"
echo ""
echo "For more info, see: EMAIL_SETUP_GUIDE.md"
echo "============================================"

