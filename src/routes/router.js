import { Router } from "express"
import serviceRoutes from "./Services.js"
import professionalRoutes from "./ProfessionalRouter.js"
import customerRoutes from "./CustomerRouter.js"

const routes = Router()

routes.use("/services", serviceRoutes)
routes.use("/professional", professionalRoutes)
routes.use("/customer", customerRoutes)

export default routes
