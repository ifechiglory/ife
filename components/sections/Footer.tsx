import Link from "next/link";
import {
  Github,
  Linkedin,
  Mail,
  type LucideIcon,
} from "lucide-react";
import { projects } from "@/lib/data";

type NavigationLink = {
  label: string;
  href: string;
};

type ConnectLink = {
  label: string;
  href: string;
  icon: LucideIcon;
  external?: boolean;
};

const navigateLinks: NavigationLink[] = [
  { label: "About", href: "/#about" },
  { label: "Skills", href: "/#skills" },
  { label: "Experience", href: "/#experience" },
  { label: "Projects", href: "/#projects" },
  { label: "Teaching", href: "/#teaching" },
  { label: "Contact", href: "/#contact" },
];

const connectLinks: ConnectLink[] = [
  {
    label: "GitHub",
    href: "https://github.com/ifechiglory",
    icon: Github,
    external: true,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/ifechukwumaxoti/",
    icon: Linkedin,
    external: true,
  },
  {
    label: "Email",
    href: "mailto:ifechiglory@gmail.com",
    icon: Mail,
  },
];

const selectedWork = projects.slice(0, 4).map((project) => ({
  label: project.title,
  href: `/work/${project.slug}`,
}));

export default function Footer() {
  return (
    <footer className="relative px-6 py-16 overflow-hidden border-t z-2 isolate border-line md:px-20 md:py-20">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 z-0 overflow-hidden leading-none text-center pointer-events-none select-none"
      >
        <span
          className="font-medium font-display text-paper/5"
          style={{
            fontSize: "clamp(4.5rem, 16vw, 11rem)",
          }}
        >
          Ife
        </span>
      </div>

      <div className="relative z-10 grid grid-cols-1 gap-12 md:grid-cols-[1.3fr_1fr_1fr_1fr_1fr] md:gap-8">
        <div>
          <Link
            href="/"
            aria-label="Ifechukwu Max-Oti — back to top"
            className="text-xl font-medium transition-colors rounded-sm outline-none font-display text-paper hover:text-pine focus-visible:text-pine focus-visible:ring-2 focus-visible:ring-pine/60"
          >
            &lt;Ife/&gt;
          </Link>

          <p className="mt-3 max-w-60 text-[13.5px] leading-[1.7] text-ink-soft">
            Frontend developer and tutor, building thoughtful interfaces and
            helping others learn how to build them too.
          </p>
        </div>

        <div>
          <h2 className="mb-4 font-mono text-[11px] uppercase tracking-wide text-pine">
            Navigate
          </h2>

          <ul className="space-y-2.5">
            {navigateLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="rounded-sm text-[13.5px] text-ink-soft outline-none transition-colors hover:text-paper focus-visible:text-paper focus-visible:ring-2 focus-visible:ring-pine/60"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="mb-4 font-mono text-[11px] uppercase tracking-wide text-pine">
            Connect
          </h2>

          <ul className="space-y-2.5">
            {connectLinks.map(
              ({ label, href, icon: Icon, external }) => (
                <li key={label}>
                  <a
                    href={href}
                    target={external ? "_blank" : undefined}
                    rel={external ? "noopener noreferrer" : undefined}
                    className="flex w-fit items-center gap-2 rounded-sm text-[13.5px] text-ink-soft outline-none transition-colors hover:text-paper focus-visible:text-paper focus-visible:ring-2 focus-visible:ring-pine/60"
                  >
                    <Icon aria-hidden="true" className="size-3.5" />
                    {label}
                  </a>
                </li>
              )
            )}
          </ul>
        </div>

        <div>
          <h2 className="mb-4 font-mono text-[11px] uppercase tracking-wide text-pine">
            Selected work
          </h2>

          <ul className="space-y-2.5">
            {selectedWork.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="rounded-sm text-[13.5px] text-ink-soft outline-none transition-colors hover:text-paper focus-visible:text-paper focus-visible:ring-2 focus-visible:ring-pine/60"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="mb-4 font-mono text-[11px] uppercase tracking-wide text-pine">
            Currently
          </h2>

          <p className="text-[13.5px] leading-[1.7] text-ink-soft">
            Frontend Developer and Tutor at Attueyi Coding Academy, building
            learning experiences and mentoring upcoming developers.
          </p>
        </div>
      </div>

      <div className="relative z-10 flex flex-col-reverse items-center gap-4 pt-8 border-t mt-14 border-line sm:flex-row sm:justify-between">
        <p className="font-mono text-[11.5px] text-stone">
          &copy; {new Date().getFullYear()} Ifechukwu Max-Oti. Designed and
          built by me.
        </p>

        <p className="font-mono text-[11.5px] text-stone">
          <span className="inline-flex items-center gap-1.5">
            <span
              aria-hidden="true"
              className="size-1.5 animate-pulse-dot rounded-full bg-pine"
            />
            Open to work
          </span>
        </p>
      </div>
    </footer>
  );
}