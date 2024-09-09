import { Router } from "express"
import { create } from "../controllers/usuariosController.js"

const router = Router()

router.post("/registro", create)

export default router