"use client";

import { useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll, useSpring } from "motion/react";
import { ArrowUp } from "lucide-react";

export function ScrollTools() {
  const { scrollY, scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 150, damping: 30 });
  const [visible, setVisible] = useState(false);
  const reduced = useReducedMotion();
  useMotionValueEvent(scrollY, "change", value => setVisible(value > 700));
  return <><motion.div className="reading-progress" style={{ scaleX: reduced ? scrollYProgress : progress }} aria-hidden="true" /><AnimatePresence>{visible && <motion.button className="back-to-top" aria-label="Back to top" initial={{ opacity: 0, y: reduced ? 0 : 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} onClick={() => { document.querySelector<HTMLAnchorElement>(".site-header .wordmark")?.focus({ preventScroll: true }); window.scrollTo({ top: 0, behavior: reduced ? "instant" : "smooth" }); }}><ArrowUp size={18} /><span className="mono">TOP</span></motion.button>}</AnimatePresence></>;
}
