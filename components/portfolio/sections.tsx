import Link from "next/link";
import { ArrowDown, ArrowUpRight, Code2, Database, Layers3 } from "lucide-react";
import { profile, skills } from "@/lib/profile";
import { Reveal } from "./motion";

export function SectionLabel({ number, children }: { number: string; children: React.ReactNode }) {
  return <div className="section-label mono"><span>{number}</span><span className="label-line" />{children}</div>;
}

export function SkillsSection() {
  const icons = [Layers3, Database, Code2];
  return <section className="section skills-section"><div className="container"><Reveal><SectionLabel number="03">MY TOOLKIT</SectionLabel><div className="section-heading"><h2>Good tools.<br /><span className="muted">Better possibilities.</span></h2><p>From a first component to the final API endpoint, I enjoy connecting the pieces.</p></div></Reveal><div className="skills-grid">{skills.map((skill, i) => { const Icon = icons[i]; return <Reveal key={skill.label} delay={i * 0.08} className="skill-group"><div className="skill-group-top"><Icon size={27} strokeWidth={1.3} /><span className="mono">{skill.number}</span></div><h3>{skill.label}</h3><p>{skill.description}</p><div className="skill-list">{skill.items.map(item => <span key={item}>{item}</span>)}</div></Reveal>; })}</div></div></section>;
}

export function ContactCTA() {
  return <section className="contact-cta"><div className="container"><Reveal><div className="contact-cta-top"><span className="mono">HAVE SOMETHING IN MIND?</span><ArrowDown size={23} /></div><Link className="contact-cta-link" href="/contact"><h2>Let’s make<br />something <em>matter.</em></h2><span className="cta-circle"><ArrowUpRight strokeWidth={1.3} /></span></Link><div className="contact-cta-bottom"><p>A project, an opportunity, or a good conversation.<br />I’d love to hear about it.</p><a href={`mailto:${profile.email}`}>{profile.email} <ArrowUpRight size={17} /></a></div></Reveal></div></section>;
}
