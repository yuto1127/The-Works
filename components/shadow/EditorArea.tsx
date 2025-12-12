"use client";

import DevToolsLayout from "./devtools/DevToolsLayout";
import LifeLayout from "./life/LifeLayout";

type ActiveView = "dev-tools" | "life";

interface EditorAreaProps {
  activeView: ActiveView;
}

export default function EditorArea({ activeView }: EditorAreaProps) {
  const getViewContent = () => {
    switch (activeView) {
      case "dev-tools":
        return <DevToolsLayout />;
      case "life":
        return <LifeLayout />;
      default:
        return <DevToolsLayout />;
    }
  };

  return (
    <div className="flex-1 bg-[#1e1e1e] text-[#cccccc] overflow-hidden pb-14 md:pb-0">
      {getViewContent()}
    </div>
  );
}

