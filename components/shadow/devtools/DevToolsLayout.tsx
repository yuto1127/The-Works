"use client";

import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FileCode, Wrench, GitBranch, BookOpen } from "lucide-react";
import NamingGod from "./NamingGod";
import JsonFormatter from "./JsonFormatter";
import GitGacha from "./GitGacha";
import MyWiki from "./MyWiki";

type DevTool = "naming-god" | "json-formatter" | "git-gacha" | "my-wiki";

interface ToolInfo {
  id: DevTool;
  name: string;
  icon: React.ReactNode;
}

const tools: ToolInfo[] = [
  {
    id: "naming-god",
    name: "命名の神",
    icon: <Wrench className="h-4 w-4" />,
  },
  {
    id: "json-formatter",
    name: "JSON Formatter",
    icon: <FileCode className="h-4 w-4" />,
  },
  {
    id: "git-gacha",
    name: "Git Gacha",
    icon: <GitBranch className="h-4 w-4" />,
  },
  {
    id: "my-wiki",
    name: "My Wiki",
    icon: <BookOpen className="h-4 w-4" />,
  },
];

export default function DevToolsLayout() {
  const [activeTool, setActiveTool] = useState<DevTool>("naming-god");

  const renderTool = () => {
    switch (activeTool) {
      case "naming-god":
        return <NamingGod />;
      case "json-formatter":
        return <JsonFormatter />;
      case "git-gacha":
        return <GitGacha />;
      case "my-wiki":
        return <MyWiki />;
      default:
        return <NamingGod />;
    }
  };

  return (
    <div className="flex h-full overflow-x-hidden">
      {/* 左側: 機能リスト（エクスプローラー風） */}
      <div className="hidden md:flex w-64 border-r border-[#3c3c3c] bg-[#252526] flex-col">
        <div className="p-3 border-b border-[#3c3c3c]">
          <div className="text-xs font-semibold text-[#858585] uppercase tracking-wider">
            Dev Tools
          </div>
        </div>
        <ScrollArea className="flex-1">
          <div className="p-2">
            {tools.map((tool) => (
              <button
                key={tool.id}
                onClick={() => setActiveTool(tool.id)}
                className={`w-full flex items-center gap-2 px-3 py-2 rounded text-sm transition-colors ${
                  activeTool === tool.id
                    ? "bg-[#37373d] text-white"
                    : "text-[#cccccc] hover:bg-[#2a2d2e]"
                }`}
              >
                {tool.icon}
                <span>{tool.name}</span>
              </button>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* 右側: 選択したツールの実行画面 */}
      <div className="flex-1 bg-[#1e1e1e] overflow-hidden overflow-x-hidden">
        {renderTool()}
      </div>
    </div>
  );
}

