"use client";

import { useEffect, useState } from "react";
import { useModeStore } from "@/stores/useModeStore";

export default function ModeTransition({ children }: { children: React.ReactNode }) {
  const isShadowMode = useModeStore((state) => state.isShadowMode);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [prevMode, setPrevMode] = useState(isShadowMode);

  useEffect(() => {
    if (prevMode !== isShadowMode) {
      setIsTransitioning(true);
      const timer = setTimeout(() => {
        setIsTransitioning(false);
        setPrevMode(isShadowMode);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isShadowMode, prevMode]);

  return (
    <>
      {children}
      {isTransitioning && (
        <div className="fixed inset-0 z-[9999] pointer-events-none">
          {/* Glitch Effect */}
          <div className="absolute inset-0 bg-black" />
          <div
            className="absolute inset-0 opacity-30 glitch-noise"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' /%3E%3C/svg%3E")`,
              backgroundSize: "200px 200px",
            }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-white font-mono text-xl md:text-2xl animate-pulse">
              {isShadowMode ? "ACCESSING..." : "DISCONNECTING..."}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

