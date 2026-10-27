import { writeFile } from "node:fs/promises";

const username = process.argv[2] ?? "importantboy";
if (!/^[a-z\d](?:[a-z\d-]{0,38})$/i.test(username)) throw new Error("Invalid GitHub username");
const repositories = [];
for (let page = 1; ; page++) {
  const response = await fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated&page=${page}`, {
    headers: { Accept: "application/vnd.github+json", "User-Agent": "rahul-portfolio-snapshot", ...(process.env.GITHUB_TOKEN ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` } : {}) },
    signal: AbortSignal.timeout(15000),
  });
  if (!response.ok) throw new Error(`GitHub returned ${response.status}; the existing snapshot was kept.`);
  const batch = await response.json();
  if (!Array.isArray(batch)) throw new Error("Unexpected response; the existing snapshot was kept.");
  repositories.push(...batch);
  if (batch.length < 100) break;
}
const fields = ["id", "name", "description", "language", "html_url", "homepage", "fork", "archived", "topics", "stargazers_count", "forks_count", "updated_at", "created_at", "default_branch", "size"];
await writeFile(new URL("../lib/github-snapshot.json", import.meta.url), `${JSON.stringify(repositories.map(repository => Object.fromEntries(fields.map(field => [field, repository[field]]))), null, 2)}\n`);
const capturedAt = new Date().toISOString();
await writeFile(new URL("../lib/github-snapshot-meta.json", import.meta.url), `${JSON.stringify({ capturedAt }, null, 2)}\n`);
console.log(`Saved ${repositories.length} public repositories for ${username}. Captured ${capturedAt}.`);
