"use client";

import { useRef } from "react";
import { useLoaderSequence } from "@/hooks/useLoaderSequence";

interface LoaderProps {
  onComplete: () => void;
}

/** Splits a string into individually-toggleable spans for the GSAP-driven
 *  character-by-character type-in. */
function Chars({ text }: { text: string }) {
  return (
    <>
      {text.split("").map((ch, i) => (
        <span key={i} className="inline-block opacity-0">
          {ch}
        </span>
      ))}
    </>
  );
}

export default function Loader({ onComplete }: LoaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);

  useLoaderSequence(containerRef, wrapRef, logoRef, { onComplete });

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-100 flex items-center justify-center bg-bg"
      aria-hidden
    >
      <div ref={wrapRef} className="flex items-center font-mono text-4xl sm:text-5xl">
        {/* code-bracket decoration — fades away during the morph, doesn't
            travel to the nav position, since the real logo doesn't have it */}
        <span data-bracket="open" className="text-stone">
          <Chars text="<" />
        </span>

        {/* caret starts here, right after the open bracket — its natural
            "nothing typed yet" position — then the GSAP sequence walks it
            forward to trail each character as it's revealed. It must NOT
            start at the end of the markup (after the close bracket): that
            would render it already parked at the final position on mount,
            visible before any animation has run. */}
        <span
          data-caret
          className="ml-0.5 inline-block h-[0.7em] w-0.75 translate-y-0.5 bg-pine"
        />

        <div ref={logoRef} className="mx-1 flex origin-left items-center gap-2.5">
          <span data-dot className="inline-block h-2.5 w-2.5 shrink-0 rounded-full bg-pine shadow-[0_0_16px_rgba(47,122,82,0.7)]" />
          <span data-chars="logo" className="font-display font-semibold tracking-tight text-paper">
            <Chars text="Ife" />
          </span>
        </div>

        <span data-bracket="close" className="text-stone">
          <Chars text="/>" />
        </span>
      </div>
    </div>
  );
}
