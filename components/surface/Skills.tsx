"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { skills } from "@/data/portfolio";

const categoryIcons: Record<string, string> = {
  Frontend: "🎨",
  Backend: "⚙️",
  "IoT/Hardware": "🔌",
  Others: "📦",
};

export default function Skills() {
  const categories = Array.from(new Set(skills.map((skill) => skill.category)));

  return (
    <section className="py-20 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">
          Skills
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {categories.map((category) => {
            const categorySkills = skills.filter(
              (skill) => skill.category === category
            );
            return (
              <Card
                key={category}
                className="bg-white border-gray-200 shadow-sm"
              >
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-gray-900">
                    {categoryIcons[category]} {category}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {categorySkills.map((skill) => (
                      <Badge
                        key={skill.name}
                        variant="default"
                        className="bg-gray-900 text-white hover:bg-gray-800"
                      >
                        {skill.name}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}

