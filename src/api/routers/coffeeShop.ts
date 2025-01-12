import {Router} from "express"
import {getAllCoffeeShop, getDetailCoffeeShop, postCoffeeShop} from "../controllers/coffeeShopController"

const router = Router()

router.get("/", getAllCoffeeShop)
router.get("/:id", getDetailCoffeeShop)
router.post("/", postCoffeeShop)

export default router
