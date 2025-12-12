"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail } from "lucide-react";

type Recipient = "上司" | "取引先";
type Purpose = "謝罪" | "依頼" | "報告";
type Level = "低" | "高";

const templates: Record<
  string,
  (recipient: Recipient, level: Level) => string
> = {
  "上司-謝罪-低": () =>
    "お疲れ様です。\n\nこの度は、ご迷惑をおかけし申し訳ございません。\n今後このようなことのないよう、十分注意いたします。\n\n引き続きよろしくお願いいたします。",
  "上司-謝罪-高": () =>
    "お疲れ様です。\n\nこの度は、大変ご迷惑をおかけし、深くお詫び申し上げます。\n今回の件につきまして、詳細な原因分析を行い、再発防止策を講じる所存です。\n\nご多忙の中恐縮ですが、何卒ご理解いただけますようお願い申し上げます。",
  "取引先-謝罪-低": () =>
    "平素より大変お世話になっております。\n\nこの度は、ご迷惑をおかけし申し訳ございませんでした。\n今後このようなことがないよう、十分注意いたします。\n\n引き続きよろしくお願いいたします。",
  "取引先-謝罪-高": () =>
    "平素より大変お世話になっております。\n\nこの度は、多大なるご迷惑をおかけし、謹んでお詫び申し上げます。\n今回の件につきまして、早急に原因を調査し、再発防止策を実施いたします。\n\nご多忙の中恐縮ですが、何卒ご容赦いただけますようお願い申し上げます。",
  "上司-依頼-低": () =>
    "お疲れ様です。\n\nお忙しいところ恐縮ですが、以下の件についてご確認いただけますでしょうか。\nご都合の良いタイミングでご返信いただければと存じます。\n\nよろしくお願いいたします。",
  "上司-依頼-高": () =>
    "お疲れ様です。\n\n突然のご連絡で恐縮ですが、重要な件についてご相談がございます。\nお時間をいただけますでしょうか。\nご多忙の中恐縮ですが、何卒ご対応いただけますようお願い申し上げます。",
  "取引先-依頼-低": () =>
    "平素より大変お世話になっております。\n\nお忙しいところ恐縮ですが、以下の件についてご確認いただけますでしょうか。\nご都合の良いタイミングでご返信いただければと存じます。\n\n引き続きよろしくお願いいたします。",
  "取引先-依頼-高": () =>
    "平素より大変お世話になっております。\n\n突然のご連絡で恐縮ですが、重要な件についてご相談がございます。\nお時間をいただけますでしょうか。\nご多忙の中恐縮ですが、何卒ご対応いただけますようお願い申し上げます。",
  "上司-報告-低": () =>
    "お疲れ様です。\n\n以下の件について報告いたします。\nご確認のほどよろしくお願いいたします。",
  "上司-報告-高": () =>
    "お疲れ様です。\n\n重要な件につきまして、ご報告申し上げます。\n詳細は以下の通りです。ご確認のほど何卒よろしくお願い申し上げます。",
  "取引先-報告-低": () =>
    "平素より大変お世話になっております。\n\n以下の件についてご報告いたします。\nご確認のほどよろしくお願いいたします。",
  "取引先-報告-高": () =>
    "平素より大変お世話になっております。\n\n重要な件につきまして、ご報告申し上げます。\n詳細は以下の通りです。ご確認のほど何卒よろしくお願い申し上げます。",
};

export default function MailGenerator() {
  const [recipient, setRecipient] = useState<Recipient>("上司");
  const [purpose, setPurpose] = useState<Purpose>("依頼");
  const [level, setLevel] = useState<Level>("低");
  const [generatedMail, setGeneratedMail] = useState("");

  const handleGenerate = () => {
    const key = `${recipient}-${purpose}-${level}`;
    const template = templates[key];
    if (template) {
      setGeneratedMail(template(recipient, level));
    }
  };

  return (
    <Card className="h-full bg-[#1e1e1e] border-[#3c3c3c]">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Mail className="h-5 w-5" />
          Mail Generator
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-3 gap-4">
          <div className="space-y-2">
            <label className="text-sm text-[#858585]">相手</label>
            <Select
              options={[
                { value: "上司", label: "上司" },
                { value: "取引先", label: "取引先" },
              ]}
              value={recipient}
              onChange={(e) => setRecipient(e.target.value as Recipient)}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm text-[#858585]">用件</label>
            <Select
              options={[
                { value: "謝罪", label: "謝罪" },
                { value: "依頼", label: "依頼" },
                { value: "報告", label: "報告" },
              ]}
              value={purpose}
              onChange={(e) => setPurpose(e.target.value as Purpose)}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm text-[#858585]">レベル</label>
            <Select
              options={[
                { value: "低", label: "低" },
                { value: "高", label: "高" },
              ]}
              value={level}
              onChange={(e) => setLevel(e.target.value as Level)}
            />
          </div>
        </div>

        <Button onClick={handleGenerate} className="w-full">
          メールを生成
        </Button>

        <div className="space-y-2">
          <label className="text-sm text-[#858585]">生成されたメール本文</label>
          <Textarea
            value={generatedMail}
            onChange={(e) => setGeneratedMail(e.target.value)}
            placeholder="ここに生成されたメール本文が表示されます..."
            className="min-h-[200px] font-mono"
          />
        </div>
      </CardContent>
    </Card>
  );
}

