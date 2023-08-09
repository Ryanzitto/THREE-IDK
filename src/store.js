import { create } from "zustand";

export const useStoreApp = create((set) => ({
  dollarCount: 200000,
  randomPosition: [ 3,  2,  3],
  gameStage: "MENU",
  audioIsPlaying: false,
  productsOnStore: [
  {name: "Dollars", bought: true,},
  {name: "YoshiEgg", bought: false, price: 100000},
  {name: "Chest", bought: false, price: 200000},
  {name: "Chicken", bought: false, price: 500000}],
  productsObtained: [],
  erro: {index: null, message: ""}, 

  resetErro: () => set(() => ({erro: null})),

  increasedollarCount: () => set((state) => ({ dollarCount: state.dollarCount + 1000 })),

  removeAllDollars: () => set({ dollarCount: 0 }),

  setRandomPosition: () =>
  set({
    randomPosition: [ Math.random() * 9 - 5, 2, Math.random() * 6 - 2],
}),  

setGameStage: (payload) => set({ gameStage: payload }),

setIsPlaying: (payload) => set({ audioIsPlaying: payload }),

setBuy: (index) => set((state) => {
  const updatedProducts = [...state.productsOnStore]; // Create a copy of the array
  const selectedProduct = updatedProducts[index];
  if(state.dollarCount >= updatedProducts[index].price){
    updatedProducts[index].bought = true; // Update the specified index
    const updatedDollarCount = state.dollarCount - selectedProduct.price;
    return { 
      productsOnStore: updatedProducts, 
      ...state.productsObtained, productsObtained:[index],  
      dollarCount: updatedDollarCount,
      erro: null, 
    };
  }
  else {
    return { erro: {index: index, message: "Pontos insuficientes!"}};
  }
}),
}));
