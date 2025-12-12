"use client";

import { useModeStore } from "@/stores/useModeStore";
import SurfaceLayout from "@/components/surface/SurfaceLayout";
import ShadowLayout from "@/components/shadow/ShadowLayout";
import ModeTransition from "@/components/common/ModeTransition";

export default function Home() {
  const isShadowMode = useModeStore((state) => state.isShadowMode);

  return (
    <ModeTransition>
      <main>
        {isShadowMode ? <ShadowLayout /> : <SurfaceLayout />}
      </main>
    </ModeTransition>
  );
}

