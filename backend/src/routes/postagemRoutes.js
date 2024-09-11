import { Router } from "express"
import { create, getAll, getPostagemById, updatePostagem } from "../controllers/postagemController.js"
import imageUpload from "../helpers/image-upload.js"

const router = Router()

router.post("/", imageUpload.single("imagem"), create)
router.get("/", getAll)
router.get("/:id", getPostagemById)
router.put("/:id", updatePostagem)

export default router