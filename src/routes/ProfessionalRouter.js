import { Router } from "express"
import ProfessionalController from "../controllers/ProfessionalController.js"

const professionalRoutes = Router()

professionalRoutes.post("/", ProfessionalController.create)
professionalRoutes.post("/:token/rating", ProfessionalController.addRating)
professionalRoutes.get("/", ProfessionalController.getall)
professionalRoutes.get("/:token", ProfessionalController.getOne)
professionalRoutes.delete("/:token", ProfessionalController.delete)
professionalRoutes.put("/:token", ProfessionalController.update)

export default professionalRoutes
