import { Pokemon } from "@prisma/client"
import type { PokemonWithType } from "@/types"
import axios from "axios"
import { GetServerSidePropsContext, GetServerSidePropsResult, GetServerSideProps } from "next"
import { typeColor, capitalize } from "@/utils/frontUtils"
import Image from "next/image"
type TPokemonDetail = {
    pokemon: PokemonWithType | null
}
export default function PokemonDetail({ pokemon }: TPokemonDetail) {
    let themeColor: Array<string> = []
    pokemon ? themeColor = pokemon.types?.map(element => typeColor[element.name]) : themeColor = ['#fff']
    return (
        (pokemon && pokemon.name) ? (<div className="">
            <div className='w-80 h-[580px] relative py-8 px-5 shadow-sm rounded-3xl mt-4' style={{ background: `radial-gradient(circle at 50% 0%, ${themeColor[0]} 36%, #ffffff 36%)` }}>
                <p className='bg-white text-center w-20 py-2 rounded-3xl ml-auto text-xl shadow-xl font-normal text-black'>
                    <span className="text-xl font-semibold tracking-wide text-black">HP </span>
                    {pokemon.hp}
                </p>
                <img src={pokemon.img_anime} alt={pokemon.name} width={280} height={300} className="block relative my-5 mx-auto" />
                <h2 className='text-center font-semibold text-xl text-black shadow-sm'>{capitalize(pokemon.name)}</h2>
                <div className='flex justify-around relative top-[20px] my-0 ml-5 mr-10'>
                    {pokemon.types.map((element, index) => (<span className="text-lg font-semibold tracking-wide rounded-3xl px-5 py-1.5 text-slate-600 shadow-xl" key={index} style={{ backgroundColor: themeColor[index] }}>{element.name}</span>))}
                </div>
                <div className='flex items-center justify-between text-center text-xl relative top-[30px]'>
                    <div>
                        <h3 className="text-black py-1">{pokemon.attack}</h3>
                        <p className="text-slate-600">Attack</p>
                    </div>
                    <div>
                        <h3 className="text-black py-1">{pokemon.defense}</h3>
                        <p className="text-slate-600">Defense</p>
                    </div>
                    <div>
                        <h3 className="text-black py-1">{pokemon.speed}</h3>
                        <p className="text-slate-600">Speed</p>
                    </div>
                </div>

            </div>
        </div>) : (<p>Pokemon not Found</p>)
    )
}

export async function getServerSideProps(context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<TPokemonDetail>> {
    const { id } = context.query
    try {
        const response = await axios(`https://pokedex-project-ten-ashy.vercel.app/api/pokemon/${id}`)
        return {
            props: {
                pokemon: response.data
            }
        }
    } catch (error) {
        console.error("Error fetching Pokemon:", error);
        return {
            props: {
                pokemon: null
            }
        }

    }
}