import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

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
    
    if (!clientId || !storeDomain) {
      throw new Error('Missing Shopify configuration');
    }

    const url = new URL(req.url);
    const redirectUri = `${url.origin}/shopify-auth-callback`;
    
    // Generate random state and nonce for security
    const state = crypto.randomUUID();
    const nonce = crypto.randomUUID();
    
    // Build Shopify Customer Account API authorization URL
    // Using the new Customer Account API (headless)
    const authUrl = new URL(`https://shopify.com/${storeDomain}/auth/oauth/authorize`);
    authUrl.searchParams.set('client_id', clientId);
    authUrl.searchParams.set('response_type', 'code');
    authUrl.searchParams.set('redirect_uri', redirectUri);
    authUrl.searchParams.set('scope', 'openid email customer-account-api:full');
    authUrl.searchParams.set('state', state);
    authUrl.searchParams.set('nonce', nonce);
    
    return new Response(
      JSON.stringify({ 
        authUrl: authUrl.toString(),
        state,
        nonce
      }),
      { 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    );
  } catch (error: unknown) {
    console.error('Error generating auth URL:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ error: message }),
      { 
        status: 500, 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    );
  }
});
