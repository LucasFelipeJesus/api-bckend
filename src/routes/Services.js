import { Router } from "express"

import ServiceController from "../controllers/ServiceController.js"

const serviceRoutes = Router()

serviceRoutes.post("/", ServiceController.create)
serviceRoutes.get("/", ServiceController.getall)
serviceRoutes.get("/:id", ServiceController.getOne)
serviceRoutes.delete("/:id", ServiceController.delete)
serviceRoutes.put("/:id", ServiceController.update)

export default serviceRoutes
