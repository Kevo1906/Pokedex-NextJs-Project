import axios from "axios";
import { IPokeData } from "@/types";

// Function to obtein pokemon's types from the poke API
type Type ={
    id: number
    name:string
}
type PokemonUrl = {
    name:string
    url:string
}

export const typeData =async () => {
    const {data} = await axios('https://pokeapi.co/api/v2/type')
    let types:Array<Type> = data.results.map((element:any):Type => {  return {id: Number(element.url.split("/")[6]),name: element.name}})
    return types
}

const getPokemonData = (data:IPokeData) => {
    let hp_obj = data.stats.filter((element) => element.stat.name === "hp");
    const hp = hp_obj[0].base_stat;
  
    let attack_obj = data.stats.filter((element) => element.stat.name === "attack");
    const attack = attack_obj[0].base_stat;
  
    let defense_obj = data.stats.filter((element) => element.stat.name === "defense");
    const defense = defense_obj[0].base_stat;
  
    let speed_obj = data.stats.filter((element) => element.stat.name === "speed");
    const speed = speed_obj[0].base_stat;
  
    let types_obj = data.types.map((element) => element.type.url);
    let types_arr = types_obj.map((element) => element.split("/"));
    const types = types_arr.map((element) => Number(element[element.length - 2]));
    return {
      id: data.id,
      name: data.name,
      img_anime: data.sprites?.other?.["official-artwork"]?.front_default || "https://e7.pngegg.com/pngimages/706/299/png-clipart-pokemon-pokeball-illustration-pikachu-ash-ketchum-pokemon-coloring-book-pokeball-rim-pokemon.png",
      img_game: data.sprites.front_default,
      hp: hp,
      attack: attack,
      defense: defense,
      speed: speed,
      height: data.height,
      weight: data.weight,
      types: types,
    };
  };
  export const getPokemonUrls = async () => {
    let url = "https://pokeapi.co/api/v2/pokemon"
    let pokemonsUrls:Array<PokemonUrl> = []
    while(url!==null){
        let {data} = await axios(url)
        pokemonsUrls= [...pokemonsUrls,...data.results]
        url = data.next
    }
    return pokemonsUrls;
  };
  
  const getPokemons = async (urls:Array<PokemonUrl>) => {
    let pokemonPromises = urls.map(async (element) => {
      try {
        let { data } = await axios(element.url);
       
        return getPokemonData(data);
      } catch (error:any) {
        return {
          url: element.url,
          error: error.message,
        };
      }
    });
    let resultsPokemonPromises:Array<any> = await Promise.all(pokemonPromises);
    return resultsPokemonPromises
  };
  function wait(ms:number) {
      return new Promise(resolve => {
          setTimeout(resolve, ms);
      });
  }
export const pokemonData = async() =>{
      console.log("Getting urls data")
      const pokemonUrl = await getPokemonUrls()
      console.log(pokemonUrl.length)
      let pokemonData = await getPokemons(pokemonUrl)
      let pokemonError = pokemonData.filter(element => element.error)
      pokemonData = pokemonData.filter(element => !element.error)
      while(pokemonError.length){
          await wait(200)
          let temporary = await getPokemons(pokemonError)
          
          pokemonError = temporary.filter(element => element.error)
          pokemonData = pokemonData.concat(temporary.filter(element => !element.error))
          
      }
      console.log("Finished")
      return pokemonData
  }
