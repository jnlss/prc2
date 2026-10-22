import type { Request, Response } from "express"
import { libros } from "../data/db.data.js"

export const getEstadisticas = (req: Request, res: Response) => {
    const totalLibros = libros.length
    const disponibles = libros.filter(l => l.disponible).length
    const prestados = totalLibros - disponibles

    // Calcular el autor con más libros
    const contadorAutores: Record<string, number> = {}
    libros.forEach(l => {
        contadorAutores[l.autor] = (contadorAutores[l.autor] || 0) + 1
    })

    let autorConMasLibros = "Ninguno"
    let maxLibros = 0
    for (const [autor, cantidad] of Object.entries(contadorAutores)) {
        if (cantidad > maxLibros) {
            maxLibros = cantidad
            autorConMasLibros = autor
        }
    }

    res.json({
        totalLibros,
        disponibles,
        prestados,
        autorConMasLibros
    })
}