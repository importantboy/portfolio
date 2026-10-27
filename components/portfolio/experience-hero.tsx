"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, type KeyboardEvent, type PointerEvent } from "react";
import { AnimatePresence, motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import { ArrowDown, ArrowUpRight, Braces, Code2, Github, Sparkles, UserRound } from "lucide-react";
import { profile } from "@/lib/profile";
import { Reveal } from "./motion";

export function ExperienceHero({ repoCount }: { repoCount: number }) {
  const [mode, setMode] = useState<"human" | "code">("human");
  const reduced = useReducedMotion();
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const smoothX = useSpring(rotateX, { stiffness: 160, damping: 24 });
  const smoothY = useSpring(rotateY, { stiffness: 160, damping: 24 });
  function tilt(event: PointerEvent<HTMLDivElement>) {
    if (reduced || event.pointerType !== "mouse" || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const rect = event.currentTarget.getBoundingClientRect();
    rotateY.set(((event.clientX - rect.left) / rect.width - .5) * 7);
    rotateX.set(-((event.clientY - rect.top) / rect.height - .5) * 7);
  }
  function changeTab(event: KeyboardEvent<HTMLButtonElement>) {
    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
    event.preventDefault();
    const focusedMode = event.currentTarget.dataset.mode;
    const nextMode = event.key === "Home" ? "human" : event.key === "End" ? "code" : focusedMode === "human" ? "code" : "human";
    setMode(nextMode);
    event.currentTarget.closest("[role=tablist]")?.querySelector<HTMLButtonElement>(`[data-mode="${nextMode}"]`)?.focus();
  }
  return <section className="hero-experience">
    <div className="hero-ambient" aria-hidden="true" />
    <div className="container experience-grid">
      <Reveal className="experience-copy">
        <div className="experience-eyebrow mono"><span className="status-dot" /> RAHUL KUMAR <span>/</span> FULL-STACK DEVELOPER</div>
        <h1 className="experience-title"><span>Built to work.</span><span>Made to</span><span className="title-finale"><em>stand out.</em><span className="title-spark" aria-hidden="true">✳</span></span></h1>
        <p className="experience-description">A little logic. A little imagination.<br />I turn complex ideas into web experiences<br className="desktop-break" /> that look good and work even better.</p>
        <div className="experience-actions"><a href="#selected-work" className="button button-primary">Discover my work <ArrowUpRight size={20} /></a><Link href="/contact" className="experience-contact">Have an idea?<span>Let’s talk <ArrowUpRight size={15} /></span></Link></div>
        <div className="hero-signature"><span className="signature-line" /><span>Design-minded. Backend-capable.</span><Braces size={20} /></div>
      </Reveal>

      <Reveal className="hero-studio" delay={.12}>
        <div className="studio-topline"><span className="mono">A HUMAN BEHIND THE CODE</span><div className="studio-tabs" role="tablist" aria-label="Meet Rahul">{(["human", "code"] as const).map(value => <button id={`studio-tab-${value}`} data-mode={value} key={value} role="tab" aria-selected={mode === value} aria-controls="studio-panel" tabIndex={mode === value ? 0 : -1} onKeyDown={changeTab} onClick={() => setMode(value)}>{value === "human" ? <UserRound size={13} /> : <Code2 size={14} />}{value === "human" ? "The human" : "The code"}</button>)}</div></div>
        <motion.div className={`studio-card studio-mode-${mode}`} onPointerMove={tilt} onPointerLeave={() => { rotateX.set(0); rotateY.set(0); }} style={{ rotateX: smoothX, rotateY: smoothY, transformPerspective: 1000 }}>
          <div id="studio-panel" role="tabpanel" aria-labelledby={`studio-tab-${mode}`} className="studio-panel">
            <AnimatePresence mode="wait" initial={false}>
              {mode === "human" ? <motion.div key="human" className="studio-human" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: reduced ? 0 : .22 }}>
                <span className="studio-rk" aria-hidden="true">rk.</span><div className="studio-orbit" aria-hidden="true"><span>IDEAS INTO EXPERIENCES</span></div><div className="studio-checker" aria-hidden="true" />
                <Image src="/profile.png" alt="Rahul Kumar, the developer behind the work" width={864} height={1152} priority sizes="(max-width: 760px) 90vw, 460px" className="studio-portrait" />
                <span className="studio-sticker sticker-craft" aria-hidden="true"><Sparkles size={17} /> A little extra care.</span><span className="studio-sticker sticker-code" aria-hidden="true"><Code2 size={17} /> Ideas → shipped.</span>
                <div className="studio-person-label"><span className="studio-handwriting">Hey, I’m Rahul.</span><span className="mono">DEVELOPER. MAKER.<br />ALWAYS FIGURING THINGS OUT.</span><ArrowUpRight size={26} /></div>
              </motion.div> : <motion.div key="code" className="studio-code-view" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: reduced ? 0 : .22 }}>
                <div className="studio-editor-bar"><span /><span /><span /><p>the-person-behind-it.ts</p><Code2 size={15} /></div>
                <div className="studio-editor-code"><span className="editor-comment">{"// equal parts logic & curiosity"}</span><p><span className="editor-purple">const</span> rahul = {"{"}</p><p className="indent">name: <span className="editor-peach">&quot;Rahul Kumar&quot;</span>,</p><p className="indent">builds: [</p><p className="indent2 editor-green">&quot;thoughtful interfaces&quot;,</p><p className="indent2 editor-green">&quot;useful APIs&quot;,</p><p className="indent2 editor-green">&quot;ideas worth shipping&quot;</p><p className="indent">],</p><p className="indent">mindset: <span className="editor-peach">&quot;keep learning&quot;</span></p><p>{"}"};</p><p className="editor-last"><span className="editor-purple">export default</span> rahul;</p></div>
                <div className="studio-terminal"><span className="mono"><span className="status-dot" /> READY TO BUILD SOMETHING GOOD</span><p>$ let’s make it happen<span className="editor-caret">▌</span></p></div>
              </motion.div>}
            </AnimatePresence>
          </div>
        </motion.div>
        <div className="studio-bottomline"><span className="mono">BASED IN INDIA · BUILDING FOR THE WEB</span><span className="studio-hint"><span>↖</span> Try the other side</span></div>
      </Reveal>

      <div className="experience-bottom"><a href="#selected-work" className="scroll-invitation"><span className="scroll-circle"><ArrowDown size={16} /></span><span className="mono">A LITTLE SCROLL.<br />A LOT TO DISCOVER.</span></a><a href={profile.githubUrl} target="_blank" rel="noopener noreferrer" className="repo-proof"><Github size={19} /><span><strong>{repoCount}</strong> public projects<span>Always something in the works.</span></span><ArrowUpRight size={17} /></a></div>
    </div>
  </section>;
}
