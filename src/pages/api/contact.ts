import type { APIRoute } from "astro";
import { env } from "cloudflare:workers";
import { EmailMessage } from "cloudflare:email";
import { createMimeMessage, Mailbox } from "mimetext/browser";

export const prerender = false;

const FROM_ADDRESS = "formulario@grisalesandpartners.com";
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function jsonResponse(body: Record<string, unknown>, status: number) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

export const POST: APIRoute = async ({ request }) => {
  const toAddress = env.CONTACT_TO_EMAIL?.trim();
  if (!toAddress) {
    console.error("CONTACT_TO_EMAIL secret is not configured");
    return jsonResponse({ error: "El formulario no está disponible en este momento." }, 500);
  }

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return jsonResponse({ error: "Solicitud inválida." }, 400);
  }

  const name = form.get("name")?.toString().trim() ?? "";
  const company = form.get("company")?.toString().trim() ?? "";
  const email = form.get("email")?.toString().trim() ?? "";
  const phone = form.get("phone")?.toString().trim() ?? "";
  const message = form.get("message")?.toString().trim() ?? "";

  if (!name || !company || !email || !message) {
    return jsonResponse({ error: "Faltan campos requeridos." }, 400);
  }

  if (!EMAIL_PATTERN.test(email)) {
    return jsonResponse({ error: "El correo no es válido." }, 400);
  }

  const mime = createMimeMessage();
  mime.setSender({ name: "Formulario Web — Grisales & Partners", addr: FROM_ADDRESS });
  mime.setRecipient(toAddress);
  mime.setHeader("Reply-To", new Mailbox({ name, addr: email }));
  mime.setSubject(`Nueva solicitud de contacto — ${name}`);
  mime.addMessage({
    contentType: "text/plain",
    data: [
      `Nombre: ${name}`,
      `Empresa: ${company}`,
      `Correo: ${email}`,
      `Teléfono: ${phone || "No proporcionado"}`,
      "",
      "Mensaje:",
      message,
    ].join("\n"),
  });

  const emailMessage = new EmailMessage(FROM_ADDRESS, toAddress, mime.asRaw());

  try {
    await env.SEND_EMAIL.send(emailMessage);
  } catch (error) {
    console.error("Failed to send contact form email. Resolved toAddress:", JSON.stringify(toAddress), error);
    return jsonResponse({ error: "No se pudo enviar el mensaje. Intenta de nuevo más tarde." }, 502);
  }

  return jsonResponse({ ok: true }, 200);
};
