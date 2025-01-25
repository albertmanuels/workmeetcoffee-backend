import { Request, Response } from "express"
import prisma from "../../lib/prisma"
import { generateSlug } from "../../lib/helpers"
import { PostBody } from "./types"
export const getAllCoffeeShop = async (req: Request, res: Response) => {
  const {searchValue} = req.body
  
  try {
    const coffeeShopData = await prisma.coffeeShop.findMany({
      where: searchValue ? {
       OR: [
         { name: { contains: searchValue, mode: "insensitive" } },
       ]
      } : {},
     })
   
     const result = coffeeShopData.map(item => {
       delete item.facilitiesId
       return item
     })
   
     res.status(200).send({
       data: result
     })

  } catch (error) {
    res.status(500).send({
      message: "Server error!"
    })
  }
}

export const getDetailCoffeeShop = async (req: Request, res: Response) => {
  const {slug, id} = req.params

  const coffeeShop = await prisma.coffeeShop.findFirst({
    where: {
      id
  }})

  if(!coffeeShop) {
    res.status(404).send({
      message: "Coffee Shop not found!"
    })
  }

  if(coffeeShop.slug !== slug) {
    res.redirect(301, `/coffee-shop/${coffeeShop.slug}-${id}`)
  }

  const facilities = await prisma.facilities.findFirst({
    where: {
      id: coffeeShop.facilitiesId
    },
  })

  delete coffeeShop.facilitiesId
  delete facilities.id

  const data = Object.assign(structuredClone(coffeeShop), {
    facilities
  }) 

  res.status(200).send({
    data,
  })
}

export const postCoffeeShop = async (req: Request, res: Response) => {
  const body:PostBody = req.body

  try {
    const data  = await prisma.coffeeShop.create({
      data: {
        facilities: {
          create: body.facilities
        },
        location: body.location,
        recommendedBy: body.recommendedBy,
        name: body.name,
        slug: generateSlug(body.name)
      }
    })
  
    res.status(200).send({
      message: "Success add new item!",
      data: {
        id: data.id,
        name: data.name,
        location: data.location,
        slug: data.slug
      }
    })
  } catch (error) {
    res.status(500).send({
      message: "Server error!",
      data: {}
    })
  }
}
