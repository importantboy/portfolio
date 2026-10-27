import { Braces, ShoppingBag, Terminal, ArrowUpRight } from "lucide-react";

// Original CSS illustrations: these are project artwork, not screenshots of deployed apps.
export function ProjectArt({ art, title }: { art: string; title: string }) {
  const variant = Array.from(title).reduce((sum, letter) => sum + letter.charCodeAt(0), 0) % 4;
  return <div className={`project-art art-${art} ${art === "abstract" ? `art-variant-${variant}` : ""}`} aria-hidden="true">
    {art === "cacao" ? <><span className="art-caption">MAISON CACAO</span><div className="cacao-line">A little box.<br /><em>A lot of joy.</em></div><div className="chocolate-box">{Array.from({ length: 9 }, (_, i) => <span className={`truffle truffle-${i % 3}`} key={i}><i /></span>)}</div><span className="art-bottom">CURATE YOUR OWN COLLECTION <ArrowUpRight size={14} /></span></> :
      art === "worksheet" ? <div className="worksheet-window"><div className="window-bar"><span /><span /><span /><b>DSA Solver</b></div><div className="worksheet-content"><span className="mono">THINK. TRACE. SOLVE.</span><div className="worksheet-heading">A little structure.<br />A better solution.</div><div className="worksheet-row"><span>01</span><b>Understand the problem</b><i>✓</i></div><div className="worksheet-row"><span>02</span><b>Build your approach</b><i>✓</i></div><div className="array-visual">{[2, 7, 11, 15].map((n, i) => <span key={n} className={i < 2 ? "highlight" : ""}>{n}<small>{i}</small></span>)}</div><div className="worksheet-code">target = 9 <span>{"// let’s work it out"}</span></div></div></div> :
      art === "store" ? <><span className="art-caption">COMMERCE, REIMAGINED.</span><div className="store-bag"><ShoppingBag strokeWidth={1} /><span>store.</span></div><span className="art-bottom">A HEADLESS SHOPPING EXPERIENCE <ArrowUpRight size={14} /></span></> :
      art === "terminal" ? <div className="terminal-window"><div className="window-bar"><span /><span /><span /><b>access-control.js</b></div><div><Terminal size={28} /><p><span>const</span> permission = <em>{'"build"'}</em>;</p><p><span>if</span> (user.can(permission)) {"{"}</p><p className="indent">next(); <small>{"// make it happen"}</small></p><p>{"}"}</p><p className="terminal-success">✓ Access granted</p></div></div> :
      <><span className="art-caption">{title.toUpperCase()}</span><div className="abstract-symbol"><Braces strokeWidth={0.8} /><span className="abstract-orbit" /></div><span className="art-bottom">IDEAS INTO IMPLEMENTATION <ArrowUpRight size={14} /></span></>}
  </div>;
}
