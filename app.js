import express from "express"
import cors from "cors"

const app = express()
app.use(cors())
app.use(express.json())

//rotas

import router from "./src/routes/Services.js"
app.use("/api", router)

//DB Connection
import conn from "./src/db/conn.js"
conn()

const PORT = 3000

app.listen(PORT, () => {
    console.log("Server is running on port 3000")
})
