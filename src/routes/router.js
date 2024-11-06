import { Router } from "express"
import serviceRoutes from "./Services.js"
import professionalRoutes from "./ProfessionalRouter.js"
import customerRoutes from "./CustomerRouter.js"
import postRoutes from "./PostRouter.js"

const routes = Router()

routes.use("/services", serviceRoutes)
routes.use("/professional", professionalRoutes)
routes.use("/customer", customerRoutes)
routes.use("/posts", postRoutes)

export default routes
