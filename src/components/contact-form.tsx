"use client";

import { useActionState } from "react";
import { sendMessage, type ContactState } from "@/app/actions/contact";
import { ArrowRight, CheckIcon } from "./icons";

const initialState: ContactState = { status: "idle" };

export function ContactForm() {
  const [state, formAction, pending] = useActionState(sendMessage, initialState);
  const values = state.status === "error" ? state.values : undefined;

  if (state.status === "success") {
    return (
      <div role="status" className="grid content-center justify-items-start gap-4 rounded-2xl border border-line bg-bg p-8">
        <span className="grid size-12 place-items-center rounded-full bg-accent-soft text-accent-ink">
          <CheckIcon className="size-6" />
        </span>
        <p className="m-0 text-xl font-semibold">Message received</p>
        <p className="m-0 text-ink-2">{state.message}</p>
      </div>
    );
  }

  return (
    <form action={formAction} noValidate className="grid content-start gap-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field id="name" label="Your name" placeholder="Jane Dela Cruz" autoComplete="name" defaultValue={values?.name} error={state.errors?.name} />
        <Field id="email" label="Your e-mail" placeholder="jane@company.com" type="email" autoComplete="email" defaultValue={values?.email} error={state.errors?.email} />
      </div>
      <Field id="message" label="Message" placeholder="Tell me about the project or role…" multiline defaultValue={values?.message} error={state.errors?.message} />
      {/* Honeypot for bots; hidden from people and screen readers. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="company">Company</label>
        <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>
      <div className="flex flex-wrap items-center gap-4">
        <button type="submit" disabled={pending} className="btn btn-primary disabled:cursor-wait disabled:opacity-70">
          {pending ? "Sending…" : <>Send message <ArrowRight className="arrow" /></>}
        </button>
        <p aria-live="polite" className="m-0 text-sm text-red-500">
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
  placeholder?: string;
};

function Field({ id, label, type = "text", autoComplete, multiline, defaultValue, error, placeholder }: FieldProps) {
  const errorId = `${id}-error`;
  const common = {
    id,
    name: id,
    required: true,
    defaultValue,
    "aria-invalid": Boolean(error) || undefined,
    "aria-describedby": error ? errorId : undefined,
    placeholder,
    className: "field",
  };
  return (
    <div className="grid gap-2">
      <label htmlFor={id} className="text-sm font-medium text-ink">{label}</label>
      {multiline ? <textarea rows={6} maxLength={2000} {...common} /> : <input type={type} autoComplete={autoComplete} {...common} />}
      {error && <p id={errorId} className="m-0 text-sm text-red-500">{error}</p>}
    </div>
  );
}
