


import { Router } from "express"
import { devolverLibro, getHistorialPrestamos, getPrestamos, prestarLibro } from "../controllers/prestamos.controller.js"




const router = Router()

router.get("/", getPrestamos)
router.get("/:id/prestamos", getHistorialPrestamos)
router.post("/:id/prestar", prestarLibro)
router.post("/:id/devolver", devolverLibro)



export default router