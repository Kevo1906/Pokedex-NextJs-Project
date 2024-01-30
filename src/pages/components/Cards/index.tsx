import { useEffect, useState } from "react"
import { usePokemonStore } from "@/store"
import { Pokemon,Type } from "@prisma/client"
import type { PokemonWithType } from "@/types"
import Card from "../Card"
export default function Cards(){
    const {Pokemons,fetchPokemons,page} = usePokemonStore()
    const [pokemonsToShow, setPokemonsToShow]:Array<PokemonWithType>&any = useState(Pokemons)

    useEffect(()=>{
        fetchPokemons()
        setPokemonsToShow(Pokemons)
    },[fetchPokemons])

    useEffect(()=>{
        if(Pokemons.length){
            setPokemonsToShow(Pokemons.slice((page-1)*12,page*12))
        }
    },[page, Pokemons])

    console.log(pokemonsToShow)
    return(
        <div className="flex justify-center items-center mt-24 flex-wrap">
            {pokemonsToShow.length && pokemonsToShow.map((element:PokemonWithType) =><Card key={element.id} pokemon={element}/>)}
        </div>
    )
}