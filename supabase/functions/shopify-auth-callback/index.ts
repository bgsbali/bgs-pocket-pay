import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const clientId = Deno.env.get('SHOPIFY_CLIENT_ID');
    const storeDomain = Deno.env.get('SHOPIFY_STORE_DOMAIN');
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    
    if (!clientId || !storeDomain) {
      throw new Error('Missing Shopify configuration');
    }

    const url = new URL(req.url);
    const code = url.searchParams.get('code');
    const state = url.searchParams.get('state');
    
    if (!code) {
      // Redirect back to app with error
      const appUrl = Deno.env.get('APP_URL') || 'https://bgs-pocket-pay.lovable.app';
      return Response.redirect(`${appUrl}/auth?error=no_code`, 302);
    }

    // Exchange code for tokens
    const redirectUri = `${url.origin}/shopify-auth-callback`;
    
    const tokenResponse = await fetch(`https://shopify.com/${storeDomain}/auth/oauth/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        client_id: clientId,
        redirect_uri: redirectUri,
        code: code,
      }),
    });

    if (!tokenResponse.ok) {
      const errorText = await tokenResponse.text();
      console.error('Token exchange failed:', errorText);
      throw new Error('Failed to exchange code for tokens');
    }

    const tokens = await tokenResponse.json();
    const { access_token, id_token, refresh_token, expires_in } = tokens;

    // Decode ID token to get customer info (it's a JWT)
    const idTokenParts = id_token.split('.');
    const payload = JSON.parse(atob(idTokenParts[1]));
    
    const shopifyCustomerId = payload.sub;
    const email = payload.email;
    const emailVerified = payload.email_verified;

    // Initialize Supabase admin client
    const supabase = createClient(supabaseUrl, supabaseServiceKey, {
      auth: { autoRefreshToken: false, persistSession: false }
    });

    // Check if user exists in profiles by shopify_customer_id or email
    let { data: existingProfile } = await supabase
      .from('profiles')
      .select('*')
      .or(`shopify_customer_id.eq.${shopifyCustomerId},email.eq.${email}`)
      .maybeSingle();

    let userId: string;

    if (existingProfile) {
      // Update existing profile with Shopify data
      userId = existingProfile.user_id;
      await supabase
        .from('profiles')
        .update({
          shopify_customer_id: shopifyCustomerId,
          shopify_access_token: access_token,
          shopify_refresh_token: refresh_token,
          shopify_token_expires_at: new Date(Date.now() + expires_in * 1000).toISOString(),
        })
        .eq('user_id', userId);
    } else {
      // Create new user in Supabase Auth (using admin API)
      const { data: authUser, error: authError } = await supabase.auth.admin.createUser({
        email: email,
        email_confirm: emailVerified,
        user_metadata: {
          shopify_customer_id: shopifyCustomerId,
          name: payload.name || email.split('@')[0],
        },
      });

      if (authError) {
        // User might already exist with this email
        const { data: existingUser } = await supabase.auth.admin.listUsers();
        const user = existingUser?.users?.find(u => u.email === email);
        if (user) {
          userId = user.id;
        } else {
          throw authError;
        }
      } else {
        userId = authUser.user.id;
      }

      // Update profile with Shopify data
      await supabase
        .from('profiles')
        .update({
          shopify_customer_id: shopifyCustomerId,
          shopify_access_token: access_token,
          shopify_refresh_token: refresh_token,
          shopify_token_expires_at: new Date(Date.now() + expires_in * 1000).toISOString(),
        })
        .eq('user_id', userId);
    }

    // Generate a Supabase session for the user
    const { data: sessionData, error: sessionError } = await supabase.auth.admin.generateLink({
      type: 'magiclink',
      email: email,
      options: {
        redirectTo: `${Deno.env.get('APP_URL') || 'https://bgs-pocket-pay.lovable.app'}/wallet`,
      },
    });

    if (sessionError) {
      throw sessionError;
    }

    // Redirect to the magic link which will create a session
    const magicLink = sessionData.properties?.action_link;
    if (magicLink) {
      return Response.redirect(magicLink, 302);
    }

    // Fallback: redirect with tokens in hash (less secure but works)
    const appUrl = Deno.env.get('APP_URL') || 'https://bgs-pocket-pay.lovable.app';
    return Response.redirect(`${appUrl}/auth/callback?user_id=${userId}`, 302);

  } catch (error: unknown) {
    console.error('Callback error:', error);
    const appUrl = Deno.env.get('APP_URL') || 'https://bgs-pocket-pay.lovable.app';
    const message = error instanceof Error ? error.message : 'Unknown error';
    return Response.redirect(`${appUrl}/auth?error=${encodeURIComponent(message)}`, 302);
  }
});
