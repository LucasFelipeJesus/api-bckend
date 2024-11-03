import { Router } from "express"

import CustomerController from "../controllers/CustomerController.js"

const customerRoutes = Router()

customerRoutes.post("/", CustomerController.create)
customerRoutes.get("/", CustomerController.getall)
customerRoutes.get("/:id", CustomerController.getOne)
customerRoutes.delete("/:id", CustomerController.delete)
customerRoutes.put("/:id", CustomerController.update)

export default customerRoutes
