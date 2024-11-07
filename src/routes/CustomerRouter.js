import { Router } from "express"

import CustomerController from "../controllers/CustomerController.js"

const customerRoutes = Router()

customerRoutes.post("/", CustomerController.create)
customerRoutes.get("/", CustomerController.getall)
customerRoutes.get("/:token", CustomerController.getOne)
customerRoutes.delete("/:token", CustomerController.delete)
customerRoutes.put("/:token", CustomerController.update)

export default customerRoutes
