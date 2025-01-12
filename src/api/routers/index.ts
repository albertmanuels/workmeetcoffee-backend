import { Router } from "express"
import coffeeShopRouter from "./coffeeShop"

const router = Router()

router.use("/api/coffee-shop", coffeeShopRouter)

export default router