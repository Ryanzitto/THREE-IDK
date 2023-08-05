import { create } from "zustand";

export const useStoreApp = create((set) => ({
  dollarCount: 0,
  randomPosition: [ 3,  2,  3],
  increasedollarCount: () => set((state) => ({ dollarCount: state.dollarCount + 1 })),
  removeAllDollars: () => set({ dollarCount: 0 }),
  setRandomPosition: () =>
  set({
    randomPosition: [
      Math.random() * 9 - 5, // Varie de -5 a 5 para abranger toda a área do chão
      2, // Altura constante (ajuste conforme necessário)
      Math.random() * 6 - 2, // Varie de -5 a 5 para abranger toda a área do chão
    ],

})
}));
