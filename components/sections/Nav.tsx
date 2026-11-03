"use client";

import {
  useEffect,
  useRef,
  useState,
} from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "motion/react";
import { Menu, X } from "lucide-react";
import { useMagnetic } from "@/hooks/useMagnetic";
import { motionEase } from "@/lib/motion";

const links = [
  { id: "about", href: "#about", label: "About" },
  { id: "skills", href: "#skills", label: "Skills" },
  { id: "experience", href: "#experience", label: "Experience" },
  { id: "projects", href: "#projects", label: "Projects" },
  { id: "teaching", href: "#teaching", label: "Teaching" },
  { id: "contact", href: "#contact", label: "Contact" },
] as const;

const sectionIds = ["hero", ...links.map((link) => link.id)];

function useActiveSection(ids: readonly string[]) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const visibleRatios = useRef(new Map<string, number>());

  useEffect(() => {
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => element !== null);

    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          visibleRatios.current.set(
            entry.target.id,
            entry.isIntersecting ? entry.intersectionRatio : 0
          );
        });

        let bestId: string | null = null;
        let bestRatio = 0;

        visibleRatios.current.forEach((ratio, id) => {
          if (ratio > bestRatio) {
            bestRatio = ratio;
            bestId = id;
          }
        });

        setActiveId((currentId) =>
          currentId === bestId ? currentId : bestId
        );
      },
      {
        rootMargin: "-20% 0px -60% 0px",
        threshold: [0, 0.25, 0.5, 0.75, 1],
      }
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, [ids]);

  return activeId;
}

export default function Nav() {
  const magnetic = useMagnetic(0.3);

  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const firstMenuLinkRef = useRef<HTMLAnchorElement>(null);

  const activeId = useActiveSection(sectionIds);

  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const nextScrolled = latest > 40;

    setScrolled((currentScrolled) =>
      currentScrolled === nextScrolled ? currentScrolled : nextScrolled
    );
  });

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;

    firstMenuLinkRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;

      setMenuOpen(false);
      menuButtonRef.current?.focus();
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [menuOpen]);

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <>
      <div className="fixed inset-x-0 top-0 z-30 flex justify-center px-4 pt-4 md:px-6 md:pt-5">
        <motion.nav
          aria-label="Main navigation"
          animate={{
            maxWidth: scrolled ? "780px" : "1200px",
            backgroundColor: scrolled
              ? "var(--color-bg)"
              : "rgba(0, 0, 0, 0)",
            borderColor: scrolled
              ? "var(--color-line)"
              : "rgba(0, 0, 0, 0)",
            borderRadius: scrolled ? "999px" : "12px",
            boxShadow: scrolled
              ? "0 8px 30px -12px rgb(0 0 0 / 0.24)"
              : "0 0 0 rgb(0 0 0 / 0)",
            backdropFilter: scrolled ? "blur(14px)" : "blur(0px)",
          }}
          transition={{
            duration: 0.4,
            ease: motionEase,
          }}
          className="w-full border px-6 font-mono text-[13px]"
        >
          <div className="flex items-center justify-between py-3">
            <a
              id="nav-logo"
              href="#hero"
              aria-label="Ifechukwu Max-Oti — back to top"
              className="relative z-40 flex items-center gap-2.5 rounded-sm font-display text-xl font-semibold tracking-tight text-paper outline-none focus-visible:ring-2 focus-visible:ring-pine"
            >
              <span
                aria-hidden="true"
                className="inline-block size-2 rounded-full bg-pine shadow-[0_0_12px_rgb(108_99_255/0.7)]"
              />
              Ife
            </a>

            <div className="hidden gap-8 text-ink-soft md:flex">
              {links.map((link) => {
                const isActive = link.id === activeId;

                return (
                  <a
                    key={link.href}
                    href={link.href}
                    aria-current={isActive ? "location" : undefined}
                    className={`group relative rounded-sm outline-none transition-colors hover:text-pine focus-visible:text-pine focus-visible:ring-2 focus-visible:ring-pine/60 ${
                      isActive ? "text-pine" : ""
                    }`}
                  >
                    {link.label}

                    <span
                      aria-hidden="true"
                      className={`absolute -bottom-1 left-0 h-px bg-pine transition-[width] duration-300 ease-out group-hover:w-full ${
                        isActive ? "w-full" : "w-0"
                      }`}
                    />
                  </a>
                );
              })}
            </div>

            <div className="flex items-center gap-4">
              <motion.div
                ref={magnetic.ref}
                style={{
                  x: magnetic.x,
                  y: magnetic.y,
                }}
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
                  transition={{
                    duration: 0.4,
                    ease: motionEase,
                  }}
                  className="inline-block transition-colors border rounded-full outline-none border-paper bg-paper text-bg hover:border-pine hover:bg-pine focus-visible:ring-2 focus-visible:ring-pine focus-visible:ring-offset-4 focus-visible:ring-offset-bg"
                >
                  Say hello
                </motion.a>
              </motion.div>

              <button
                ref={menuButtonRef}
                type="button"
                aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
                aria-expanded={menuOpen}
                aria-controls="mobile-navigation"
                onClick={() => setMenuOpen((open) => !open)}
                className="relative z-40 flex items-center justify-center rounded-full outline-none size-11 text-paper focus-visible:ring-2 focus-visible:ring-pine md:hidden"
              >
                {menuOpen ? (
                  <X aria-hidden="true" className="size-5" />
                ) : (
                  <Menu aria-hidden="true" className="size-5" />
                )}
              </button>
            </div>
          </div>
        </motion.nav>
      </div>

      <AnimatePresence>
  {menuOpen && (
    <motion.nav
      id="mobile-navigation"
      aria-label="Mobile navigation"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-20 flex flex-col items-center justify-center gap-1.5 bg-bg md:hidden"
    >
      {links.map((link, index) => {
        const isActive = link.id === activeId;

        return (
          <motion.a
            key={link.href}
            ref={index === 0 ? firstMenuLinkRef : undefined}
            href={link.href}
            onClick={closeMenu}
            aria-current={isActive ? "location" : undefined}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.3,
              delay: 0.06 + index * 0.05,
              ease: motionEase,
            }}
            className={`rounded-sm py-4 font-display text-[22px] font-medium tracking-tight outline-none transition-colors hover:text-pine focus-visible:text-pine focus-visible:ring-2 focus-visible:ring-pine sm:text-[24px] ${
              isActive ? "text-pine" : "text-paper"
            }`}
          >
            {link.label}
          </motion.a>
        );
      })}

      <motion.a
        href="#contact"
        onClick={closeMenu}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.3,
          delay: 0.06 + links.length * 0.05,
          ease: motionEase,
        }}
        className="mt-5 inline-block rounded-[3px] border border-paper bg-paper px-5 py-2.5 font-mono text-[13px] text-bg outline-none transition-colors hover:border-pine hover:bg-pine focus-visible:ring-2 focus-visible:ring-pine focus-visible:ring-offset-4 focus-visible:ring-offset-bg"
      >
        Say hello
      </motion.a>
    </motion.nav>
  )}
</AnimatePresence>
    </>
  );
}