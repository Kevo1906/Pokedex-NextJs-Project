import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { typeData, pokemonData } from "@/utils/getData";

type Data = {
  message: string;
};
const prisma = new PrismaClient();

async function batchProcess(array:any, batchSize:number, fn:any) {
    const batches = [];
    for (let i = 0; i < array.length; i += batchSize) {
        const batch = array.slice(i, i + batchSize);
        batches.push(batch);
    }

    for (const batch of batches) {
        await Promise.all(batch.map(fn));
    }
}
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const requestMethod = req.method;
  // const body = JSON.parse(req.body)
  try {
    console.log("Uploading Types");
    const types = await typeData();
    const typesPromises = types.map(async (element) => {
      let type = await prisma.type.findUnique({
        where: {
          id: element.id,
        },
      });
      if (!type) {
        type = await prisma.type.create({
          data: {
            id: element.id,
            name: element.name,
          },
        });
      }
    });
    await Promise.all(typesPromises);

    console.log("Uploading Pokemons...");
    let pokemons = await pokemonData();
    pokemons = pokemons.filter((element) => element.name !== undefined);
    const batchSize = 10
    await batchProcess(pokemons, batchSize, async (element:any) => {
      try {
        console.log(element.name, element.types);
        let pokemon = await prisma.pokemon.findUnique({
          where: {
            id: element.id,
          },
        });
        if (!pokemon) {
          pokemon = await prisma.pokemon.create({
            data: {
              id: element.id,
              name: element.name,
              img_anime: element.img_anime,
              img_game: element.img_game,
              hp: element.hp,
              attack: element.attack,
              defense: element.defense,
              speed: element.speed,
              height: element.height,
              weight: element.weight,
              types: {
                connect: element.types.map((element: number) => {
                  return { id: element };
                }),
              },
            },
          });
        }
      } catch (error) {
        console.log(element.id, element.name, element.types, error);
      }
    });
   
    res.status(200).json({ message: "All data has been uploaded" });
  } catch (error: any) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
}
