
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface ContactEmailRequest {
  senderName: string;
  senderEmail: string;
  subject: string;
  message: string;
  schoolId: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { senderName, senderEmail, subject, message, schoolId }: ContactEmailRequest = await req.json();

    console.log('=== ENVIANDO EMAIL DE CONTATO ===');
    console.log('De:', senderName, '- Email:', senderEmail);
    console.log('Assunto:', subject);
    console.log('Escola ID:', schoolId);
    console.log('API Key configurada:', !!Deno.env.get("RESEND_API_KEY"));

    const emailResponse = await resend.emails.send({
      from: "M3Class Sistema Escolar <onboarding@resend.dev>",
      to: ["marcelomatheus92@gmail.com"],
      reply_to: senderEmail,
      subject: `[M3Class - ${schoolId}] ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f8f9fa;">
          <div style="background: #2563eb; color: white; padding: 20px; text-align: center;">
            <h1 style="margin: 0; font-size: 24px;">M3Class - Sistema Escolar</h1>
            <p style="margin: 10px 0 0 0; opacity: 0.9;">Nova mensagem de contato comercial</p>
          </div>
          
          <div style="padding: 30px; background: white; margin: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
            <h2 style="color: #1f2937; margin-top: 0;">Detalhes do Contato</h2>
            
            <div style="background: #f3f4f6; padding: 20px; border-radius: 6px; margin: 20px 0;">
              <p style="margin: 5px 0;"><strong>Remetente:</strong> ${senderName}</p>
              <p style="margin: 5px 0;"><strong>Email:</strong> ${senderEmail}</p>
              <p style="margin: 5px 0;"><strong>Escola ID:</strong> ${schoolId}</p>
              <p style="margin: 5px 0;"><strong>Data/Hora:</strong> ${new Date().toLocaleString('pt-BR')}</p>
            </div>
            
            <h3 style="color: #1f2937; border-bottom: 2px solid #e5e7eb; padding-bottom: 10px;">
              📧 ${subject}
            </h3>
            
            <div style="background: #fff; padding: 20px; border: 1px solid #e5e7eb; border-radius: 6px; margin: 20px 0;">
              <pre style="white-space: pre-wrap; font-family: Arial, sans-serif; line-height: 1.6; margin: 0;">${message}</pre>
            </div>
          </div>
          
          <div style="text-align: center; padding: 20px; color: #6b7280; font-size: 14px;">
            <p style="margin: 0;">Esta mensagem foi enviada através do sistema M3Class</p>
            <p style="margin: 5px 0 0 0; font-weight: bold;">
              Para responder, use o email: <a href="mailto:${senderEmail}" style="color: #2563eb;">${senderEmail}</a>
            </p>
          </div>
        </div>
      `,
    });

    console.log("✅ EMAIL ENVIADO COM SUCESSO!");
    console.log("Message ID:", emailResponse.data?.id);
    console.log("Resposta completa:", JSON.stringify(emailResponse, null, 2));

    return new Response(JSON.stringify({ 
      success: true, 
      messageId: emailResponse.data?.id,
      message: "Email enviado com sucesso para marcelomatheus92@gmail.com"
    }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("❌ ERRO AO ENVIAR EMAIL:");
    console.error("Erro completo:", error);
    console.error("Message:", error.message);
    console.error("Stack:", error.stack);
    
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message,
        details: "Verifique se a RESEND_API_KEY está configurada corretamente"
      }),
      {
        status: 500,
        headers: { 
          "Content-Type": "application/json", 
          ...corsHeaders 
        },
      }
    );
  }
};

serve(handler);
