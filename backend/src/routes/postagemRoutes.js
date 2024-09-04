import { Router } from "express"
import { create, getAll, getPostagemById } from "../controllers/postagemController.js"

const router = Router()

router.post("/", create)
router.get("/", getAll)
router.get("/:id", getPostagemById)

export default router