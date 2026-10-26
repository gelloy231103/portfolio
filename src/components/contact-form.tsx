"use client";

import { useActionState } from "react";
import { sendMessage, type ContactState } from "@/app/actions/contact";

const initialState: ContactState = { status: "idle" };

export function ContactForm() {
  const [state, formAction, pending] = useActionState(sendMessage, initialState);
  const values = state.status === "error" ? state.values : undefined;

  if (state.status === "success") {
    return (
      <p role="status" className="m-0 border-l-2 border-accent pl-4">
        {state.message}
      </p>
    );
  }

  return (
    <form action={formAction} noValidate className="grid gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field id="name" label="Name" autoComplete="name" defaultValue={values?.name} error={state.errors?.name} />
        <Field id="email" label="E-mail" type="email" autoComplete="email" defaultValue={values?.email} error={state.errors?.email} />
      </div>
      <Field id="message" label="Message" multiline defaultValue={values?.message} error={state.errors?.message} />
      {/* Honeypot for bots; hidden from people and screen readers. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="company">Company</label>
        <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>
      <div className="flex flex-wrap items-center gap-4">
        <button type="submit" disabled={pending} className="button disabled:cursor-wait disabled:opacity-70">
          {pending ? "Sending…" : "Send"}
        </button>
        <p aria-live="polite" className="m-0 text-[0.9rem] text-accent">
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
      <label htmlFor={id} className="label">{label}</label>
      {multiline ? <textarea rows={6} maxLength={2000} {...common} /> : <input type={type} autoComplete={autoComplete} {...common} />}
      {error && <p id={errorId} className="m-0 text-[0.9rem] text-accent">{error}</p>}
    </div>
  );
}
