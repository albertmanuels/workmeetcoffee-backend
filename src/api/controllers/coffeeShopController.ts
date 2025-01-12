import { Request, Response } from "express"
import prisma from "../../lib/prisma"
import { generateUniqueId } from "../../lib/helpers"

export const getAllCoffeeShop = async (req: Request, res: Response) => {
  const coffeeShopList = await prisma.coffeeShop.findMany()
  
  res.status(200).send({
    data: coffeeShopList
  })
}

export const getDetailCoffeeShop = async (req: Request, res: Response) => {
  const csSlug = req.params.id
  
  const data = await prisma.coffeeShop.findFirst({where: {
    slug: csSlug,
  }})

  res.status(200).send({
    data
  })
}

export const postCoffeeShop = async (req: Request, res: Response) => {
  const existingId = await prisma.coffeeShop.findMany({
    select: {
      id: true
    }
  })

  const {name}: {name: string} = req.body
  const slug = name.split(" ").join("-").toLowerCase()

  await prisma.coffeeShop.create({
    data: {
      id: generateUniqueId(existingId),
      name,
      slug,
    }
  })

  res.status(200).send({
    message: "Success add new item!",
    data: {
      id: generateUniqueId(existingId),
      name,
      slug,
    }
  })
}