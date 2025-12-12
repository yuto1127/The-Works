"use client";

import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Wind } from "lucide-react";

type Phase = "inhale" | "hold" | "exhale";

const DURATIONS = {
  inhale: 4000, // 4秒
  hold: 7000, // 7秒
  exhale: 8000, // 8秒
};

const PHASE_LABELS: Record<Phase, string> = {
  inhale: "吸って...",
  hold: "止めて...",
  exhale: "吐いて...",
};

export default function BreathingGuide() {
  const [phase, setPhase] = useState<Phase>("inhale");
  const [scale, setScale] = useState(0.5);
  const phaseRef = useRef<Phase>("inhale");
  const animationRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);

  useEffect(() => {
    phaseRef.current = phase;

    const animate = (timestamp: number) => {
      if (!startTimeRef.current) {
        startTimeRef.current = timestamp;
      }

      const elapsed = timestamp - startTimeRef.current;

      switch (phaseRef.current) {
        case "inhale": {
          const progress = Math.min(elapsed / DURATIONS.inhale, 1);
          setScale(0.5 + progress * 0.5); // 0.5 → 1.0
          if (progress >= 1) {
            startTimeRef.current = timestamp;
            phaseRef.current = "hold";
            setPhase("hold");
          }
          break;
        }
        case "hold": {
          if (elapsed >= DURATIONS.hold) {
            startTimeRef.current = timestamp;
            phaseRef.current = "exhale";
            setPhase("exhale");
          }
          break;
        }
        case "exhale": {
          const progress = Math.min(elapsed / DURATIONS.exhale, 1);
          setScale(1.0 - progress * 0.5); // 1.0 → 0.5
          if (progress >= 1) {
            startTimeRef.current = timestamp;
            phaseRef.current = "inhale";
            setPhase("inhale");
          }
          break;
        }
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    startTimeRef.current = null;
    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [phase]);

  const getPhaseColor = () => {
    switch (phase) {
      case "inhale":
        return "bg-blue-500";
      case "hold":
        return "bg-green-500";
      case "exhale":
        return "bg-purple-500";
    }
  };

  const getTransitionDuration = () => {
    switch (phase) {
      case "inhale":
        return `${DURATIONS.inhale}ms`;
      case "hold":
        return "0ms";
      case "exhale":
        return `${DURATIONS.exhale}ms`;
    }
  };

  return (
    <Card className="h-full bg-[#1e1e1e] border-[#3c3c3c]">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Wind className="h-5 w-5" />
          Breathing Guide (4-7-8呼吸法)
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center h-full">
        <div className="space-y-8">
          <div className="relative w-64 h-64 flex items-center justify-center">
            <div
              className={`absolute rounded-full ${getPhaseColor()} ease-in-out`}
              style={{
                width: `${scale * 256}px`,
                height: `${scale * 256}px`,
                transition: `width ${getTransitionDuration()}, height ${getTransitionDuration()}`,
              }}
            />
            <div className="absolute text-3xl font-bold text-white z-10 drop-shadow-lg">
              {PHASE_LABELS[phase]}
            </div>
          </div>

          <div className="text-center space-y-2">
            <div className="text-lg text-[#cccccc]">4秒: 吸う</div>
            <div className="text-lg text-[#cccccc]">7秒: 止める</div>
            <div className="text-lg text-[#cccccc]">8秒: 吐く</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

