"use client";

import { useEffect, useState } from "react";

export default function StatusBar() {
  const [currentTime, setCurrentTime] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString("ja-JP", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-6 bg-[#007ACC] text-white text-xs flex items-center px-2 justify-between font-mono">
      <div className="flex items-center gap-4">
        <span>main</span>
        <span>●</span>
        <span>UTF-8</span>
      </div>
      <div className="flex items-center gap-2">
        <span>{currentTime}</span>
      </div>
    </div>
  );
}

