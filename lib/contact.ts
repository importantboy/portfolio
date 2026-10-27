import { profile } from "./profile";

export function createInquiryMailto({ name, email, message, interest }: { name: string; email: string; message: string; interest: string }) {
  const subject = `${interest} enquiry from ${name}`;
  const body = `Hi Rahul,\n\n${message}\n\nInterested in: ${interest}\n\nFrom: ${name}\nReply to: ${email}`;
  return `mailto:${profile.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
