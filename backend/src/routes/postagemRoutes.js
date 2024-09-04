import { Router } from "express"
import { create, getAll, getPostagemById, updatePostagem } from "../controllers/postagemController.js"

const router = Router()

router.post("/", create)
router.get("/", getAll)
router.get("/:id", getPostagemById)
router.put("/:id", updatePostagem)

export default router