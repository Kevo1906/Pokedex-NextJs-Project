import { create } from "zustand";
import axios from "axios";
import { Pokemon, Type } from "@prisma/client";
import type { PokemonWithType } from "@/types";
type State ={
    page:number
    filters:any
    Pokemons: Array<PokemonWithType> 
    PokemonTypes: Array<Type>
}
type Action = {
    changePage: (newPage:number)=>void
    fetchPokemons: (filters?:any)=>void
    fetchTypes:()=>void
    changeFilters: (newFilter:any)=>void
}
export const usePokemonStore = create<State & Action>((set)=>({
    page: 1,
    Pokemons: [],
    PokemonTypes: [],
    filters:{},
    changePage: (newPage:number)=>set((state:any) => ({page: newPage})),
    fetchPokemons: async (filters={}) => {
        try {
            let endpoint = '/api/pokemon?'
            for (let filter in filters) {
                if (filters[filter].length) {
                  endpoint = endpoint + filter + '=' + filters[filter] + '&'
                }
              }
              endpoint = endpoint.slice(0, -1)
            const response = await axios(endpoint);
            set({ Pokemons: response.data });
        } catch (error) {
            console.error("Error fetching Pokemons:", error);
        }
    },
    changeFilters: (newFilter)=>set((state:any) => ({filters: newFilter})),
    fetchTypes: async ()=>{
        try {
            const response = await axios('/api/types');
            set({ PokemonTypes: response.data });
        } catch (error) {
            console.error("Error fetching Pokemon's Types:", error);
        }
    }

}))