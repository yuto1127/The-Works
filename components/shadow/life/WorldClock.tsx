"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock } from "lucide-react";

interface ClockData {
  city: string;
  timezone: string;
  abbreviation: string;
}

const cities: ClockData[] = [
  { city: "Tokyo", timezone: "Asia/Tokyo", abbreviation: "JST" },
  { city: "London", timezone: "Europe/London", abbreviation: "GMT" },
  { city: "New York", timezone: "America/New_York", abbreviation: "EST" },
  { city: "UTC", timezone: "UTC", abbreviation: "UTC" },
];

export default function WorldClock() {
  const [times, setTimes] = useState<Record<string, string>>({});

  useEffect(() => {
    const updateTimes = () => {
      const newTimes: Record<string, string> = {};
      cities.forEach((city) => {
        const now = new Date();
        const formatter = new Intl.DateTimeFormat("en-US", {
          timeZone: city.timezone,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        });
        newTimes[city.city] = formatter.format(now);
      });
      setTimes(newTimes);
    };

    updateTimes();
    const interval = setInterval(updateTimes, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Card className="h-full bg-[#1e1e1e] border-[#3c3c3c]">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5" />
          World Clock
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          {cities.map((city) => (
            <div
              key={city.city}
              className="p-4 bg-[#252526] border border-[#3c3c3c] rounded-md"
            >
              <div className="text-sm text-[#858585] mb-2">{city.city}</div>
              <div className="text-3xl font-mono text-[#cccccc] mb-1">
                {times[city.city] || "00:00:00"}
              </div>
              <div className="text-xs text-[#858585]">{city.abbreviation}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
