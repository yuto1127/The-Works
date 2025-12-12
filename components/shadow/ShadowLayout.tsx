"use client";

import { useState } from "react";
import ActivityBar from "./ActivityBar";
import Sidebar from "./Sidebar";
import EditorArea from "./EditorArea";
import StatusBar from "./StatusBar";
import MobileBottomNav from "./MobileBottomNav";

type ActiveView = "dev-tools" | "life";

export default function ShadowLayout() {
  const [activeView, setActiveView] = useState<ActiveView>("dev-tools");

  return (
    <div className="h-screen flex flex-col bg-[#1e1e1e] overflow-hidden">
      <div className="flex flex-1 overflow-hidden relative">
        {/* Desktop: Activity Bar and Sidebar */}
        <div className="hidden md:flex">
          <ActivityBar onViewChange={setActiveView} />
          <Sidebar />
        </div>
        {/* Mobile: Bottom Navigation */}
        <MobileBottomNav activeView={activeView} onViewChange={setActiveView} />
        {/* Editor Area */}
        <EditorArea activeView={activeView} />
      </div>
      <StatusBar />
    </div>
  );
}

