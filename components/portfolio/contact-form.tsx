"use client";

import { useState, type FormEvent } from "react";
import { ArrowUpRight, Check, Copy, Mail } from "lucide-react";
import { profile } from "@/lib/profile";
import { createInquiryMailto } from "@/lib/contact";

export function ContactForm() {
  const [status, setStatus] = useState("");
  const [interest, setInterest] = useState("Web application");
  const [copied, setCopied] = useState(false);
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    window.location.href = createInquiryMailto({ name: String(data.get("name")), email: String(data.get("email")), message: String(data.get("message")), interest });
    setStatus("Your email app will open with this draft. Review it and press Send there. If it doesn’t open, email me directly using the address below.");
  }
  async function copyEmail() {
    try { await navigator.clipboard.writeText(profile.email); setCopied(true); setTimeout(() => setCopied(false), 2500); } catch { setStatus(`Copy this address: ${profile.email}`); }
  }
  return <div className="contact-form-wrap"><form onSubmit={submit} className="contact-form"><h2>Tell me a little about your idea.</h2><fieldset><legend>I’m interested in…</legend><div className="interest-options">{["Web application", "Backend & API", "Collaboration", "Something else"].map(item => <label key={item} className={interest === item ? "selected" : ""}><input type="radio" name="interest" value={item} checked={interest === item} onChange={() => setInterest(item)} />{item}</label>)}</div></fieldset><div className="form-row"><label>Your name <span>*</span><input name="name" autoComplete="name" placeholder="What should I call you?" required maxLength={100} /></label><label>Email address <span>*</span><input name="email" type="email" autoComplete="email" placeholder="you@example.com" required maxLength={200} /></label></div><label>A few details <span>*</span><textarea name="message" placeholder="What are you building? What would you like help with?" rows={5} required minLength={10} maxLength={3000} /></label><div className="form-submit"><button type="submit" className="button button-primary">Let’s start a conversation <ArrowUpRight size={18} /></button><span><Mail size={14} /> Opens your email app</span></div><p className="form-status" role="status" aria-live="polite">{status}</p></form><div className="email-direct"><div><span className="mono">PREFER TO KEEP IT SIMPLE?</span><a href={`mailto:${profile.email}`}>{profile.email}</a></div><button onClick={copyEmail} aria-label={copied ? "Email copied" : "Copy email address"}>{copied ? <Check size={20} /> : <Copy size={20} />}</button></div></div>;
}
