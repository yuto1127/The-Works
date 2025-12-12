"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Minimize2, FileCode } from "lucide-react";

export default function JsonFormatter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState<string | null>(null);

  const formatJson = () => {
    try {
      setError(null);
      const parsed = JSON.parse(input);
      const formatted = JSON.stringify(parsed, null, 2);
      setOutput(formatted);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Invalid JSON";
      setError(errorMessage);
      setOutput("");
    }
  };

  const minifyJson = () => {
    try {
      setError(null);
      const parsed = JSON.parse(input);
      const minified = JSON.stringify(parsed);
      setOutput(minified);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Invalid JSON";
      setError(errorMessage);
      setOutput("");
    }
  };

  return (
    <div className="flex flex-col h-full p-4">
      <Card className="mb-4">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileCode className="h-5 w-5" />
            JSON Formatter
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2 mb-4">
            <Button onClick={formatJson} className="flex-1">
              <FileCode className="h-4 w-4 mr-2" />
              Format
            </Button>
            <Button onClick={minifyJson} variant="outline" className="flex-1">
              <Minimize2 className="h-4 w-4 mr-2" />
              Minify
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="flex-1 grid grid-cols-2 gap-4">
        <div className="flex flex-col">
          <label className="text-sm text-[#858585] mb-2">入力</label>
          <Textarea
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              setError(null);
              setOutput("");
            }}
            placeholder="JSON文字列を貼り付け..."
            className="flex-1 font-mono text-sm"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm text-[#858585] mb-2">出力</label>
          {error ? (
            <div className="flex-1 p-4 bg-[#3c1f1f] border border-red-500 rounded-md text-red-400 font-mono text-sm">
              <div className="font-bold mb-2">エラー:</div>
              <div>{error}</div>
            </div>
          ) : (
            <ScrollArea className="flex-1 border border-[#3c3c3c] rounded-md bg-[#252526] p-4">
              <pre className="font-mono text-sm text-[#cccccc] whitespace-pre-wrap break-words">
                {output || "結果がここに表示されます..."}
              </pre>
            </ScrollArea>
          )}
        </div>
      </div>
    </div>
  );
}

