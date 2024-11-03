import { Router } from "express"

import CustomerController from "../controllers/CustomerController.js"

const router = Router()

router.route("/customer").post(CustomerController.create)
router.route("/customer").get(CustomerController.getall)
router.route("/customer/:id").get(CustomerController.getOne)
router.route("/customer/:id").delete(CustomerController.delete)
router.route("/customer/:id").put(CustomerController.update)

export default router
