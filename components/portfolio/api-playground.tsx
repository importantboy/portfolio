"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowRight, Check, CirclePlay, Code2, Github, LoaderCircle, Monitor, RotateCcw, Server } from "lucide-react";
import { SectionLabel } from "./sections";
import { Reveal } from "./motion";

type ApiResponse = { developer: string; total: number; source: "github" | "snapshot"; projects: { name: string; language: string | null }[] };

export function ApiPlayground() {
  const [state, setState] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [response, setResponse] = useState<ApiResponse | null>(null);
  const [elapsed, setElapsed] = useState(0);
  const [error, setError] = useState("");
  const controller = useRef<AbortController | null>(null);
  const reduced = useReducedMotion();
  useEffect(() => () => controller.current?.abort(), []);
  async function runRequest() {
    controller.current?.abort();
    const activeController = new AbortController();
    controller.current = activeController;
    setState("loading"); setError("");
    const started = performance.now();
    try {
      const result = await fetch("/api/projects?limit=3", { signal: activeController.signal, cache: "no-store" });
      if (!result.ok) throw new Error(`The request returned HTTP ${result.status}. Please try again.`);
      const data: ApiResponse = await result.json();
      if (!Array.isArray(data.projects) || typeof data.total !== "number") throw new Error("The response couldn’t be read. Please try again.");
      if (activeController.signal.aborted) return;
      setResponse(data); setElapsed(Math.round(performance.now() - started)); setState("done");
    } catch (problem) {
      if (activeController.signal.aborted) return;
      setError(problem instanceof Error ? problem.message : "Couldn’t connect. Please try again."); setState("error");
    }
  }
  const code = response ? JSON.stringify({ developer: response.developer, total: response.total, source: response.source, projects: response.projects.map(project => ({ name: project.name, language: project.language })) }, null, 2) : '// A real endpoint. Your turn to try it.\n\nfetch("/api/projects?limit=3")\n  .then(response => response.json())\n  .then(projects => {\n    // From the server to your screen.\n    console.log(projects);\n  });';
  return <section className="section api-section" id="under-the-hood"><div className="container"><Reveal><SectionLabel number="04">A REAL REQUEST. FROM CLICK TO RESPONSE.</SectionLabel><div className="section-heading"><h2>Looks good outside.<br /><span className="muted">Works hard inside.</span></h2><p>Try a real request to this portfolio’s API.<br />A small peek at the systems behind the screen.</p></div></Reveal><Reveal className="api-playground"><div className="api-explanation"><span className="api-live-label mono"><span className="status-dot" /> INTERACTIVE · REAL REQUEST</span><h3>Go on.<br />Pull a little data.</h3><p>This is the same GitHub project data that powers the gallery, served through a Next.js endpoint.</p><div className={`api-flow flow-${state}`} aria-label={state === "done" ? "Request completed: browser to server to GitHub data" : "Request path: browser, server, GitHub data"}><span><Monitor size={21} /><small>Your browser</small></span><ArrowRight size={17} /><span><Server size={21} /><small>Next.js API</small></span><ArrowRight size={17} /><span><Github size={21} /><small>GitHub data</small></span></div><button className="button button-primary" onClick={runRequest} disabled={state === "loading"}>{state === "loading" ? <LoaderCircle className="request-spinner" size={19} /> : state === "done" || state === "error" ? <RotateCcw size={18} /> : <CirclePlay size={19} />}{state === "loading" ? "Fetching projects…" : state === "done" ? "Run it again" : state === "error" ? "Try again" : "Run the request"}<ArrowRight size={18} /></button><span className="api-footnote">Public data. Cached on the server. No sign-in needed.</span></div><div className="api-response"><div className="api-response-header"><span><Code2 size={17} /><b className="mono">GET</b><code>/api/projects?limit=3</code></span><span className={`api-result-badge result-${state}`} role="status" aria-live="polite">{state === "done" ? <><Check size={12} /> 200 OK <small>{elapsed}ms</small></> : state === "loading" ? "REQUESTING…" : state === "error" ? "TRY AGAIN" : "READY WHEN YOU ARE"}</span></div><AnimatePresence mode="wait" initial={false}><motion.pre key={state === "done" ? "response" : "request"} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: reduced ? 0 : .15 }} className={state === "done" ? "api-code response-code" : "api-code"} tabIndex={0} aria-label={state === "done" ? "API JSON response" : "Example request code"}><code>{code}</code></motion.pre></AnimatePresence><div className="api-response-footer"><span className="mono">{state === "done" ? `${response?.total} PUBLIC PROJECTS · ${response?.source === "snapshot" ? "SAVED SNAPSHOT" : "GITHUB DATA"}` : "IDEA → REQUEST → RESPONSE"}</span><span className="api-response-squares" aria-hidden="true">{Array.from({ length: 9 }, (_, i) => <i key={i} />)}</span></div>{error && <p className="api-error" role="alert">{error}</p>}</div></Reveal></div></section>;
}
