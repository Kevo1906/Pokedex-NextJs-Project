import { useEffect, useState } from "react"
import { usePokemonStore } from "@/store"
import { Pokemon,Type } from "@prisma/client"
import type { PokemonWithType } from "@/types"
import Card from "../Card"
export default function Cards(){
    const {Pokemons,fetchPokemons,fetchTypes,page, filters} = usePokemonStore()
    const [pokemonsToShow, setPokemonsToShow]:Array<PokemonWithType>&any = useState(Pokemons)

    useEffect(()=>{
        fetchPokemons(filters)
        fetchTypes()
        setPokemonsToShow(Pokemons)
    },[fetchPokemons])

    useEffect(()=>{
        if(Pokemons.length){
            setPokemonsToShow(Pokemons.slice((page-1)*12,page*12))
        }
    },[page, Pokemons])

    useEffect(()=>{
        fetchPokemons(filters)
    },[filters])

    console.log(pokemonsToShow)
    return(
        <div className="flex justify-center items-center mt-24 flex-wrap">
            {pokemonsToShow.length? pokemonsToShow.map((element:PokemonWithType) =><Card key={element.id} pokemon={element}/>):<p>Pokemons not Found</p>}
        </div>
    )
}