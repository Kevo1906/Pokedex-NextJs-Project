import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient, Type } from "@prisma/client";

const prisma = new PrismaClient();
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Array<Type> | { message: string }>
) {
    if(req.method =='GET'){
  try {
    const allTypes = await prisma.type.findMany();

    res.status(200).json(allTypes);
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }} else{
    res.status(404).json({ message: 'Method not defined' })
  }
}
