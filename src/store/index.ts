import { create } from "zustand";

const store = create((set)=>({
    bears: 0,
    increasePopulation: ()=>set((state:any) => ({bears: state.bears + 1}))
}))