import { Router } from "express"

import ServiceController from "../controllers/ServiceController.js"

const router = Router()

router.route("/services").post(ServiceController.create)
router.route("/services").get(ServiceController.getall)
router.route("/services/:id").get(ServiceController.getOne)
router.route("/services/:id").delete(ServiceController.delete)
router.route("/services/:id").put(ServiceController.update)

export default router
