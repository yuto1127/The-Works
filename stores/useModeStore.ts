import { create } from "zustand";

interface ModeStore {
  isShadowMode: boolean;
  copyrightClickCount: number;
  toggleMode: () => void;
  incrementCopyrightClick: () => void;
  resetCopyrightClick: () => void;
}

export const useModeStore = create<ModeStore>((set) => ({
  isShadowMode: false,
  copyrightClickCount: 0,
  toggleMode: () =>
    set((state) => ({
      isShadowMode: !state.isShadowMode,
      copyrightClickCount: 0,
    })),
  incrementCopyrightClick: () =>
    set((state) => {
      const newCount = state.copyrightClickCount + 1;
      if (newCount >= 5) {
        return {
          isShadowMode: !state.isShadowMode,
          copyrightClickCount: 0,
        };
      }
      return { copyrightClickCount: newCount };
    }),
  resetCopyrightClick: () => set({ copyrightClickCount: 0 }),
}));

