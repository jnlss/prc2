


import { Router } from "express"
import { deleteLibro, getLibros, getLibrosWithId, patchLibro, postLibro, putLibro } from "../controllers/libros.controllers.js"



const router = Router()

router.get("/", getLibros)
router.get("/:id", getLibrosWithId)
router.post("/", postLibro)
router.put("/:id", putLibro)
router.patch("/:id", patchLibro)
router.delete("/:id", deleteLibro)



export default router