import { Router } from "express"
import ServiceController from "../controllers/ServiceController"

const router = Router()

router.post("/services", ServiceController.create)

export default router
