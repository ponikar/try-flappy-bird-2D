import { create } from "zustand";

interface GameState {
  state: "paused" | "game-over" | "ideal" | "resumed" | "running";
  actions: {
    gameOver: () => void;
    gamePaused: () => void;
    gameResumed: () => void;
    gameStarted: () => void;
  };
}

const useGameStore = create<GameState>((set) => ({
  state: "ideal",
  actions: {
    gameOver: () => set({ state: "game-over" }),
    gamePaused: () => set({ state: "paused" }),
    gameResumed: () => {
      set({ state: "resumed" });
      setTimeout(() => set({ state: "running" }), 1);
    },
    gameStarted: () => set({ state: "running" }),
  },
}));

export const useGameState = () => useGameStore((state) => state.state);

export const useGameActions = () => useGameStore((state) => state.actions);
