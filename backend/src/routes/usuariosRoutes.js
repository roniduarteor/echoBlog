import { Router } from "express"
import { create, atualizarUsuario } from "../controllers/usuariosController.js"

const router = Router()

router.post("/registro", create)
router.put("/:id", atualizarUsuario)

export default router