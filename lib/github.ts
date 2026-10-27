import "server-only";
import { cache } from "react";
import snapshot from "./github-snapshot.json";
import snapshotMeta from "./github-snapshot-meta.json";
import { profile, projectEditorial } from "./profile";

export type Repository = {
  id: number; name: string; description: string | null; language: string | null;
  html_url: string; homepage: string | null; fork: boolean; archived: boolean;
  topics: string[]; stargazers_count: number; forks_count: number;
  updated_at: string; created_at: string; default_branch: string; size: number;
};
export type Project = Repository & { title: string; category: string; summary: string; art: string; tags: string[]; featured: boolean; highlights: string[]; liveUrl: string | null };
export type ProjectData = { projects: Project[]; source: "github" | "snapshot"; fetchedAt: string };

export function safeExternalUrl(value: string | null | undefined): string | null {
  if (!value) return null;
  try { const url = new URL(value); return ["https:", "http:"].includes(url.protocol) ? url.href : null; } catch { return null; }
}

function toProject(repo: Repository): Project {
  const editorial = projectEditorial[repo.name];
  return {
    ...repo,
    title: editorial?.title ?? repo.name.split(/[-_]/).map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" "),
    category: editorial?.category ?? (repo.language === "PHP" ? "Web experience" : "Open source"),
    summary: editorial?.summary ?? repo.description ?? `A ${repo.language ?? "software"} project from my GitHub. Explore the repository for the source and documentation.`,
    art: editorial?.art ?? "abstract",
    tags: editorial?.tags ?? [repo.language, ...(repo.topics ?? []).slice(0, 2)].filter((value): value is string => Boolean(value)),
    featured: editorial?.featured ?? false,
    highlights: editorial?.highlights ?? [],
    liveUrl: safeExternalUrl(repo.homepage),
  };
}

async function githubFetch(path: string) {
  return fetch(`https://api.github.com${path}`, {
    headers: { Accept: "application/vnd.github+json", "User-Agent": "rahul-portfolio", ...(process.env.GITHUB_TOKEN ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` } : {}) },
    next: { revalidate: 3600 },
    signal: AbortSignal.timeout(8000),
  });
}

export const getProjects = cache(async (): Promise<ProjectData> => {
  let repos = snapshot as Repository[];
  let source: ProjectData["source"] = "snapshot";
  try {
    const fresh: Repository[] = [];
    // Paginate so the gallery keeps working when the account grows past 100 repositories.
    for (let page = 1; ; page++) {
      const response = await githubFetch(`/users/${profile.github}/repos?per_page=100&sort=updated&page=${page}`);
      if (!response.ok) throw new Error(`GitHub ${response.status}`);
      const result: Repository[] = await response.json();
      if (!Array.isArray(result)) throw new Error("Invalid GitHub response");
      fresh.push(...result);
      if (result.length < 100) break;
    }
    repos = fresh;
    source = "github";
  } catch { /* A verified snapshot keeps the public site useful during API outages / rate limits. */ }
  return { projects: repos.filter(repo => !repo.fork && !repo.archived).map(toProject), source, fetchedAt: source === "github" ? new Date().toISOString() : snapshotMeta.capturedAt };
});

export const getReadme = cache(async (name: string): Promise<string | null> => {
  try {
    const response = await githubFetch(`/repos/${profile.github}/${encodeURIComponent(name)}/readme`);
    if (!response.ok) return null;
    const data = await response.json();
    if (typeof data.content !== "string" || data.encoding !== "base64") return null;
    // Render as text, never as untrusted HTML from a repository.
    return Buffer.from(data.content, "base64").toString("utf8").replace(/\u0000/g, "").slice(0, 24000);
  } catch { return null; }
});
