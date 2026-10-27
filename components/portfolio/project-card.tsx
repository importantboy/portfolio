import Link from "next/link";
import { ArrowUpRight, Github, Star } from "lucide-react";
import type { Project } from "@/lib/github";
import { ProjectArt } from "./project-art";

export function ProjectCard({ project, index = 0 }: { project: Project; index?: number }) {
  return <article className="project-card">
    <Link href={`/projects/${encodeURIComponent(project.name)}`} className="project-visual-link" aria-label={`Explore ${project.title}`}><ProjectArt art={project.art} title={project.title} /><span className="project-open"><ArrowUpRight size={23} /></span></Link>
    <div className="project-meta mono"><span>{String(index + 1).padStart(2, "0")} / {project.category}</span>{project.liveUrl ? <span className="demo-label"><i /> DEMO LINK</span> : <span><Github size={12} /> SOURCE CODE</span>}</div>
    <div className="project-title-row"><h3><Link href={`/projects/${encodeURIComponent(project.name)}`}>{project.title}</Link></h3><Link href={`/projects/${encodeURIComponent(project.name)}`} aria-label={`View ${project.title}`}><ArrowUpRight size={23} /></Link></div>
    <p className="project-description">{project.summary}</p>
    <div className="project-card-bottom"><div className="tags">{project.tags.slice(0, 3).map(tag => <span key={tag}>{tag}</span>)}</div>{project.stargazers_count > 0 && <span className="star-count"><Star size={13} /> {project.stargazers_count}</span>}</div>
    <div className="project-direct-actions"><a href={project.html_url} target="_blank" rel="noopener noreferrer"><Github size={13} /> Source code</a>{project.liveUrl ? <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">Try the app <ArrowUpRight size={14} /></a> : <Link href={`/projects/${encodeURIComponent(project.name)}`}>Explore project <ArrowUpRight size={14} /></Link>}</div>
  </article>;
}
