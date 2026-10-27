import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
export default function NotFound() { return <main id="main-content" className="container not-found"><span className="mono accent">404 / A SMALL DETOUR</span><h1>This page is<br />still an idea.</h1><p>Let’s head back to something that’s been built.</p><Link href="/projects" className="button button-primary">Explore projects <ArrowUpRight size={18} /></Link></main>; }
