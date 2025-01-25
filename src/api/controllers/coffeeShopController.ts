import { Request, Response } from "express"
import prisma from "../../lib/prisma"
import { generateSlug } from "../../lib/helpers"
export const getAllCoffeeShop = async (req: Request, res: Response) => {
  const {searchValue} = req.body

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
}

// export const getDetailCoffeeShop = async (req: Request, res: Response) => {
//   const csSlug = generateSlug(req.body.name)
  
//   const coffeeShopBase = await prisma.coffeeShop.findFirst({
//     where: {
      
//   }})

//   delete coffeeShopBase.facilitiesId

//   const facilities = await prisma.facilities.findFirst({
//     where: {
//       id: coffeeShopBase.facilitiesId
//     },
//   })

//   delete facilities.id

//   const data = {
//     ...coffeeShopBase,
//     facilities
//   }

//   res.status(200).send({
//     data,
//   })
// }

// type PostCoffeeShop = {
//   id: string,
//   name: string;
//   location: string;
//   recommendedBy: string;
//   facilities: {
//     wifi: boolean;
//     beverages: boolean;
//     snacks: boolean;
//     meals: boolean;
//     sockets: boolean;
//     musholla: boolean;
//     carParking: boolean;
//     motorParking: boolean;
//     babyChair: boolean
//     meetingRoom: boolean;
//   }
// }

export const postCoffeeShop = async (req: Request, res: Response) => {
  const body = req.body

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
