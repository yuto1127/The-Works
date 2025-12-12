"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FileText, Lock, Plus, Trash2 } from "lucide-react";

interface WikiEntry {
  id: string;
  title: string;
  content: string;
  updatedAt: string;
}

const WIKI_STORAGE_KEY = "shadow-wiki-entries";
const PASSWORD = "shadow";

export default function MyWiki() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [entries, setEntries] = useState<WikiEntry[]>([]);
  const [selectedEntry, setSelectedEntry] = useState<WikiEntry | null>(null);
  const [currentTitle, setCurrentTitle] = useState("");
  const [currentContent, setCurrentContent] = useState("");

  useEffect(() => {
    // 初回アクセス時に認証が必要
    const savedEntries = localStorage.getItem(WIKI_STORAGE_KEY);
    if (savedEntries) {
      try {
        setEntries(JSON.parse(savedEntries));
      } catch (err) {
        console.error("Failed to load wiki entries:", err);
      }
    }
  }, []);

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === PASSWORD) {
      setIsAuthenticated(true);
      setPassword("");
    } else {
      alert("パスワードが正しくありません");
      setPassword("");
    }
  };

  const saveEntries = (newEntries: WikiEntry[]) => {
    setEntries(newEntries);
    localStorage.setItem(WIKI_STORAGE_KEY, JSON.stringify(newEntries));
  };

  const handleCreateNew = () => {
    const newEntry: WikiEntry = {
      id: Date.now().toString(),
      title: "新しいメモ",
      content: "",
      updatedAt: new Date().toISOString(),
    };
    const newEntries = [...entries, newEntry];
    saveEntries(newEntries);
    setSelectedEntry(newEntry);
    setCurrentTitle(newEntry.title);
    setCurrentContent(newEntry.content);
  };

  const handleSelectEntry = (entry: WikiEntry) => {
    setSelectedEntry(entry);
    setCurrentTitle(entry.title);
    setCurrentContent(entry.content);
  };

  const handleSaveEntry = () => {
    if (!selectedEntry) return;

    const updatedEntries = entries.map((entry) =>
      entry.id === selectedEntry.id
        ? {
            ...entry,
            title: currentTitle,
            content: currentContent,
            updatedAt: new Date().toISOString(),
          }
        : entry
    );
    saveEntries(updatedEntries);
    setSelectedEntry(
      updatedEntries.find((e) => e.id === selectedEntry.id) || null
    );
  };

  const handleDeleteEntry = (id: string) => {
    if (!confirm("このメモを削除しますか？")) return;

    const newEntries = entries.filter((e) => e.id !== id);
    saveEntries(newEntries);
    if (selectedEntry?.id === id) {
      setSelectedEntry(null);
      setCurrentTitle("");
      setCurrentContent("");
    }
  };

  const renderMarkdown = (text: string) => {
    // 簡易的なマークダウンレンダリング
    return text
      .split("\n")
      .map((line, i) => {
        // 見出し
        if (line.startsWith("# ")) {
          return (
            <h1 key={i} className="text-2xl font-bold mb-2 mt-4 text-[#cccccc]">
              {line.substring(2)}
            </h1>
          );
        }
        if (line.startsWith("## ")) {
          return (
            <h2 key={i} className="text-xl font-bold mb-2 mt-3 text-[#cccccc]">
              {line.substring(3)}
            </h2>
          );
        }
        if (line.startsWith("### ")) {
          return (
            <h3 key={i} className="text-lg font-bold mb-2 mt-2 text-[#cccccc]">
              {line.substring(4)}
            </h3>
          );
        }
        // コードブロック（簡易版）
        if (line.startsWith("```")) {
          return null; // コードブロックは簡略化
        }
        // リスト
        if (line.match(/^[-*]\s/)) {
          return (
            <li key={i} className="ml-4 mb-1 text-[#cccccc]">
              {line.substring(2)}
            </li>
          );
        }
        // 通常のテキスト
        if (line.trim() === "") {
          return <br key={i} />;
        }
        return (
          <p key={i} className="mb-2 text-[#cccccc]">
            {line}
          </p>
        );
      });
  };

  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center h-full p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lock className="h-5 w-5" />
              パスワード認証
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handlePasswordSubmit} className="space-y-4">
              <Input
                type="password"
                placeholder="パスワードを入力"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoFocus
              />
              <Button type="submit" className="w-full">
                認証
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex h-full">
      {/* 左サイドバー: メモ一覧 */}
      <div className="w-64 border-r border-[#3c3c3c] bg-[#252526] flex flex-col">
        <div className="p-4 border-b border-[#3c3c3c]">
          <Button onClick={handleCreateNew} className="w-full" size="sm">
            <Plus className="h-4 w-4 mr-2" />
            新規メモ
          </Button>
        </div>
        <ScrollArea className="flex-1">
          <div className="p-2 space-y-1">
            {entries.map((entry) => (
              <div
                key={entry.id}
                className={`p-3 rounded cursor-pointer hover:bg-[#2a2d2e] transition-colors ${
                  selectedEntry?.id === entry.id ? "bg-[#37373d]" : ""
                }`}
                onClick={() => handleSelectEntry(entry)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-[#cccccc] truncate">
                      {entry.title}
                    </div>
                    <div className="text-xs text-[#858585] mt-1">
                      {new Date(entry.updatedAt).toLocaleDateString("ja-JP")}
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteEntry(entry.id);
                    }}
                    className="ml-2 h-6 w-6 p-0"
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* メインエリア: 編集とプレビュー */}
      <div className="flex-1 flex">
        {selectedEntry ? (
          <>
            {/* 編集エリア */}
            <div className="flex-1 flex flex-col border-r border-[#3c3c3c]">
              <div className="p-4 border-b border-[#3c3c3c] flex items-center gap-2">
                <Input
                  value={currentTitle}
                  onChange={(e) => setCurrentTitle(e.target.value)}
                  placeholder="タイトル"
                  className="flex-1"
                />
                <Button onClick={handleSaveEntry} size="sm">
                  保存
                </Button>
              </div>
              <Textarea
                value={currentContent}
                onChange={(e) => setCurrentContent(e.target.value)}
                placeholder="マークダウン形式でメモを記述..."
                className="flex-1 rounded-none border-0 resize-none"
              />
            </div>

            {/* プレビューエリア */}
            <div className="w-1/2 flex flex-col bg-[#1e1e1e]">
              <div className="p-4 border-b border-[#3c3c3c]">
                <div className="text-sm text-[#858585] flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  プレビュー
                </div>
              </div>
              <ScrollArea className="flex-1 p-4">
                <div className="text-[#cccccc]">
                  {renderMarkdown(currentContent)}
                </div>
              </ScrollArea>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-[#858585]">
            メモを選択するか、新規メモを作成してください
          </div>
        )}
      </div>
    </div>
  );
}

