import type { Metadata } from "next";
import { ArrowUpRight, Github, Mail, ArrowDownRight } from "lucide-react";
import { Reveal } from "@/components/portfolio/motion";
import { SectionLabel } from "@/components/portfolio/sections";
import { ContactForm } from "@/components/portfolio/contact-form";
import { profile } from "@/lib/profile";

export const metadata: Metadata = { title: "Contact", description: "Have a project, an opportunity, or an idea? Get in touch with Rahul Kumar." };
export default function ContactPage() {
  return <main id="main-content" className="contact-page container"><Reveal><SectionLabel number="01">GOOD THINGS START WITH A HELLO</SectionLabel><div className="page-title-row"><h1>Your next idea.<br /><span className="accent">Our next conversation.</span></h1><ArrowDownRight className="page-arrow" strokeWidth={1} /></div></Reveal><div className="contact-layout"><Reveal className="contact-context"><h2>Let’s build<br />something useful.</h2><p>Whether you need a web application, help with an API, or an extra pair of hands on your team — tell me what you have in mind.</p><div className="contact-channel"><Mail size={22} /><div><span className="mono">WRITE TO ME</span><a href={`mailto:${profile.email}`}>{profile.email} <ArrowUpRight size={15} /></a></div></div><div className="contact-channel"><Github size={22} /><div><span className="mono">FIND MY WORK</span><a href={profile.githubUrl} target="_blank" rel="noopener noreferrer">github.com/importantboy <ArrowUpRight size={15} /></a></div></div><div className="contact-little-note"><span>↗</span><p>A clear idea is great.<br />A rough one is a good place to start, too.</p></div></Reveal><Reveal delay={0.12}><ContactForm /></Reveal></div></main>;
}
