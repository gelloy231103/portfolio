"use client";

import { useActionState } from "react";
import { type ContactState, validateContact, WEB3FORMS_ENDPOINT, web3formsKey } from "@/lib/contact";
import { ArrowRight, CheckIcon } from "./icons";

const initialState: ContactState = { status: "idle" };
const SENT = "Thanks! Your message is on its way. I'll reply by e-mail.";

/** Checks the fields, then sends the message to Web3Forms, which forwards it to my inbox. */
async function sendMessage(_prev: ContactState, formData: FormData): Promise<ContactState> {
  const values = {
    name: String(formData.get("name") ?? ""),
    email: String(formData.get("email") ?? ""),
    message: String(formData.get("message") ?? ""),
  };

  // A filled honeypot means a bot: pretend it worked and send nothing.
  if (String(formData.get("company") ?? "")) return { status: "success", message: SENT };

  const errors = validateContact(values);
  if (Object.keys(errors).length > 0) return { status: "error", message: "Check the highlighted fields.", values, errors };

  if (!web3formsKey) {
    return { status: "error", values, message: "The contact form isn't connected yet. Please e-mail me instead." };
  }

  try {
    const res = await fetch(WEB3FORMS_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        access_key: web3formsKey,
        subject: `Portfolio message from ${values.name.trim()}`,
        from_name: "Portfolio contact form",
        name: values.name.trim(),
        email: values.email.trim(),
        message: values.message.trim(),
      }),
    });
    const data = (await res.json().catch(() => null)) as { success?: boolean } | null;
    if (!res.ok || !data?.success) throw new Error(`Web3Forms responded ${res.status}`);
  } catch {
    return { status: "error", values, message: "Your message couldn't be sent. Please try again or e-mail me." };
  }

  return { status: "success", message: SENT };
}

/** Contact form, styled for the inverted contact block. Runs entirely in the browser. */
export function ContactForm() {
  const [state, formAction, pending] = useActionState(sendMessage, initialState);
  const values = state.status === "error" ? state.values : undefined;

  if (state.status === "success") {
    return (
      <div role="status" className="grid content-center justify-items-start gap-3 rounded-2xl border border-current/15 p-8">
        <CheckIcon className="size-8" />
        <p className="m-0 font-display text-2xl font-bold">Message received</p>
        <p className="m-0 opacity-75">{state.message}</p>
      </div>
    );
  }

  return (
    <form action={formAction} noValidate className="grid content-start gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field id="name" label="Your name" autoComplete="name" defaultValue={values?.name} error={state.errors?.name} />
        <Field id="email" label="Your e-mail" type="email" autoComplete="email" defaultValue={values?.email} error={state.errors?.email} />
      </div>
      <Field id="message" label="Message" multiline defaultValue={values?.message} error={state.errors?.message} />
      {/* Honeypot for bots; hidden from people and screen readers. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="company">Company</label>
        <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>
      <div className="flex flex-wrap items-center gap-4 pt-1">
        <button
          type="submit"
          disabled={pending}
          className="pill border-invert-ink bg-invert-ink text-invert-bg hover:opacity-90 disabled:cursor-wait disabled:opacity-70"
        >
          {pending ? "Sending…" : <>Send message <ArrowRight /></>}
        </button>
        <p aria-live="polite" className="m-0 text-sm text-invert-danger">
          {state.status === "error" ? state.message : ""}
        </p>
      </div>
    </form>
  );
}

type FieldProps = {
  id: "name" | "email" | "message";
  label: string;
  type?: string;
  autoComplete?: string;
  multiline?: boolean;
  defaultValue?: string;
  error?: string;
};

function Field({ id, label, type = "text", autoComplete, multiline, defaultValue, error }: FieldProps) {
  const errorId = `${id}-error`;
  const common = {
    id,
    name: id,
    required: true,
    defaultValue,
    "aria-invalid": Boolean(error) || undefined,
    "aria-describedby": error ? errorId : undefined,
    className: "field",
  };
  return (
    <div className="grid gap-1.5">
      <label htmlFor={id} className="text-sm font-medium opacity-80">{label}</label>
      {multiline ? <textarea rows={5} maxLength={2000} {...common} /> : <input type={type} autoComplete={autoComplete} {...common} />}
      {error && <p id={errorId} className="m-0 text-sm text-invert-danger">{error}</p>}
    </div>
  );
}
