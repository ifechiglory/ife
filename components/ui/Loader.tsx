"use client";

import { useRef } from "react";
import { useLoaderSequence } from "@/hooks/useLoaderSequence";

interface LoaderProps {
  onComplete: () => void;
}

function Chars({ text }: { text: string }) {
  return (
    <>
      {text.split("").map((character, index) => (
        <span key={`${character}-${index}`} className="inline-block opacity-0">
          {character}
        </span>
      ))}
    </>
  );
}

export default function Loader({ onComplete }: LoaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);

  useLoaderSequence(containerRef, wrapRef, logoRef, {
    onComplete,
  });

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="fixed inset-0 flex items-center justify-center z-100 bg-bg"
    >
      <div
        ref={wrapRef}
        className="flex items-center font-mono text-4xl sm:text-5xl"
      >
        <span data-bracket="open" className="text-stone">
          <Chars text="<" />
        </span>

        <span
          data-caret
          className="ml-0.5 inline-block h-[0.7em] w-0.75 translate-y-0.5 bg-pine"
        />

        <div
          ref={logoRef}
          className="mx-1 flex origin-left items-center gap-2.5"
        >
          <span
            data-dot
            className="inline-block h-2.5 w-2.5 shrink-0 rounded-full bg-pine shadow-[0_0_16px_rgb(108_99_255/0.7)]"
          />

          <span
            data-chars="logo"
            className="font-semibold tracking-tight font-display text-paper"
          >
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
