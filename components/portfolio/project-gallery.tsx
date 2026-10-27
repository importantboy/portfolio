"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Search, Github, ArrowUpRight, X, SlidersHorizontal } from "lucide-react";
import type { Project, ProjectData } from "@/lib/github";
import { ProjectCard } from "./project-card";
import { profile } from "@/lib/profile";

export function ProjectGallery({ data }: { data: ProjectData }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All projects");
  const [language, setLanguage] = useState("All languages");
  const [sort, setSort] = useState("featured");
  const reduced = useReducedMotion();
  const categories = ["All projects", "E-commerce", "Developer tools", "Backend", "Web experience", "Open source"];
  const languages = [...new Set(data.projects.map(project => project.language).filter((value): value is string => Boolean(value)))].sort();
  const projects = useMemo(() => data.projects.filter(project => {
    const text = [project.name, project.title, project.summary, project.language, ...project.tags].join(" ").toLowerCase();
    return text.includes(query.toLowerCase()) && (category === "All projects" || project.category === category) && (language === "All languages" || project.language === language);
  }).sort((a: Project, b: Project) => sort === "name" ? a.title.localeCompare(b.title) : sort === "stars" ? b.stargazers_count - a.stargazers_count : sort === "updated" ? +new Date(b.updated_at) - +new Date(a.updated_at) : Number(b.featured) - Number(a.featured) || +new Date(b.updated_at) - +new Date(a.updated_at)), [data.projects, query, category, language, sort]);
  function reset() { setQuery(""); setCategory("All projects"); setLanguage("All languages"); setSort("featured"); }
  return <div className="project-gallery">
    <div className="gallery-controls"><div className="project-search"><Search size={18} /><input type="search" value={query} onChange={event => setQuery(event.target.value)} aria-label="Search projects" placeholder="Search by name, stack, or idea…" />{query && <button onClick={() => setQuery("")} aria-label="Clear search"><X size={16} /></button>}</div><div className="gallery-selects"><SlidersHorizontal size={16} /><label className="sr-only" htmlFor="language-filter">Filter by language</label><select id="language-filter" value={language} onChange={event => setLanguage(event.target.value)}><option>All languages</option>{languages.map(item => <option key={item}>{item}</option>)}</select><label className="sr-only" htmlFor="project-sort">Sort projects</label><select id="project-sort" value={sort} onChange={event => setSort(event.target.value)}><option value="featured">Featured first</option><option value="updated">Recently updated</option><option value="name">Name A–Z</option><option value="stars">Most stars</option></select></div></div>
    <div className="category-filters" role="group" aria-label="Project categories">{categories.map(item => <button key={item} className={item === category ? "selected" : ""} onClick={() => setCategory(item)} aria-pressed={item === category}>{item}{item === "All projects" && <span>{data.projects.length}</span>}</button>)}</div>
    <div className="gallery-status"><p role="status" aria-live="polite">Showing <strong>{projects.length}</strong> {projects.length === 1 ? "project" : "projects"}</p><span className="mono"><i className={data.source === "github" ? "status-dot" : "status-dot cached"} /> {data.source === "github" ? "SYNCED FROM GITHUB" : `SAVED GITHUB SNAPSHOT · ${new Intl.DateTimeFormat("en", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" }).format(new Date(data.fetchedAt)).toUpperCase()}`}</span></div>
    <motion.div layout={!reduced} className="projects-grid"><AnimatePresence mode="popLayout">{projects.map((project, index) => <motion.div key={project.id} layout={!reduced} initial={{ opacity: 0, y: reduced ? 0 : 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: reduced ? 0 : 0.25 }}><ProjectCard project={project} index={index} /></motion.div>)}</AnimatePresence></motion.div>
    {projects.length === 0 && <div className="empty-state"><Search size={32} /><h2>No projects found.</h2><p>Try a different keyword, language, or category.</p><button className="button button-primary" onClick={reset}>Reset filters <X size={16} /></button></div>}
    <div className="github-endnote"><Github size={23} /><div><h3>There’s always something in the works.</h3><p>New public repositories appear here automatically. Forks and archived projects are filtered out.</p></div><a href={profile.githubUrl} target="_blank" rel="noopener noreferrer" className="text-link">Explore GitHub <ArrowUpRight size={17} /></a></div>
  </div>;
}
