import { create } from "zustand";

interface GameState {
  state: "paused" | "game-over" | "ideal" | "resumed";
  actions: {
    gameOver: () => void;
    gamePaused: () => void;
    gameResumed: () => void;
  };
}

const useGameStore = create<GameState>((set) => ({
  state: "ideal",
  actions: {
    gameOver: () => set({ state: "game-over" }),
    gamePaused: () => set({ state: "paused" }),
    gameResumed: () => {
      set({ state: "resumed" });
      setTimeout(() => set({ state: "ideal" }), 1000);
    },
  },
}));

export const useGameState = () => useGameStore((state) => state.state);

export const useGameActions = () => useGameStore((state) => state.actions);
