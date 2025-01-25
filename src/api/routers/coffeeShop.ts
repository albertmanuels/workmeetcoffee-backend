import {Router} from "express"
import {getAllCoffeeShop, postCoffeeShop} from "../controllers/coffeeShopController"

const router = Router()

router.get("/", getAllCoffeeShop)
// router.get("/:id", getDetailCoffeeShop)
router.post("/submission", postCoffeeShop)

export default router
