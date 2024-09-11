import "dotenv/config"
import express from "express"
import cors from "cors"

import { fileURLToPath } from 'url'
import path from 'path'

import conn from "./config/conn.js"// importando para estabelecer a conexão com o banco de dados

// Importação dos modelos
import "./models/postagemModel.js"
import "./models/usuariosModel.js"

// Importação das rotas
import postagemRoutes from "./routes/postagemRoutes.js"
import usuariosRoutes from "./routes/usuariosRoutes.js"

const PORT = process.env.PORT || 3333

const app = express()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Fazer a conexão com o banco de dados
conn.sync().then(() => {
    console.log("Olá, Mundo!")
    app.listen(PORT, () => {
        console.log(`Servidor on http://localhost:${PORT}`)
    })
}).catch(()=> console.error(error))

app.use(cors())
app.use(express.urlencoded({ extended: true}))
app.use(express.json())


// middleware
app.use("/public", express.static(path.join(__dirname, "public")))


app.use("/postagens", postagemRoutes)
app.use("/usuarios", usuariosRoutes)

app.use("/", (request, response) => {
    response.status(404).json({message: "Rota não encontrada"})
})