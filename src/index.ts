import express from "express"
import libroRoutes from "./routes/libros.routes.js"
import prestamoRoutes from "./routes/prestamos.routes.js"
import { getEstadisticas } from "./controllers/estadisticas.controller.js"

const app = express()

app.use(express.json())

app.use("/libros", libroRoutes)
app.use("/", prestamoRoutes)
app.get("/estadisticas", getEstadisticas)

app.listen(300, ()=> {
    console.log("API funcionando en el puerto 3000")
})