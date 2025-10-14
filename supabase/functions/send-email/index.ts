// Supabase Edge Function: send-email
// This function sends emails using Resend API
// Deploy: supabase functions deploy send-email

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface EmailRequest {
  // Support both formats for backward compatibility
  to?: string | string[];
  email?: string | string[];
  subject: string;
  body?: string;
  message?: string;
  html?: string;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    // Get Resend API key from environment
    const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY');
    if (!RESEND_API_KEY) {
      throw new Error('RESEND_API_KEY is not set in environment variables');
    }

    // Verify authentication (optional but recommended)
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      {
        global: {
          headers: { Authorization: req.headers.get('Authorization')! },
        },
      }
    );

    // Get the authenticated user
    const {
      data: { user },
      error: authError,
    } = await supabaseClient.auth.getUser();

    if (authError || !user) {
      console.warn('Unauthenticated request to send-email');
      // You can choose to allow or block unauthenticated requests
      // For now, we'll allow it but log a warning
    }

    // Parse request body
    const requestData = await req.json();
    
    // Support both formats: { to, body } and { email, message }
    const to = requestData.to || requestData.email;
    const subject = requestData.subject;
    const body = requestData.body || requestData.message;
    const html = requestData.html;

    // Validate input
    if (!to || !subject || !body) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Missing required fields: (to/email), subject, (body/message)',
        }),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    // Prepare email data for Resend
    const emailData = {
      from: 'IMG Dashboard <no-reply@imgsolana.com>',
      to: Array.isArray(to) ? to : [to],
      subject: subject,
      text: body,
      ...(html && { html: html }), // Include HTML if provided
    };

    console.log('📧 Sending email via Resend:', {
      to: emailData.to,
      subject: emailData.subject,
      from: emailData.from,
    });

    // Send email via Resend API
    const resendResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(emailData),
    });

    const resendData = await resendResponse.json();

    if (!resendResponse.ok) {
      console.error('❌ Resend API error:', resendData);
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Failed to send email',
          details: resendData,
        }),
        {
          status: resendResponse.status,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    console.log('✅ Email sent successfully via Resend:', resendData);

    // Return success response
    return new Response(
      JSON.stringify({
        success: true,
        message: 'Email sent successfully',
        data: resendData,
      }),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('❌ Error in send-email function:', error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});

