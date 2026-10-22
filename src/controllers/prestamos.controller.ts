

import type { Request, Response } from "express"
import { cambiarPrestamos, generarPrestamoId, prestamos, cambiarLibros, libros } from "../data/db.data.js"




// GET general
export const getPrestamos = (req: Request, res: Response) => {
    return res.json(prestamos)
}





// GET /libros/:id/prestamos
export const getHistorialPrestamos = (req: Request, res: Response) => {
    const idLibro = Number(req.params.id)
    const historial = prestamos.filter(p => p.libroId === idLibro)
    return res.json(historial)
}





// POST /libros/:id/prestar
export const prestarLibro = (req: Request, res: Response) => {
    const idLibro = Number(req.params.id)
    const usuario = req.body?.usuario

    if(!usuario){
        res.status(400).json({error:"El usuario es obligatorio"})
        return
    }

    
    const libro = libros.find(l => l.id === idLibro)
    if(!libro) return res.status(404).json({error:"Libro no encontrado"})
    if(!libro) return res.status(400).json({error:"El libro ya está siendo prestado"})


    const prestamosActivoUsuario = prestamos.filter(p => p.usuario === usuario && p.fechaDevolucion === null)
    if(prestamosActivoUsuario.length >= 2){
        return res.status(400).json({error:"El usuario ya tiene 2 libros prestados"})
    }


    // Efectuar prestamo
    cambiarLibros(libros.map(l => l.id === idLibro ? {...l, disponible:false} : l))

    
    const nuevoPrestamo = {
        id: generarPrestamoId(),
        libroId: idLibro,
        usuario: usuario,
        fechaPrestamo: req.body.fechaPrestamo,
        fechaDevolucion: null
    }


    cambiarPrestamos([...prestamos, nuevoPrestamo])
    res.status(201).json({message:"Libro prestado con éxito", nuevoPrestamo: nuevoPrestamo})
}





// POST /libros/:id/devolver
export const devolverLibro = (req: Request, res: Response) => {
    const idLibro = Number(req.params.id)

    const libro = libros.find(l => l.id === idLibro)
    if(!libro) return res.status(404).json({error:"Libro no encontrado"})
    if(libro.disponible) return res.status(400).json({error:"El libro no está prestado"})
    
    
    const prestamoActivo = prestamos.find(p => p.libroId === idLibro && p.fechaDevolucion === null)
    if(!prestamoActivo) return res.status(500).json({error:"No se encontró el registro del prestamo"})

    
    // Efectuar devolución
    const fechaActual = "02-02-2026"            // Ejemplo de fecha
    cambiarPrestamos(prestamos.map(p => p.id === prestamoActivo.id ? {...p, fechaDevolucion: fechaActual} : p ))
    cambiarLibros(libros.map(l => l.id === idLibro ? {...l, disponible: true} : l ))

    res.json({message:"Libro devuelto con éxito"})

}