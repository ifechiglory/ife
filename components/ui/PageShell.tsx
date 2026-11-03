"use client";

import { useCallback, useEffect, useState, type ReactNode } from "react";
import { MotionConfig } from "motion/react";
import Loader from "@/components/ui/Loader";
import GridBackground from "@/components/ui/GridBackground";

export default function PageShell({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(true);

  const handleLoaderComplete = useCallback(() => {
    setLoading(false);
  }, []);

  useEffect(() => {
    const fallbackTimer = window.setTimeout(() => {
      setLoading(false);
    }, 2500);

    return () => {
      window.clearTimeout(fallbackTimer);
    };
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <div className="relative min-h-screen isolate overflow-x-clip bg-bg">
        <GridBackground />

        <div className="relative z-2">{children}</div>

        {loading && <Loader onComplete={handleLoaderComplete} />}
      </div>
    </MotionConfig>
  );
}