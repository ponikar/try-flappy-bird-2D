import { create } from "zustand";

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
  };
}

const useBirdStore = create<Bird>((set) => ({
  state: {
    y: 0,
    x: 150,
    width: 50,
    height: 50,
  },
  actions: {
    jump: () =>
      set((data) => {
        if (data.state.y <= 0) return data;
        return { ...data, state: { ...data.state, y: data.state.y - 40 } };
      }),
    keepFalling: () =>
      set((data) => {
        return { ...data, state: { ...data.state, y: data.state.y + 40 } };
      }),
  },
}));

export const useBird = () => useBirdStore((state) => state.state);
export const useBirdActions = () => useBirdStore((state) => state.actions);
