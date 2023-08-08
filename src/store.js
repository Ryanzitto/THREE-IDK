import { create } from "zustand";

export const useStoreApp = create((set) => ({
  dollarCount: 0,
  randomPosition: [ 3,  5,  3],
  gameStage: "MENU",
  audioIsPlaying: false,
  increasedollarCount: () => set((state) => ({ dollarCount: state.dollarCount + 1 })),
  removeAllDollars: () => set({ dollarCount: 0 }),
  setRandomPosition: () =>
  set({
    randomPosition: [ Math.random() * 9 - 5, 2, Math.random() * 6 - 2],
}),  
setGameStage: (payload) => set({ gameStage: payload }),
setIsPlaying: (payload) => set({ audioIsPlaying: payload }),
}));
