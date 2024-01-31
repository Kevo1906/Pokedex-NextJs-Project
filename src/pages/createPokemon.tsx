import { usePokemonStore } from "@/store"
import { useState, useEffect } from "react"
import axios from "axios"
import { typeColor } from "@/utils/frontUtils"
type TPokemonCreate = {
    id: number
    name: string
    img_anime: string
    img_game: string
    hp: number
    attack: number
    defense: number
    speed: number
    height: number
    weight: number
    types: Array<number>
}
export default function CreatePokemon() {
    const { Pokemons, PokemonTypes, fetchPokemons,fetchTypes } = usePokemonStore()
    const [pokemonToCreate, setPokemonToCreate] = useState({
        id: 11000,
        name: "",
        img_anime: "",
        img_game: "",
        hp: 0,
        attack: 0,
        defense: 0,
        speed: 0,
        height: 0,
        weight: 0,
        types: [1,],
    })
    const [errors, setErrors] = useState({
        name: "Empty space",
        img_anime: "Empty space",
        hp: "Empty space",
        attack: "Empty space",
        defense: "Empty space",
        speed: "Empty space",
        height: "Empty space",
        weight: "Empty space",
        types: "At least 2 types must be selected",
    });
    useEffect(() => {
        let idNewPokemon = 11000;
        while (
            Pokemons.filter((element) => element.id === idNewPokemon).length > 0
        ) {
            idNewPokemon += 1;
        }
        setPokemonToCreate({ ...pokemonToCreate, id: idNewPokemon });
    }, []);

    useEffect(() => {
        fetchTypes()
        console.log(PokemonTypes)
    }, []);


    const handleChange = (event: any) => {
        if (event.target.name === "name" || event.target.name === "img_anime") {
            setPokemonToCreate({
                ...pokemonToCreate,
                [event.target.name]: event.target.value,
            });
            validation(
                { ...pokemonToCreate, [event.target.name]: event.target.value },
                event
            );
        } else {
            setPokemonToCreate({
                ...pokemonToCreate,
                [event.target.name]: Number(event.target.value),
            });
            validation(
                { ...pokemonToCreate, [event.target.name]: Number(event.target.value) },
                event
            );
        }
    };

    const handleTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const typeName = Number(event.target.value);
        let newTypes = [];

        if (event.target.checked) {

            newTypes = [...pokemonToCreate.types, typeName];
        } else {

            newTypes = pokemonToCreate.types.filter((type) => type !== typeName);
        }


        const newPokemonToCreate = {
            ...pokemonToCreate,
            types: newTypes,
        };
        setPokemonToCreate(newPokemonToCreate);

        validation(newPokemonToCreate, event);
    };

    const validation = (input: any, event: any) => {
        if (event.target.name === "name") {
            if (input.name.length === 0) {
                setErrors({ ...errors, name: "Empty space" });
            } else if (input.name.length > 30) {
                setErrors({ ...errors, name: "Maximum 30 characters" });
            } else if (input.name.match(/[^a-zA-ZáéíóúÁÉÍÓÚ\s]/g)) {
                setErrors({ ...errors, name: "Only letters are accepted" });
            } else {
                setErrors({ ...errors, name: "" });
            }
        }
        if (event.target.name === "img_anime") {
            if (input.img_anime.length === 0) {
                setErrors({ ...errors, img_anime: "Empty space" });
            } else if (!/^(http|https|ftp):\/\/[^\s/$.?#].[^\s]*$/.test(input.img_anime)) {
                setErrors({ ...errors, img_anime: "Only urls are allowed" });
            } else {
                setErrors({ ...errors, img_anime: "" });
            }
        }
        if (event.target.name === "types") {
            if (input.types.length < 2) {
                setErrors({ ...errors, types: "At least 2 types must be selected" });
            } else {
                setErrors({ ...errors, types: "" });
            }
        }
        if (!["types", "name", "img_anime"].includes(event.target.name)) {
            if (Number.isNaN(input[event.target.name])) {
                setErrors({
                    ...errors,
                    [event.target.name]: "Only numbers are accepted",
                });
            } else if (input[event.target.name] < 0) {
                setErrors({
                    ...errors,
                    [event.target.name]: "Negative stats are not accepted",
                });
            } else if (input[event.target.name] === 0) {
                setErrors({
                    ...errors,
                    [event.target.name]: "Stats equal to zero are not accepted",
                });
            } else {
                setErrors({ ...errors, [event.target.name]: "" });
            }
        }
    };

    const handleSubmit = async (event: any) => {
        try {
            const hasErrors = Object.values(errors).some((error) => error !== "");
            event.preventDefault();
            if (hasErrors) {
                window.alert("Form with errors");

            } else {
                const pokemonCreated = await axios
                    .post("https://pokedex-project-ten-ashy.vercel.app/api/pokemon", pokemonToCreate)
                    .then(({ data }) => data);
                fetchPokemons();
                setPokemonToCreate({ ...pokemonToCreate, id: pokemonToCreate.id + 1 })
                window.alert("Pokemon created successfully");

            }
        } catch (error: any) {
            window.alert(error.response.data.message);
        }
    };
    return (
        <div className='h-fit w-[450px] relative flex flex-col mt-12 items-center justify-center shadow-xl rounded-3xl py-5 px-8' style={{backgroundImage:'url(https://i.pinimg.com/736x/57/23/62/572362a2e99b0389947814276735d870.jpg)'}}>
      <p className='text-center mt-3 mb-8 text-2xl font-extrabold text-orange-500'>Create a Pokemon</p>
      <form onSubmit={handleSubmit} className='w-full flex flex-col gap-1 mt-4 items-center'>
        <div>
          <label className='rounded-tl-3xl rounded-bl-3xl py-1 px-4 text-base bg-orange-500'>Name: </label>
          <input
            type="text"
            name="name"
            placeholder="Insert pokemon name..."
            value={pokemonToCreate.name}
            onChange={handleChange}
            className='text-center rounded-tr-3xl items-center h-fit rounded-br-3xl p-2 text-sm hover:border-slate-500 focus:border-slate-500 text-black'
          />
        </div>
        {errors.name? <span className='bg-violet-700 text-xs w-fit py-1 px-5 rounded-3xl text-white'>{errors.name}</span>:null}
        <div>
          <label className='rounded-tl-3xl rounded-bl-3xl py-1 px-4 text-base bg-orange-500'>Image:</label>
          <input
            type="text"
            name="img_anime"
            placeholder="Insert pokemon image url..."
            value={pokemonToCreate.img_anime}
            onChange={handleChange}
            className='text-center rounded-tr-3xl items-center h-fit rounded-br-3xl p-2 text-sm hover:border-slate-500 focus:border-slate-500 text-black'
          />
        </div>
        {errors.img_anime? <span className='bg-violet-700 text-xs w-fit py-1 px-5 rounded-3xl text-white'>{errors.img_anime}</span>:null}
        <div>
          <label className='rounded-tl-3xl rounded-bl-3xl py-1 px-4 text-base bg-orange-500'>Hp:</label>
          <input
            type="text"
            name="hp"
            placeholder="Insert pokemon hp..."
            value={pokemonToCreate.hp}
            onChange={handleChange}
            className='text-center rounded-tr-3xl items-center h-fit rounded-br-3xl p-2 text-sm hover:border-slate-500 focus:border-slate-500 text-black'
          />
        </div>
        {errors.hp? <span className='bg-violet-700 text-xs w-fit py-1 px-5 rounded-3xl text-white'>{errors.hp}</span>:null}
        <div>
          <label className='rounded-tl-3xl rounded-bl-3xl py-1 px-4 text-base bg-orange-500'>Attack:</label>
          <input
            type="text"
            name="attack"
            placeholder="Insert pokemon attack..."
            value={pokemonToCreate.attack}
            onChange={handleChange}
            className='text-center rounded-tr-3xl items-center h-fit rounded-br-3xl p-2 text-sm hover:border-slate-500 focus:border-slate-500 text-black'
          />
        </div>
        {errors.attack? <span className='bg-violet-700 text-xs w-fit py-1 px-5 rounded-3xl text-white'>{errors.attack}</span>:null}

        <div>
          <label className='rounded-tl-3xl rounded-bl-3xl py-1 px-4 text-base bg-orange-500'>Defense:</label>
          <input
            type="text"
            name="defense"
            placeholder="Insert pokemon defense..."
            value={pokemonToCreate.defense}
            onChange={handleChange}
            className='text-center rounded-tr-3xl items-center h-fit rounded-br-3xl p-2 text-sm hover:border-slate-500 focus:border-slate-500 text-black'
          />
        </div>
        {errors.defense? <span className='bg-violet-700 text-xs w-fit py-1 px-5 rounded-3xl text-white'>{errors.defense}</span>:null}
        <div>
          <label className='rounded-tl-3xl rounded-bl-3xl py-1 px-4 text-base bg-orange-500'>Speed:</label>
          <input
            type="text"
            name="speed"
            placeholder="Insert pokemon speed..."
            value={pokemonToCreate.speed}
            onChange={handleChange}
            className='text-center rounded-tr-3xl items-center h-fit rounded-br-3xl p-2 text-sm hover:border-slate-500 focus:border-slate-500 text-black'
          />
        </div>
        {errors.speed? <span className='bg-violet-700 text-xs w-fit py-1 px-5 rounded-3xl text-white'>{errors.speed}</span>:null}
        <div>
          <label className='rounded-tl-3xl rounded-bl-3xl py-1 px-4 text-base bg-orange-500'>Height:</label>
          <input
            type="text"
            name="height"
            placeholder="Insert pokemon height..."
            value={pokemonToCreate.height}
            onChange={handleChange}
            className='text-center rounded-tr-3xl items-center h-fit rounded-br-3xl p-2 text-sm hover:border-slate-500 focus:border-slate-500 text-black'
          />
        </div>
        {errors.height? <span className='bg-violet-700 text-xs w-fit py-1 px-5 rounded-3xl text-white'>{errors.height}</span>:null}
        <div>
          <label className='rounded-tl-3xl rounded-bl-3xl py-1 px-4 text-base bg-orange-500'>Weight:</label>
          <input
            type="text"
            name="weight"
            placeholder="Insert pokemon weight..."
            value={pokemonToCreate.weight}
            onChange={handleChange}
            className='text-center rounded-tr-3xl items-center h-fit rounded-br-3xl p-2 text-sm hover:border-slate-500 focus:border-slate-500 text-black'
          />
        </div>
        {errors.weight? <span className='bg-violet-700 text-xs w-fit py-1 px-5 rounded-3xl text-white'>{errors.weight}</span>:null}
        <div className='flex items-center '>
        <label className='py-1 px-3 text-base rounded-tl-3xl rounded-bl-3xl bg-orange-500 text-center'>
          Types:</label>
          <div>
          {PokemonTypes.map((type) => (
            
            <label key={type.id} className='rounded-3xl text-[10px] py-1 px-3 m-1 text-slate-700' style={{ backgroundColor: typeColor[type.name] }}>
              <input
                type="checkbox"
                name="types"
                value={type.id}
                key={type.id}
                checked={pokemonToCreate.types.includes(type.id)}
                onChange={handleTypeChange}
              />
              {type.name}
            </label>
            
          ))}
          </div>
        
        </div>
        {errors.types? <span className='bg-violet-700 text-xs w-fit py-1 px-5 rounded-3xl text-white'>{errors.types}</span>:null}
        <button type="submit" className='text-black inline-block py-3 px-5 bg-orange-500 text-lg border-none rounded-3xl shadow-xl cursor-pointer hover:bg-violet-700'>
          SUBMIT
        </button>
      </form>
    </div>
    )
}