"use client";

import { Wrench, Coffee } from "lucide-react";
import { useState } from "react";

type ActiveView = "dev-tools" | "life";

interface ActivityBarProps {
  onViewChange: (view: ActiveView) => void;
}

export default function ActivityBar({ onViewChange }: ActivityBarProps) {
  const [activeView, setActiveView] = useState<ActiveView>("dev-tools");

  const handleClick = (view: ActiveView) => {
    setActiveView(view);
    onViewChange(view);
  };

  return (
    <div className="flex flex-col items-center bg-[#2c2c2c] border-r border-[#1e1e1e] w-12 h-full">
      <button
        onClick={() => handleClick("dev-tools")}
        className={`w-full p-3 hover:bg-[#37373d] transition-colors relative ${
          activeView === "dev-tools" ? "bg-[#37373d]" : ""
        }`}
        aria-label="Dev Tools"
      >
        {activeView === "dev-tools" && (
          <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-white" />
        )}
        <Wrench
          className={`w-5 h-5 mx-auto ${
            activeView === "dev-tools"
              ? "text-white"
              : "text-[#858585]"
          }`}
        />
      </button>
      <button
        onClick={() => handleClick("life")}
        className={`w-full p-3 hover:bg-[#37373d] transition-colors relative ${
          activeView === "life" ? "bg-[#37373d]" : ""
        }`}
        aria-label="Life"
      >
        {activeView === "life" && (
          <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-white" />
        )}
        <Coffee
          className={`w-5 h-5 mx-auto ${
            activeView === "life" ? "text-white" : "text-[#858585]"
          }`}
        />
      </button>
    </div>
  );
}

