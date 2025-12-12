"use client";

import { Wrench, Coffee } from "lucide-react";

type ActiveView = "dev-tools" | "life";

interface MobileBottomNavProps {
  activeView: ActiveView;
  onViewChange: (view: ActiveView) => void;
}

export default function MobileBottomNav({
  activeView,
  onViewChange,
}: MobileBottomNavProps) {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-[#2c2c2c] border-t border-[#1e1e1e] z-50">
      <div className="flex items-center justify-around h-14">
        <button
          onClick={() => onViewChange("dev-tools")}
          className={`flex flex-col items-center justify-center flex-1 h-full transition-colors ${
            activeView === "dev-tools"
              ? "bg-[#37373d] text-white"
              : "text-[#858585] hover:bg-[#37373d]"
          }`}
          aria-label="Dev Tools"
        >
          <Wrench className="h-5 w-5 mb-1" />
          <span className="text-xs">Dev</span>
        </button>
        <button
          onClick={() => onViewChange("life")}
          className={`flex flex-col items-center justify-center flex-1 h-full transition-colors ${
            activeView === "life"
              ? "bg-[#37373d] text-white"
              : "text-[#858585] hover:bg-[#37373d]"
          }`}
          aria-label="Life"
        >
          <Coffee className="h-5 w-5 mb-1" />
          <span className="text-xs">Life</span>
        </button>
      </div>
    </div>
  );
}

