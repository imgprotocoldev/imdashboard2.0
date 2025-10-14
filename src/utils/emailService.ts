/**
 * Email Service Utility
 * 
 * This utility provides functions to send emails via Supabase Edge Functions.
 * It uses the send-email Edge Function which integrates with Resend API.
 */

import { supabase } from '../lib/supabase';

export interface SendEmailParams {
  to: string | string[];
  subject: string;
  body: string;
  html?: string;
}

export interface EmailResponse {
  success: boolean;
  message?: string;
  error?: string;
  data?: any;
}

/**
 * Send an email via Supabase Edge Function
 * 
 * @param params - Email parameters
 * @returns Promise with email send result
 * 
 * @example
 * ```typescript
 * const result = await sendEmail({
 *   to: 'user@example.com',
 *   subject: 'Welcome to IMG Dashboard',
 *   body: 'Thank you for joining!',
 * });
 * 
 * if (result.success) {
 *   console.log('Email sent successfully');
 * }
 * ```
 */
export async function sendEmail(params: SendEmailParams): Promise<EmailResponse> {
  try {
    const { to, subject, body, html } = params;

    // Validate input
    if (!to || !subject || !body) {
      return {
        success: false,
        error: 'Missing required fields: to, subject, body',
      };
    }

    console.log('📧 Sending email via Edge Function...', {
      to: Array.isArray(to) ? to.join(', ') : to,
      subject,
    });

    // Call the Supabase Edge Function
    const { data, error } = await supabase.functions.invoke('send-email', {
      body: {
        to,
        subject,
        body,
        html,
      },
    });

    if (error) {
      console.error('❌ Edge Function error:', error);
      return {
        success: false,
        error: error.message || 'Failed to send email',
      };
    }

    if (!data?.success) {
      console.error('❌ Email send failed:', data);
      return {
        success: false,
        error: data?.error || 'Failed to send email',
      };
    }

    console.log('✅ Email sent successfully:', data);
    return {
      success: true,
      message: 'Email sent successfully',
      data: data.data,
    };
  } catch (err) {
    console.error('❌ Error sending email:', err);
    return {
      success: false,
      error: err instanceof Error ? err.message : 'Unknown error',
    };
  }
}

/**
 * Send a reward claim notification to admins
 * 
 * @param claimData - Reward claim information
 * @returns Promise with email send result
 */
export async function sendRewardClaimNotification(claimData: {
  rewardName: string;
  rewardAmount: string;
  requiredPoints: number;
  username: string;
  email: string;
  walletAddress: string;
  userId: string;
}): Promise<EmailResponse> {
  const { rewardName, rewardAmount, requiredPoints, username, email, walletAddress, userId } = claimData;

  const subject = `🎁 New Reward Claim: ${rewardName} - $${rewardAmount} USD`;
  const body = `
New Reward Claim Request

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
REWARD DETAILS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Reward Type: ${rewardName}
Amount: $${rewardAmount} USD
Points Spent: ${requiredPoints.toLocaleString()}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
USER INFORMATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Username: ${username}
Email: ${email}
Wallet Address: ${walletAddress}
User ID: ${userId}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
TIMESTAMP
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Claimed At: ${new Date().toLocaleString()}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Please process this reward claim and send the ${rewardName} to the wallet address above.
  `.trim();

  // Send to both admin emails
  const adminEmails = ['imgrewards@proton.me', 'imgprotocol18@gmail.com'];
  
  const results = await Promise.all(
    adminEmails.map(adminEmail => 
      sendEmail({
        to: adminEmail,
        subject,
        body,
      })
    )
  );

  // Check if at least one email was sent successfully
  const anySuccess = results.some(result => result.success);
  
  if (anySuccess) {
    return {
      success: true,
      message: 'Notification sent to admin emails',
    };
  } else {
    return {
      success: false,
      error: 'Failed to send notifications to admin emails',
    };
  }
}

/**
 * Send a welcome email to a new user
 * 
 * @param userEmail - User's email address
 * @param username - User's username
 * @returns Promise with email send result
 */
export async function sendWelcomeEmail(userEmail: string, username: string): Promise<EmailResponse> {
  return sendEmail({
    to: userEmail,
    subject: '🎉 Welcome to IMG Dashboard!',
    body: `
Hi ${username},

Welcome to the IMG Dashboard! We're excited to have you join our community.

Here's what you can do:
• Participate in Raids and earn XP
• Collect Raid Points and claim rewards
• Track your earnings and distributions
• Vote on community proposals
• And much more!

Get started by exploring your dashboard and joining your first raid.

Best regards,
The IMG Protocol Team

---
Need help? Visit our support page or join our community:
Twitter: https://x.com/img_protocol
Telegram: https://t.me/imgprotocol
    `.trim(),
  });
}

/**
 * Send an XP reward notification to a user
 * 
 * @param userEmail - User's email address
 * @param username - User's username
 * @param xpAmount - Amount of XP earned
 * @param reason - Reason for XP reward
 * @returns Promise with email send result
 */
export async function sendXPRewardNotification(
  userEmail: string,
  username: string,
  xpAmount: number,
  reason: string
): Promise<EmailResponse> {
  return sendEmail({
    to: userEmail,
    subject: `🎯 You earned ${xpAmount} XP!`,
    body: `
Hi ${username},

Congratulations! You've earned ${xpAmount} XP!

Reason: ${reason}

Keep up the great work and continue earning XP to unlock more rewards and climb the leaderboard!

Your IMG Dashboard
    `.trim(),
  });
}

