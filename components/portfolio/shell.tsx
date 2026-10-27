"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowUpRight, Github, Menu, X } from "lucide-react";
import { profile } from "@/lib/profile";

const links = [{ href: "/", label: "Home" }, { href: "/projects", label: "Projects" }, { href: "/about", label: "About" }, { href: "/contact", label: "Contact" }];

export function Header() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const reduced = useReducedMotion();
  const toggle = useRef<HTMLButtonElement>(null);
  const dialog = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialog.current?.querySelector<HTMLElement>("a")?.focus();
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") { setOpen(false); toggle.current?.focus(); }
      if (event.key !== "Tab") return;
      const focusable = [...(dialog.current?.querySelectorAll<HTMLElement>("a, button") ?? [])];
      const first = focusable[0], last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
    }
    function onResize() { if (window.innerWidth > 760) setOpen(false); }
    document.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => { document.body.style.overflow = original; document.removeEventListener("keydown", onKey); window.removeEventListener("resize", onResize); };
  }, [open]);
  const active = (href: string) => href === "/" ? path === href : path.startsWith(href);
  return <header className="site-header">
    <div className="container header-inner">
      <Link href="/" aria-label="Rahul Kumar home" className="wordmark" onClick={() => setOpen(false)}>rk<span>.</span><span className="wordmark-label">RAHUL KUMAR</span></Link>
      <nav className="desktop-nav" aria-label="Main navigation">{links.map(link => <Link key={link.href} href={link.href} aria-current={active(link.href) ? "page" : undefined} className={active(link.href) ? "active" : ""}>{link.label}{active(link.href) && <span className="nav-dot" />}</Link>)}</nav>
      <Link className="header-cta" href="/contact">Let’s talk <ArrowUpRight size={16} /></Link>
      <button className="menu-toggle" ref={toggle} onClick={() => setOpen(!open)} aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} aria-controls="mobile-navigation">{open ? <X /> : <Menu />}</button>
    </div>
    <AnimatePresence>{open && <motion.div id="mobile-navigation" ref={dialog} className="mobile-menu" role="dialog" aria-modal="true" aria-label="Navigation" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "calc(100dvh - 80px)" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: reduced ? 0 : 0.3 }}>
      <nav aria-label="Mobile navigation">{links.map((link, i) => <Link href={link.href} key={link.href} onClick={() => { setOpen(false); toggle.current?.focus(); }} aria-current={active(link.href) ? "page" : undefined}><span className="mono">0{i + 1}</span>{link.label}<ArrowUpRight /></Link>)}</nav>
      <button className="mobile-menu-close" onClick={() => { setOpen(false); toggle.current?.focus(); }}>Close menu <X size={17} /></button>
      <a className="mobile-email" href={`mailto:${profile.email}`}>{profile.email}<ArrowUpRight size={18} /></a>
    </motion.div>}</AnimatePresence>
  </header>;
}

export function Footer() {
  return <footer className="site-footer"><div className="container footer-inner"><Link className="wordmark" href="/" aria-label="Home">rk<span>.</span></Link><p>Made with curiosity, care, and a little coffee.</p><div><a href={profile.githubUrl} target="_blank" rel="noopener noreferrer" aria-label="Rahul on GitHub"><Github size={17} /> GitHub <ArrowUpRight size={14} /></a><span className="mono">© {new Date().getFullYear()} RAHUL</span></div></div></footer>;
}
