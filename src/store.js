import { create } from "zustand";

export const useStoreApp = create((set) => ({
  experienceIsMounted: false,
  dollarCount: 0,
  randomPosition: [ 3,  2,  3],
  randomPositionBall: [ 3,  2,  3],
  gameStage: "MENU",
  audioIsPlaying: false,
  productsOnStore: [
  {name: "Dollars", bought: true,},
  {name: "YoshiEgg", bought: false, price: 25000},
  {name: "Chest", bought: false, price: 50000},
  {name: "Chicken", bought: false, price: 100000}],
  productsObtained: [],
  productsOnStore2: [
  {name: "Ryan Dev", bought: true,},
  {name: "Pirate", bought: false, price: 50000}],
  productsObtained2: [],
  erro: {index: null, message: ""}, 
  skinCoinActual: 0,
  skinAvatarActual: 0,

  setExperienceIsMounted: (payload) => set(() => ({experienceIsMounted: payload})),
  resetErro: () => set(() => ({erro: null})),

  setSkinCoin: (payload) => set(() => ({skinCoinActual: payload})),

  setSkinAvatar: (payload) => set(() => ({skinAvatarActual: payload})),

  increasedollarCount: () => set((state) => ({ dollarCount: state.dollarCount + 1000 })),

  removeAllDollars: () => set({ dollarCount: 0 }),

  setRandomPosition: () =>
  set({
    randomPosition: [ Math.random() * 9 - 5, 2, Math.random() * 6 - 2],
}),  
  setRandomPositionBall: () =>
  set({
    randomPositionBall: [ Math.random() * 9 - 5, 7, Math.random() * 6 - 2],
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

setBuy2: (index) => set((state) => {
  const updatedProducts = [...state.productsOnStore2]; // Create a copy of the array
  const selectedProduct = updatedProducts[index];
  if(state.dollarCount >= updatedProducts[index].price){
    updatedProducts[index].bought = true; // Update the specified index
    const updatedDollarCount = state.dollarCount - selectedProduct.price;
    return { 
      productsOnStore2: updatedProducts, 
      ...state.productsObtained2, productsObtained2:[index],  
      dollarCount: updatedDollarCount,
      erro: null, 
    };
  }
  else {
    return { erro: {index: index, message: "Pontos insuficientes!"}};
  }
}),
}));
