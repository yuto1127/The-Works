"use client";

import { useEffect } from "react";
import { useModeStore } from "@/stores/useModeStore";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isShadowMode = useModeStore((state) => state.isShadowMode);

  useEffect(() => {
    const htmlElement = document.documentElement;
    if (isShadowMode) {
      htmlElement.classList.add("dark");
    } else {
      htmlElement.classList.remove("dark");
    }

    // Update document title and meta description
    document.title = "Yuto Akaishi | Portfolio";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "Web Developer & IoT Enthusiast. Creating tools for the web and the physical world."
      );
    } else {
      const meta = document.createElement("meta");
      meta.name = "description";
      meta.content =
        "Web Developer & IoT Enthusiast. Creating tools for the web and the physical world.";
      document.head.appendChild(meta);
    }
  }, [isShadowMode]);

  return (
    <html lang="ja" className={isShadowMode ? "dark" : ""}>
      <head>
        <title>Yuto Akaishi | Portfolio</title>
        <meta
          name="description"
          content="Web Developer & IoT Enthusiast. Creating tools for the web and the physical world."
        />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </head>
      <body>{children}</body>
    </html>
  );
}

