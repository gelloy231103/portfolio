/**
 * Contact form rules, checked in the browser before a message is sent.
 * Messages go to Web3Forms (https://web3forms.com), which forwards them to my inbox.
 */

export type ContactFields = { name: string; email: string; message: string };
export type ContactErrors = Partial<Record<keyof ContactFields, string>>;

export type ContactState = {
  status: "idle" | "success" | "error";
  message?: string;
  errors?: ContactErrors;
  values?: ContactFields;
};

export const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";

/** Public access key from the Web3Forms dashboard. It only allows sending to my inbox, so it is safe in the browser. */
export const web3formsKey = process.env.NEXT_PUBLIC_WEB3FORMS_KEY ?? "";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validateContact(v: ContactFields): ContactErrors {
  const errors: ContactErrors = {};
  const name = v.name.trim();
  const email = v.email.trim();
  const message = v.message.trim();

  if (name.length < 2) errors.name = "Enter your name.";
  else if (name.length > 80) errors.name = "Keep your name under 80 characters.";

  if (!EMAIL.test(email) || email.length > 120) errors.email = "Enter a valid e-mail address.";

  if (message.length < 10) errors.message = "Write at least a sentence so I know how to help.";
  else if (message.length > 2000) errors.message = "Keep your message under 2,000 characters.";

  return errors;
}
