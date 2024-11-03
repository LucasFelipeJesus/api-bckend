import { Router } from "express"
import ProfessionalController from "../controllers/ProfessionalController.js"

const professionalRoutes = Router()

professionalRoutes.post("/", ProfessionalController.create)
professionalRoutes.get("/", ProfessionalController.getall)
professionalRoutes.get("/:id", ProfessionalController.getOne)
professionalRoutes.delete("/:id", ProfessionalController.delete)
professionalRoutes.put("/:id", ProfessionalController.update)

export default professionalRoutes
