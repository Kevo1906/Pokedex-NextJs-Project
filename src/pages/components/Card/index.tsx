import { Pokemon, Type } from "@prisma/client";
import style from './Card.module.css'
import Link from "next/link";
import { capitalize, typeColor } from "@/utils/frontUtils";
import type { PokemonWithType } from "@/types";
type CardProps = {
    key: number
    pokemon: PokemonWithType
}
export default function Card({ pokemon }: CardProps) {
    return (
        <div className={style.card}>
      <div className={style.content}>
        <div className={style.back}>
          <img className={style.back_img} src={pokemon.img_anime} alt={pokemon.name} />
        </div>
        <div className={style.front}>
          <img className={style.front_img} src={pokemon.img_anime} alt={pokemon.name} />
          <div className={style.front_content}>
            <div className={style.description}>
              <div className={style.title}>
                <Link href={`/detail/${pokemon.id}`} className={style.nameLink}>
                  <h2 className={style.name}>{capitalize(pokemon.name)}</h2>
                </Link>
                
              </div>
              <div className={style.card_footer}>
                {pokemon.types.map((type,index) =>(<span key={index} 
                 style={{ backgroundColor: typeColor[type.name] || "#fff"}}>{type.name}</span>) )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    )
}