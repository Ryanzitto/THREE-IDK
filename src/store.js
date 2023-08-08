import { create } from "zustand";

export const useStoreApp = create((set) => ({
  dollarCount: 0,
  randomPosition: [ 3,  2,  3],
  gameStage: "MENU",
  audioIsPlaying: false,

  productsOnStore: [
  {name: "Dollars", bought: true},
  {name: "YoshiEgg", bought: false},
  {name: "Chest", bought: false},
  {name: "Chicken", bought: false}],

  increasedollarCount: () => set((state) => ({ dollarCount: state.dollarCount + 1 })),
  removeAllDollars: () => set({ dollarCount: 0 }),
  setRandomPosition: () =>
  set({
    randomPosition: [ Math.random() * 9 - 5, 2, Math.random() * 6 - 2],
}),  
setGameStage: (payload) => set({ gameStage: payload }),
setIsPlaying: (payload) => set({ audioIsPlaying: payload }),
setBuy: (index) => set((state) => {
  const updatedProducts = [...state.productsOnStore]; // Create a copy of the array
  updatedProducts[index].bought = true; // Update the specified index
  return { productsOnStore: updatedProducts };
}),
}));
