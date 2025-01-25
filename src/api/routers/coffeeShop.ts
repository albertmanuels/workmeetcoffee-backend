import {Router} from "express"
import {getAllCoffeeShop, postCoffeeShop, getDetailCoffeeShop} from "../controllers/coffeeShopController"

const router = Router()

router.get("/", getAllCoffeeShop)
router.get("/:slug-:id", getDetailCoffeeShop)
router.post("/submission", postCoffeeShop)

export default router
