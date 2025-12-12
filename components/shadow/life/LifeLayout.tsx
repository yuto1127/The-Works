"use client";

import MailGenerator from "./MailGenerator";
import BusinessBingo from "./BusinessBingo";
import BreathingGuide from "./BreathingGuide";
import WorldClock from "./WorldClock";

export default function LifeLayout() {
  return (
    <div className="flex flex-col h-full p-2 md:p-4 gap-4 overflow-auto overflow-x-hidden">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
        <div className="min-h-[400px]">
          <MailGenerator />
        </div>
        <div className="min-h-[400px]">
          <BusinessBingo />
        </div>
        <div className="min-h-[400px]">
          <BreathingGuide />
        </div>
        <div className="min-h-[400px]">
          <WorldClock />
        </div>
      </div>
    </div>
  );
}

