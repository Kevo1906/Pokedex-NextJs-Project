import type { NextApiRequest, NextApiResponse } from "next";
import { Pokemon,Type, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Array<Pokemon& {
    types: Type[];}> | { message: string }>
) {
  if (req.method === "GET") {
    try {
      let filters:any = {}
      let orders:any = {}
      const { name, order, source, types  } = req.query;
      filters['deletedAt'] = null
      if (name && typeof name === "string") {
        const nameCleaned = name.replace(" ", "").toLowerCase();
        filters['name']={contains:nameCleaned}
      }
      if(source && typeof source === "string") {
        if(source==='api') filters['id'] = {lt:11000}
        if(source==='created') filters['id'] = {gte:11000}
      }
      if(types && typeof types === "string") filters['types']={some:{name:types}}

      if(!order){
        orders['name'] = 'asc'
      } else {
        orders['name'] = 'desc'
      }

      const pokemonsFound = await prisma.pokemon.findMany({
        where:filters,
        orderBy:orders,
        include: {
          types: true,
        },
      });
      if (!pokemonsFound.length) {
        res.status(400).json({ message: "Pokemon not found" });
      }

      res.status(200).json(pokemonsFound);
    } catch (error: any) {
      res.status(404).json({ message: error.message });
    }
  } else if(req.method === "POST"){
    try {
        const pokemon = req.body;
        //Validation that there are no gaps or nulls
        for (let atribute in pokemon) {
          if (atribute === "img_anime" || atribute === "img_game") {
            continue;
          }
          if (!pokemon[atribute]) {
            return res
              .status(422)
              .send({ message: "Empty attributes are not accepted" });
          }
        }
        // ID Validations
        if (typeof pokemon.id !== "number") {
          return res.status(422).send({ message: "id: incorrect data type" });
        }

        // NAME Validations
        if (typeof pokemon.name !== "string") {
          return res.status(422).send({ message: "name: incorrect data type" });
        }
        if (pokemon.name.length > 30) {
          return res
            .status(422)
            .send({ message: "name: Must be a maximum of 30 characters" });
        }

        if (pokemon.name.match(/[^a-zA-ZáéíóúÁÉÍÓÚ\s]/g)) {
          return res
            .status(422)
            .send({
              message:
                "name: Numbers or characters other than letters are not allowed",
            });
        }

        // STATS Validations
        const stats = ["hp", "attack", "defense", "speed", "height", "weight"];
        for (let stat in stats) {
          if (typeof pokemon[stats[stat]] !== "number") {
            return res
              .status(422)
              .send({ message: `${stats[stat]}: incorrect data type` });
          }
          if (pokemon[stats[stat]] < 0) {
            return res
              .status(422)
              .send({
                message: `${stats[stat]}: Negative stats are not accepted`,
              });
          }
        }

        // TYPES Validations
        if (typeof pokemon.types !== "object") {
          return res
            .status(422)
            .send({ message: "types: incorrect data type" });
        }
        if (pokemon.types.length < 2) {
          return res
            .status(422)
            .send({ message: "types: must have at least two types assigned" });
        }
        // If it passes all the validations, the pokemon is created
        let newPokemon = await prisma.pokemon.findUnique({
            where: {
              id: pokemon.id,
            },
          });
          if (!newPokemon) {
            newPokemon = await prisma.pokemon.create({
              data: {
                id: pokemon.id,
                name: pokemon.name.toLowerCase(),
                img_anime: pokemon.img_anime,
                img_game: pokemon.img_game,
                hp: pokemon.hp,
                attack: pokemon.attack,
                defense: pokemon.defense,
                speed: pokemon.speed,
                height: pokemon.height,
                weight: pokemon.weight,
                types: {
                  connect: pokemon.types.map((element: number) => {
                    return { id: element };
                  }),
                },
              },
            });
          }
          res.status(200).json({message: 'Pokemon created succesfully'})
      } catch (error) {}
  } else{
    res.status(404).json({ message: 'Method not defined' })
  }
  //   try {
  //     const allTypes = await prisma.type.findMany();

  //     res.status(200).json(allTypes);
  //   } catch (error: any) {
  //     res.status(404).json({ message: error.message });
  //   }
}
