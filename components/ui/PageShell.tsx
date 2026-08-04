"use client";

import { useEffect, useState, type ReactNode } from "react";
import Loader from "@/components/ui/Loader";

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
