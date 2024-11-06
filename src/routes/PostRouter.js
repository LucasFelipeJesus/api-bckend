import { Router } from "express"
import PostController from "../controllers/PostController.js"

const postRoutes = Router()

postRoutes.post("/", PostController.create)
postRoutes.get("/", PostController.getall)
postRoutes.get("/:id", PostController.getOne)
postRoutes.delete("/:id", PostController.delete)

export default postRoutes
