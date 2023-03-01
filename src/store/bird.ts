import { create } from "zustand";
import { playSound } from "../helpers/sound";

interface Bird {
  state: {
    y: number;
    x: number;
    width: number;
    height: number;
  };
  actions: {
    jump: () => void;
    keepFalling: () => void;
    resetBird: () => void;
  };
}

const BIRD_INITIAL_STATE: Bird["state"] = {
  y: 0,
  x: 150,
  width: 50,
  height: 50,
};

const useBirdStore = create<Bird>((set) => ({
  state: BIRD_INITIAL_STATE,
  actions: {
    jump: () => {
      playSound(require("../assets/audio/wing.wav"));
      set((data) => {
        if (data.state.y <= 0) return data;
        return { ...data, state: { ...data.state, y: data.state.y - 40 } };
      });
    },
    keepFalling: () =>
      set((data) => {
        return { ...data, state: { ...data.state, y: data.state.y + 40 } };
      }),
    resetBird: () => set({ state: BIRD_INITIAL_STATE }),
  },
}));

export const useBird = () => useBirdStore((state) => state.state);
export const useBirdActions = () => useBirdStore((state) => state.actions);
