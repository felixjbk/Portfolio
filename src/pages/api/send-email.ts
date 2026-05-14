import type { APIRoute } from 'astro';
import { Resend } from 'resend';

const resend = new Resend(import.meta.env.RESEND_API_KEY);

export const POST: APIRoute = async ({ request }) => {
  const formData = await request.formData();
  const nombre = formData.get('nombre');
  const correo = formData.get('correo');
  const proyecto = formData.get('proyecto');

  if (!nombre || !correo || !proyecto) {
    return new Response(JSON.stringify({ message: "Faltan campos" }), { status: 400 });
  }

  try {
    await resend.emails.send({
      from: 'Portfolio <onboarding@resend.dev>',
      to: 'felixxjbk@gmail.com',
      subject: `Nuevo mensaje: ${nombre}`,
      html: `
        <h1>Nuevo contacto del Portfolio</h1>
        <p><strong>Nombre:</strong> ${nombre}</p>
        <p><strong>Email:</strong> ${correo}</p>
        <p><strong>Mensaje:</strong> ${proyecto}</p>
      `,
    });

    return new Response(JSON.stringify({ message: "Email enviado con éxito" }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ message: "Error al enviar" }), { status: 500 });
  }
};