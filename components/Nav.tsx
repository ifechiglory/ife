"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "motion/react";
import { Menu, X } from "lucide-react";
import { useMagnetic } from "@/hooks/useMagnetic";

const links = [
  { href: "#about", label: "About" },
  { href: "#work", label: "Work" },
  { href: "#projects", label: "Projects" },
  { href: "#teaching", label: "Teaching" },
  { href: "#contact", label: "Contact" },
];

export default function Nav() {
  const magnetic = useMagnetic(0.3);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 40);
  });


  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <div className="fixed inset-x-0 top-0 z-30 flex justify-center px-4 pt-4 md:px-6 md:pt-5">
        <motion.nav
          animate={{
            maxWidth: scrolled ? "780px" : "1200px",
            backgroundColor: scrolled ? "var(--color-bg)" : "rgba(0,0,0,0)",
            borderColor: scrolled ? "var(--color-line)" : "rgba(0,0,0,0)",
            borderRadius: scrolled ? "999px" : "12px",
            boxShadow: scrolled
              ? "0 8px 30px -12px rgba(0,0,0,0.16)"
              : "0 0 0 rgba(0,0,0,0)",
            backdropFilter: scrolled ? "blur(14px)" : "blur(0px)",
          }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="w-full border px-6 font-mono text-[13px]"
        >
          <div className="flex items-center justify-between py-3">
            <a
              href="#"
              id="nav-logo"
              className="relative z-40 flex items-center gap-2.5 font-display text-xl font-semibold tracking-tight text-paper"
            >
              <span className="inline-block h-2 w-2 rounded-full bg-pine shadow-[0_0_12px_rgba(47,122,82,0.7)]" />
              Ife
            </a>

            <div className="hidden gap-8 text-ink-soft md:flex">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="group relative transition-colors hover:text-pine"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 h-px w-0 bg-pine transition-[width] duration-300 ease-out group-hover:w-full" />
                </a>
              ))}
            </div>

            <div className="flex items-center gap-4">
              <motion.div
                ref={magnetic.ref}
                style={{ x: magnetic.x, y: magnetic.y }}
                onMouseMove={magnetic.onMouseMove}
                onMouseLeave={magnetic.onMouseLeave}
                className="hidden md:inline-block"
              >
                <motion.a
                  href="#contact"
                  animate={{
                    paddingLeft: scrolled ? "16px" : "18px",
                    paddingRight: scrolled ? "16px" : "18px",
                    paddingTop: scrolled ? "7px" : "9px",
                    paddingBottom: scrolled ? "7px" : "9px",
                  }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="inline-block rounded-full border border-paper bg-paper text-bg transition-colors hover:border-pine hover:bg-pine hover:text-bg"
                >
                  Say hello
                </motion.a>
              </motion.div>

              {/* mobile menu toggle */}
              <button
                type="button"
                onClick={() => setMenuOpen((v) => !v)}
                aria-label={menuOpen ? "Close menu" : "Open menu"}
                aria-expanded={menuOpen}
                className="relative z-40 flex h-9 w-9 items-center justify-center rounded-full text-paper md:hidden"
              >
                {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </motion.nav>
      </div>

      {/* mobile full-screen menu overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-20 flex flex-col items-center justify-center gap-2 bg-bg md:hidden"
          >
            {links.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.08 + i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                className="py-3 font-display text-3xl font-medium text-paper transition-colors hover:text-pine"
              >
                {link.label}
              </motion.a>
            ))}

            <motion.a
              href="#contact"
              onClick={() => setMenuOpen(false)}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.08 + links.length * 0.06, ease: [0.16, 1, 0.3, 1] }}
              className="mt-6 inline-block rounded-[3px] border border-paper bg-paper px-6 py-3 font-mono text-sm text-bg transition-colors hover:border-pine hover:bg-pine"
            >
              Say hello
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
