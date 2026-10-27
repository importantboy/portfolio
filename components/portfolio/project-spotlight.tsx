"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, type KeyboardEvent } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowUpRight, Check, Github } from "lucide-react";
import type { Project } from "@/lib/github";
import { ProjectArt } from "./project-art";

const previews: Record<string, { image: string; color: string; label: string; detail: string }> = {
  "truffle-box": { image: "/projects/maison-cacao.png", color: "cacao", label: "A SMALL BOX. A COMPLETE EXPERIENCE.", detail: "From choosing a truffle to a verified payment — the details connect the whole journey." },
  "dsa-template": { image: "/projects/dsa-solver.png", color: "solver", label: "LESS FRICTION. MORE THINKING.", detail: "A place to slow down, structure an approach, and understand the solution before writing the code." },
};

export function ProjectSpotlight({ projects }: { projects: Project[] }) {
  const [selected, setSelected] = useState(0);
  const reduced = useReducedMotion();
  if (!projects.length) return <p>Explore the full archive to see what I’m building.</p>;
  const project = projects[Math.min(selected, projects.length - 1)];
  const preview = previews[project.name];
  function navigateTabs(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
    event.preventDefault();
    const next = event.key === "Home" ? 0 : event.key === "End" ? projects.length - 1 : (index + (event.key === "ArrowRight" ? 1 : -1) + projects.length) % projects.length;
    setSelected(next);
    event.currentTarget.closest("[role=tablist]")?.querySelectorAll<HTMLButtonElement>("button")[next]?.focus();
  }
  return <div className="work-explorer">
    <div role="tablist" aria-label="Featured projects" className="work-tabs">{projects.map((item, index) => <button key={item.id} role="tab" id={`work-tab-${index}`} aria-controls="work-spotlight" aria-selected={selected === index} tabIndex={selected === index ? 0 : -1} onKeyDown={event => navigateTabs(event, index)} onClick={() => setSelected(index)}><span className="mono">0{index + 1}</span>{item.title}<ArrowUpRight size={15} /></button>)}</div>
    <div className={`work-spotlight spotlight-${preview?.color ?? "store"}`} role="tabpanel" id="work-spotlight" aria-labelledby={`work-tab-${selected}`}>
      <AnimatePresence mode="wait" initial={false}><motion.div key={project.id} className="spotlight-inner" initial={{ opacity: 0, y: reduced ? 0 : 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: reduced ? 0 : -8 }} transition={{ duration: reduced ? 0 : .2 }}>
        <Link href={`/projects/${encodeURIComponent(project.name)}`} className="spotlight-preview" aria-label={`Explore ${project.title}`}>
          <div className="spotlight-browser"><div className="spotlight-browser-chrome"><span /><span /><span /><p>{project.liveUrl ? new URL(project.liveUrl).hostname : `github.com/importantboy/${project.name}`}</p><ArrowUpRight size={13} /></div>{preview ? <Image src={preview.image} alt={`Screenshot of ${project.title}${project.name === "dsa-template" ? " with its built-in Two Sum example" : ""}`} width={1440} height={1000} sizes="(max-width: 760px) 90vw, 700px" className="spotlight-screenshot" /> : <ProjectArt art={project.art} title={project.title} />}</div><span className="preview-visit">Go a little deeper <ArrowUpRight size={17} /></span>
        </Link>
        <div className="spotlight-story"><span className="mono spotlight-overline">0{selected + 1} / {project.category.toUpperCase()}</span><h3>{project.title}</h3><p>{project.summary}</p><div className="spotlight-insight"><span className="mono">{preview?.label ?? "THE INTERFACE IS JUST THE BEGINNING."}</span><p>{preview?.detail ?? "Exploring the connection between a flexible front end and the commerce system behind it."}</p></div><div className="spotlight-tags tags">{project.tags.map(tag => <span key={tag}>{tag}</span>)}</div><div className="spotlight-actions"><Link href={`/projects/${encodeURIComponent(project.name)}`} className="text-link">Explore project <ArrowUpRight size={18} /></Link>{project.liveUrl && <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="spotlight-demo">Try the app <ArrowUpRight size={15} /></a>}</div><a href={project.html_url} target="_blank" rel="noopener noreferrer" className="spotlight-source"><Github size={14} /> View the source</a></div>
      </motion.div></AnimatePresence>
    </div>
    <div className="work-explorer-note"><span><Check size={14} /> {preview ? "Real project. Captured from the live app." : "Real project. Illustrated cover."}</span><Link href="/projects">Explore the full archive <ArrowUpRight size={16} /></Link></div>
  </div>;
}
