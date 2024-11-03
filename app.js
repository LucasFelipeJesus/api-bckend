import express from "express"
import cors from "cors"

const app = express()
app.use(cors())
app.use(express.json())

//rotas

import routes from "./src/routes/router.js"
app.use("/api", routes)

//DB Connection
import conn from "./src/db/conn.js"
conn()

const PORT = 3000

app.listen(PORT, () => {
    console.log("Server is running on port 3000")
})
