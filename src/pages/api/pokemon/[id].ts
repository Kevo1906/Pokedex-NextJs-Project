import type { NextApiRequest, NextApiResponse } from "next";

import { Pokemon, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any | { message: string }>
) {
  const { id } = req.query;
  const numberId = Number(id);
  if (isNaN(numberId)) {
    res.status(404).json({ message: "Send a number id" });
  }
  switch (req.method) {
    case "GET":
      try {
        const pokemonFound = await prisma.pokemon.findUnique({
          where: {
            id: numberId,
          },
          include: {
            types: true,
          },
        });
        if (!pokemonFound) {
          res.status(400).json({ message: "Pokemon not found" });
        }
        res.status(200).json(pokemonFound);
      } catch (error: any) {
        res.status(404).json({ message: error.message });
      }
      break;
    case "DELETE":
      try {
        const pokemonUpdated = await prisma.pokemon.update({
          where: {
            id: numberId,
          },
          data: {
            deletedAt: new Date(),
          },
        });
        if (!pokemonUpdated) {
          res.status(400).json({ message: "Pokemon not found" });
        }
        res.status(200).json({ message: "Pokemon was deleted" });
      } catch (error: any) {
        res.status(404).json({ message: error.message });
      }
      break;
    default:
        res.status(404).json({ message: 'Method not defined' })
  }
}
