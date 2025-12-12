"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GitBranch, Sparkles } from "lucide-react";

const commitMessages = [
  "Fix typo",
  "Refactor core logic",
  "WIP: implementation details",
  "Update dependencies",
  "Initial commit",
  "Add new feature",
  "Fix bug",
  "Update documentation",
  "Improve performance",
  "Refactor: clean up code",
  "Add unit tests",
  "Fix memory leak",
  "Update UI components",
  "Optimize database queries",
  "Add error handling",
  "Fix security vulnerability",
  "Update config files",
  "Improve accessibility",
  "Fix edge case",
  "Add comments",
];

export default function GitGacha() {
  const [currentMessage, setCurrentMessage] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [displayedText, setDisplayedText] = useState("");

  const generateCommitMessage = () => {
    setIsGenerating(true);
    setDisplayedText("");
    const randomMessage = commitMessages[Math.floor(Math.random() * commitMessages.length)];
    setCurrentMessage(randomMessage);

    // タイプライター風アニメーション
    let index = 0;
    const interval = setInterval(() => {
      if (index < randomMessage.length) {
        setDisplayedText(randomMessage.substring(0, index + 1));
        index++;
      } else {
        clearInterval(interval);
        setIsGenerating(false);
      }
    }, 50);
  };

  return (
    <div className="flex flex-col items-center justify-center h-full p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <GitBranch className="h-5 w-5" />
            Git Gacha
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center space-y-6">
          <div className="text-center">
            <p className="text-[#858585] mb-4">
              開発者が使いそうな「それっぽいコミットメッセージ」をランダムに生成します
            </p>
          </div>

          <Button
            onClick={generateCommitMessage}
            disabled={isGenerating}
            size="lg"
            className="w-full"
          >
            <Sparkles className="h-4 w-4 mr-2" />
            {isGenerating ? "生成中..." : "Generate Commit"}
          </Button>

          {displayedText && (
            <Card className="w-full bg-[#1e1e1e] border-[#3c3c3c]">
              <CardContent className="p-6">
                <div className="font-mono text-lg text-[#cccccc] min-h-[2rem]">
                  {displayedText}
                  {isGenerating && (
                    <span className="animate-pulse text-[#0e639c]">|</span>
                  )}
                </div>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

