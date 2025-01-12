import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import routers from "./api/routers"

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

const PORT = process.env.PORT || 5000

app.use(express.json())
app.use(routers)

app.listen(PORT, () => {
  console.log(`[Server] Server is running on port ${PORT}`)
})