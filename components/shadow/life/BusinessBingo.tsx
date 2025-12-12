"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trophy, RotateCcw } from "lucide-react";

const bingoWords = [
  "アジェンダ",
  "エビデンス",
  "なるはや",
  "合意形成",
  "ASAP",
  "PDCA",
  "KPI",
  "ROI",
  "ステークホルダー",
  "オーナーシップ",
  "エンパワメント",
  "リソース",
  "スコープ",
  "デリバリー",
  "イテレーション",
  "アライメント",
  "エンゲージメント",
  "ベストプラクティス",
  "ナレッジシェア",
  "コラボレーション",
  "インパクト",
  "ソリューション",
  "ベネフィット",
  "バリュープロポジション",
  "サステナビリティ",
];

const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export default function BusinessBingo() {
  const [cells, setCells] = useState<string[]>([]);
  const [marked, setMarked] = useState<Set<number>>(new Set());
  const [bingo, setBingo] = useState(false);

  const initializeBoard = () => {
    const shuffled = shuffleArray(bingoWords);
    const board = shuffled.slice(0, 24);
    board.splice(12, 0, "FREE");
    setCells(board);
    setMarked(new Set([12])); // FREEマスは最初からマーク
    setBingo(false);
  };

  useEffect(() => {
    initializeBoard();
  }, []);

  const checkBingo = (newMarked: Set<number>) => {
    const lines = [
      // 横
      [0, 1, 2, 3, 4],
      [5, 6, 7, 8, 9],
      [10, 11, 12, 13, 14],
      [15, 16, 17, 18, 19],
      [20, 21, 22, 23, 24],
      // 縦
      [0, 5, 10, 15, 20],
      [1, 6, 11, 16, 21],
      [2, 7, 12, 17, 22],
      [3, 8, 13, 18, 23],
      [4, 9, 14, 19, 24],
      // 斜め
      [0, 6, 12, 18, 24],
      [4, 8, 12, 16, 20],
    ];

    for (const line of lines) {
      if (line.every((index) => newMarked.has(index))) {
        return true;
      }
    }
    return false;
  };

  const handleCellClick = (index: number) => {
    if (bingo) return;

    const newMarked = new Set(marked);
    if (newMarked.has(index)) {
      newMarked.delete(index);
    } else {
      newMarked.add(index);
    }
    setMarked(newMarked);

    if (checkBingo(newMarked)) {
      setBingo(true);
    }
  };

  return (
    <Card className="h-full bg-[#1e1e1e] border-[#3c3c3c]">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5" />
            Business Bingo
          </CardTitle>
          <Button onClick={initializeBoard} variant="outline" size="sm">
            <RotateCcw className="h-4 w-4 mr-2" />
            リセット
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {bingo && (
          <div className="mb-4 p-4 bg-yellow-500 text-black text-center text-2xl font-bold rounded-md animate-pulse">
            BINGO!
          </div>
        )}

        <div className="grid grid-cols-5 gap-2">
          {cells.map((cell, index) => (
            <button
              key={index}
              onClick={() => handleCellClick(index)}
              className={`aspect-square p-2 text-xs font-medium rounded-md border-2 transition-colors ${
                marked.has(index)
                  ? "bg-[#0e639c] border-[#0e639c] text-white line-through"
                  : "bg-[#252526] border-[#3c3c3c] text-[#cccccc] hover:border-[#0e639c]"
              }`}
            >
              {cell}
            </button>
          ))}
        </div>

        <div className="mt-4 text-sm text-[#858585] text-center">
          会議中の意識高い系ワードをチェック！
        </div>
      </CardContent>
    </Card>
  );
}

