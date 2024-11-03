import { Router } from "express"

import ProfessionalController from "../controllers/ProfessionalController.js"

const router = Router()

router.route("/professional").post(ProfessionalController.create)
router.route("/professional").get(ProfessionalController.getall)
router.route("/professional/:id").get(ProfessionalController.getOne)
router.route("/professional/:id").delete(ProfessionalController.delete)

export default router
