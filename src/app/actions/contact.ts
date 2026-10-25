"use server";

import { z } from "zod";
import { getSupabase } from "@/lib/supabase";

const schema = z.object({
  name: z.string().trim().min(2, "Enter your name.").max(80, "Keep your name under 80 characters."),
  email: z.email("Enter a valid e-mail address.").max(120),
  message: z
    .string()
    .trim()
    .min(10, "Write at least a sentence so I know how to help.")
    .max(2000, "Keep your message under 2,000 characters."),
  // Honeypot: real visitors never see or fill this field.
  company: z.string().max(0).optional(),
});

export type ContactState = {
  status: "idle" | "success" | "error";
  message?: string;
  errors?: Partial<Record<"name" | "email" | "message", string>>;
  values?: { name: string; email: string; message: string };
};

export async function sendMessage(_prev: ContactState, formData: FormData): Promise<ContactState> {
  const raw = {
    name: String(formData.get("name") ?? ""),
    email: String(formData.get("email") ?? ""),
    message: String(formData.get("message") ?? ""),
    company: String(formData.get("company") ?? ""),
  };
  const values = { name: raw.name, email: raw.email, message: raw.message };

  const parsed = schema.safeParse(raw);
  if (!parsed.success) {
    const fieldErrors = z.flattenError(parsed.error).fieldErrors;
    // A filled honeypot means a bot: pretend it worked and store nothing.
    if (fieldErrors.company) return { status: "success", message: "Thanks! Your message is on its way." };
    return {
      status: "error",
      message: "Check the highlighted fields.",
      values,
      errors: {
        name: fieldErrors.name?.[0],
        email: fieldErrors.email?.[0],
        message: fieldErrors.message?.[0],
      },
    };
  }

  const supabase = getSupabase();
  if (!supabase) {
    return { status: "error", values, message: "The contact form isn't connected yet. Please e-mail me instead." };
  }

  const { error } = await supabase.from("contact_messages").insert({
    name: parsed.data.name,
    email: parsed.data.email,
    message: parsed.data.message,
  });
  if (error) {
    console.error("contact_messages insert failed:", error.message);
    return { status: "error", values, message: "Your message couldn't be sent. Please try again or e-mail me." };
  }

  return { status: "success", message: "Thanks! Your message is on its way. I'll reply by e-mail." };
}
