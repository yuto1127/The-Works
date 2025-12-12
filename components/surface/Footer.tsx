"use client";

import { useModeStore } from "@/stores/useModeStore";

export default function Footer() {
  const incrementCopyrightClick = useModeStore(
    (state) => state.incrementCopyrightClick
  );

  return (
    <footer className="py-12 px-4 bg-gray-50 border-t border-gray-200">
      <div className="max-w-6xl mx-auto text-center">
        <button
          onClick={incrementCopyrightClick}
          className="text-sm text-gray-600 hover:text-gray-900 transition-colors cursor-pointer"
        >
          © 2025 Yuto Akaishi
        </button>
      </div>
    </footer>
  );
}

