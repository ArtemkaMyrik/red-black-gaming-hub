
import { serve } from "https://deno.land/std@0.190.0/http/server.ts"
import { Resend } from "npm:resend@2.0.0"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"

const supabaseUrl = Deno.env.get("SUPABASE_URL")!
const supabaseServiceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
const resendApiKey = Deno.env.get("RESEND_API_KEY")!

const supabase = createClient(supabaseUrl, supabaseServiceRoleKey)
const resend = new Resend(resendApiKey)

function generateVerificationCode(): string {
  return Math.floor(100000 + Math.random() * 900000).toString()
}

async function sendVerificationEmail(email: string, code: string) {
  return resend.emails.send({
    from: "GameVerse <verify@gameverse.dev>",
    to: [email],
    subject: "Код подтверждения GameVerse",
    html: `
      <h1>Ваш код подтверждения</h1>
      <p>Код: <strong>${code}</strong></p>
      <p>Код действителен в течение 24 часов</p>
    `
  })
}

serve(async (req) => {
  const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type"
  }

  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { email, userId } = await req.json()
    const code = generateVerificationCode()
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000)

    const { error: verificationError } = await supabase
      .from('verification_codes')
      .insert({
        user_id: userId,
        email,
        code,
        expires_at: expiresAt.toISOString(),
        verified: false,
        attempts: 0
      })

    if (verificationError) throw verificationError

    const emailResult = await sendVerificationEmail(email, code)

    return new Response(JSON.stringify({ success: true }), {
      headers: { 
        "Content-Type": "application/json", 
        ...corsHeaders 
      }
    })
  } catch (error) {
    console.error("Ошибка отправки кода:", error)
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 
        "Content-Type": "application/json", 
        ...corsHeaders 
      }
    })
  }
})
