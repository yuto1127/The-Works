export interface Profile {
  name: string;
  role: string;
  bio: string;
}

export interface Skill {
  name: string;
  category: string;
}

export interface Project {
  title: string;
  description: string;
  technologies: string[];
  imageUrl?: string;
}

export const profile: Profile = {
  name: "Yuto Akaishi",
  role: "Student / Developer (Web & IoT)",
  bio: "中央情報大学校 高度ICTデザイン科 4年。Web開発(Laravel/Next.js)と電子工作(Arduino/M5Stack)を組み合わせたモノづくりが得意です。",
};

export const skills: Skill[] = [
  // Frontend
  { name: "Next.js", category: "Frontend" },
  { name: "React", category: "Frontend" },
  { name: "Tailwind CSS", category: "Frontend" },
  // Backend
  { name: "PHP", category: "Backend" },
  { name: "Laravel", category: "Backend" },
  // IoT/Hardware
  { name: "Arduino", category: "IoT/Hardware" },
  { name: "Raspberry Pi", category: "IoT/Hardware" },
  { name: "M5Stack", category: "IoT/Hardware" },
  { name: "C++", category: "IoT/Hardware" },
  // Others
  { name: "Unity", category: "Others" },
  { name: "Git", category: "Others" },
  { name: "Docker", category: "Others" },
];

export const projects: Project[] = [
  {
    title: "Virtual Archery",
    description:
      "Unityとセンサーを組み合わせた仮想アーチェリー体験アプリケーション。リアルタイムで矢の軌道をシミュレーションします。",
    technologies: ["Unity", "C#", "Sensor"],
    imageUrl: "https://placehold.co/600x400/4f46e5/ffffff?text=Virtual+Archery",
  },
  {
    title: "Smart Home Monitor",
    description:
      "IoTデバイスを使用したスマートホーム監視システム。温度、湿度、明るさなどの環境データをリアルタイムで監視できます。",
    technologies: ["Arduino", "M5Stack", "IoT"],
    imageUrl:
      "https://placehold.co/600x400/059669/ffffff?text=Smart+Home+Monitor",
  },
  {
    title: "The Shadow Workspace",
    description:
      "このポートフォリオサイト。Surface ModeとShadow Modeのデュアルモードシステムを持つ、VS Code風のインターフェースを実装。",
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    imageUrl:
      "https://placehold.co/600x400/7c3aed/ffffff?text=Shadow+Workspace",
  },
];

