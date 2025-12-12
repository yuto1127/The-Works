"use client";

import { useState, useEffect } from "react";
import { Copy, Check, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

type NamingCase = "camelCase" | "PascalCase" | "snake_case" | "kebab-case" | "CONSTANT_CASE";

interface ConversionResult {
  case: NamingCase;
  value: string;
}

export default function NamingGod() {
  const [input, setInput] = useState("");
  const [translatedText, setTranslatedText] = useState<string>("");
  const [isTranslating, setIsTranslating] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  // 日本語が含まれているか判定
  const containsJapanese = (text: string): boolean => {
    const japaneseRegex = /[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF]/;
    return japaneseRegex.test(text);
  };

  // 翻訳APIを呼び出し
  const translateToEnglish = async (text: string): Promise<string> => {
    try {
      const response = await fetch(
        `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=ja|en`
      );
      const data = await response.json();
      if (data.responseStatus === 200 && data.responseData?.translatedText) {
        return data.responseData.translatedText;
      }
      return text;
    } catch (error) {
      console.error("Translation error:", error);
      return text;
    }
  };

  // Debounce処理で翻訳を実行
  useEffect(() => {
    if (!input.trim()) {
      setTranslatedText("");
      setIsTranslating(false);
      return;
    }

    // 日本語が含まれていない場合は翻訳不要
    if (!containsJapanese(input)) {
      setTranslatedText(input);
      setIsTranslating(false);
      return;
    }

    // 翻訳が必要な場合
    setIsTranslating(true);
    const timer = setTimeout(async () => {
      const translated = await translateToEnglish(input);
      setTranslatedText(translated);
      setIsTranslating(false);
    }, 800);

    return () => clearTimeout(timer);
  }, [input]);

  // 変換に使用するテキスト（翻訳済みの場合はそれを使用、そうでなければ元の入力）
  // 日本語が含まれていて翻訳中の場合は、前回の翻訳結果を使用（翻訳完了まで待つ）
  const sourceText = (containsJapanese(input) && isTranslating) 
    ? (translatedText || "") 
    : (translatedText || input);

  const convertToNamingCase = (text: string, caseType: NamingCase): string => {
    if (!text.trim()) return "";

    // 単語に分割（スペース、アンダースコア、ハイフン、大文字で分割）
    const words = text
      .replace(/[_\-\s]+/g, " ")
      .replace(/([a-z])([A-Z])/g, "$1 $2")
      .split(/\s+/)
      .filter((w) => w.length > 0)
      .map((w) => w.toLowerCase());

    if (words.length === 0) return "";

    switch (caseType) {
      case "camelCase":
        return words[0] + words.slice(1).map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join("");
      case "PascalCase":
        return words.map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join("");
      case "snake_case":
        return words.join("_");
      case "kebab-case":
        return words.join("-");
      case "CONSTANT_CASE":
        return words.join("_").toUpperCase();
      default:
        return text;
    }
  };

  const conversions: ConversionResult[] = [
    { case: "camelCase", value: convertToNamingCase(sourceText, "camelCase") },
    { case: "PascalCase", value: convertToNamingCase(sourceText, "PascalCase") },
    { case: "snake_case", value: convertToNamingCase(sourceText, "snake_case") },
    { case: "kebab-case", value: convertToNamingCase(sourceText, "kebab-case") },
    { case: "CONSTANT_CASE", value: convertToNamingCase(sourceText, "CONSTANT_CASE") },
  ];

  const handleCopy = async (text: string, index: number) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div className="flex flex-col h-full p-4">
      <Card className="mb-4">
        <CardHeader>
          <CardTitle>命名の神 (Naming God)</CardTitle>
        </CardHeader>
        <CardContent>
          <Input
            placeholder="日本語や英語のテキストを入力..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="mb-2"
          />
          {isTranslating && (
            <div className="flex items-center gap-2 text-sm text-[#858585] mb-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Translating...</span>
            </div>
          )}
          {translatedText && translatedText !== input && !isTranslating && (
            <div className="text-xs text-[#858585] mb-2">
              Source: <span className="text-[#cccccc]">{translatedText}</span>
            </div>
          )}
        </CardContent>
      </Card>

      <ScrollArea className="flex-1">
        <div className="space-y-2">
          {conversions.map((conv, index) => (
            <Card key={conv.case} className="bg-[#1e1e1e]">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="text-xs text-[#858585] mb-1">{conv.case}</div>
                    <div className="font-mono text-[#cccccc] break-all">{conv.value || "(空)"}</div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleCopy(conv.value, index)}
                    className="ml-4"
                  >
                    {copiedIndex === index ? (
                      <Check className="h-4 w-4 text-green-500" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}

