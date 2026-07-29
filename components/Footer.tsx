import { Github, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative z-[2] flex flex-col items-center justify-between gap-4 border-t border-line px-6 py-8 font-mono text-xs text-stone sm:flex-row md:px-20">
      <span>Designed &amp; built by Ifechukwu Max-Oti</span>
      <div className="flex gap-5">
        <a
          href="https://github.com/ifechiglory"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
          className="transition-colors hover:text-pine"
        >
          <Github className="h-[18px] w-[18px]" />
        </a>
        <a
          href="mailto:ifechiglory@gmail.com"
          aria-label="Email"
          className="transition-colors hover:text-pine"
        >
          <Mail className="h-[18px] w-[18px]" />
        </a>
      </div>
    </footer>
  );
}
