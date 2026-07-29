"use client";

import { useEffect, useState, type ReactNode } from "react";
import Loader from "@/components/Loader";

/**
 * Owns the one-time loader state for the page: renders <Loader/> on top
 * while it's running, locks scroll so the page can't move underneath it,
 * then removes it once the loader's morph-into-the-nav-logo animation
 * completes. The real page content underneath renders immediately (so
 * there's no extra data-loading wait — this is a branding/entrance
 * moment, not an actual loading state) but stays scroll-locked and the
 * nav logo stays invisible (see Nav.tsx) until the loader hands off to it.
 */
export default function PageShell({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.body.style.overflow = loading ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [loading]);

  return (
    <>
      {loading && <Loader onComplete={() => setLoading(false)} />}
      <div style={{ visibility: loading ? "hidden" : "visible" }}>{children}</div>
    </>
  );
}
