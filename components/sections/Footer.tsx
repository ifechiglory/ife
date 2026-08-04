import Link from "next/link";
import { Github, Linkedin, Mail } from "lucide-react";
import { projects } from "@/lib/data";

const navigateLinks = [
  { label: "About", href: "/#about" },
  { label: "Work", href: "/#work" },
  { label: "Projects", href: "/#projects" },
  { label: "Teaching", href: "/#teaching" },
  { label: "Contact", href: "/#contact" },
];

const connectLinks = [
  { label: "GitHub", href: "https://github.com/ifechiglory", external: true },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/ifechukwumaxoti/", external: true },
  {
    label: "Email",
    href: "mailto:ifechiglory@gmail.com?subject=Hello%20from%20your%20portfolio!&body=Hi%20there%2C%20I%20just%20saw%20your%20portfolio%20and%20wanted%20to%20reach%20out...",
    external: false,
  },
];

const selectedWork = projects.slice(0, 4).map((p) => ({
  label: p.title,
  href: `/work/${p.slug}`,
}));

export default function Footer() {
  return (
    <footer className="relative z-2 overflow-hidden border-t border-line px-6 py-16 md:px-20 md:py-20">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 select-none overflow-hidden text-center leading-none"
      >
        <span
          className="font-display font-medium text-paper/5"
          style={{ fontSize: "clamp(4.5rem, 16vw, 11rem)" }}
        >
          Ife
        </span>
      </div>

      <div className="relative grid grid-cols-1 gap-12 md:grid-cols-[1.3fr_1fr_1fr_1fr_1fr] md:gap-8">
        <div>
          <Link href="/" className="font-display text-xl font-medium text-paper">
            &lt;Ife/&gt;
          </Link>
          <p className="mt-3 max-w-60 text-[13.5px] leading-[1.7] text-ink-soft">
            Frontend developer and tutor, building interfaces and teaching people how to build them too.
          </p>
        </div>

        <div>
          <h3 className="mb-4 font-mono text-[11px] uppercase tracking-wide text-pine">
            Navigate
          </h3>
          <ul className="space-y-2.5">
            {navigateLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="text-[13.5px] text-ink-soft transition-colors hover:text-paper"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-4 font-mono text-[11px] uppercase tracking-wide text-pine">
            Connect
          </h3>
          <ul className="space-y-2.5">
            {connectLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  target={link.external ? "_blank" : undefined}
                  rel={link.external ? "noopener noreferrer" : undefined}
                  className="flex items-center gap-2 text-[13.5px] text-ink-soft transition-colors hover:text-paper"
                >
                  {link.label === "GitHub" && <Github className="h-3.5 w-3.5" />}
                  {link.label === "LinkedIn" && <Linkedin className="h-3.5 w-3.5" />}
                  {link.label === "Email" && <Mail className="h-3.5 w-3.5" />}
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-4 font-mono text-[11px] uppercase tracking-wide text-pine">
            Selected work
          </h3>
          <ul className="space-y-2.5">
            {selectedWork.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-[13.5px] text-ink-soft transition-colors hover:text-paper"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-4 font-mono text-[11px] uppercase tracking-wide text-pine">
            Currently
          </h3>
          <p className="text-[13.5px] leading-[1.7] text-ink-soft">
            Frontend Developer @ Gardeners For Africa, mentoring devs at
            Attueyi Coding Academy.
          </p>
        </div>
      </div>

      <div className="relative mt-14 flex flex-col-reverse items-center gap-4 border-t border-line pt-8 sm:flex-row sm:justify-between">
        <p className="font-mono text-[11.5px] text-stone">
          &copy; {new Date().getFullYear()} Ifechukwu Max-Oti. Designed &amp; built by me.
        </p>
        <p className="font-mono text-[11.5px] text-stone">
          <span className="inline-flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-[#7FB88F]" />
            open to work
          </span>
        </p>
      </div>
    </footer>
  );
}
