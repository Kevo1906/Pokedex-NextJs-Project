import { create } from "zustand";
import axios from "axios";
import { Pokemon, Type } from "@prisma/client";
import type { PokemonWithType } from "@/types";
type State ={
    page:number
    Pokemons: Array<PokemonWithType> 
    PokemonTypes: Array<Type>
}
type Action = {
    changePage: (newPage:number)=>void
    fetchPokemons: ()=>void
}
export const usePokemonStore = create<State & Action>((set)=>({
    page: 1,
    Pokemons: [],
    PokemonTypes: [],
    changePage: (newPage:number)=>set((state:any) => ({page: newPage})),
    fetchPokemons: async () => {
        try {
            const response = await axios('/api/pokemon');
            console.log(response.data)
            set({ Pokemons: response.data });
        } catch (error) {
            console.error("Error fetching Pokemons:", error);
        }
    },

}))