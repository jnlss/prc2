

import type { Request, Response } from "express"
import { cambiarLibros, generarLibroId, libros } from "../data/db.data.js"
import type { LibroT } from "../models/libros.models.js"





// GET general
export const getLibros = (req: Request, res: Response) => {
    return res.json(libros)
}





// FUNCION buscarLibro - luego se utiliza dentro de otras
export const findLibro = (id: number, res: Response) => {
    const libro = libros.find(x => x.id === id)
    if(!libro) {
        res.status(404).json({error: "No existe ese libro"})
        return
    }
    return libro
}





// GET con id
export const getLibrosWithId = (req: Request, res: Response) => {
    const id = Number(req.params.id)
    const libro = findLibro(id, res)
    if(libro) res.json(libro)
}





// POST
export const postLibro = (req: Request, res: Response) => {
    
    
    if (!req.body) {
        res.status(400).json({error:"No has añadido nada el el body"})
        return
    }


    if (!req.body.titulo) {
        res.status(400).json({error:"No has añadido el titulo"})
        return
    }


    if (!req.body.autor) {
        res.status(400).json({error:"No has añadido el autor"})
        return
    }


    if (!req.body.año) {
        res.status(400).json({error:"No has añadido el año"})
        return
    }


    // NO PUEDEN EXISTIR DUPLICADOS
    const duplicado = libros.find(l => l.titulo === req.body.titulo && l.autor === req.body.autor)
    if (duplicado){
        return res.status(400).json({error:"Ya existe un libro con ese título y autor"})
    }


    const nuevoLibro: LibroT = {
        id: generarLibroId(),
        titulo: req.body.titulo,
        autor: req.body.autor,
        año: req.body.año,
        disponible: true
    }


    libros.push(nuevoLibro)
    res.status(201).json({message:"Libro creado correctamente", libro:nuevoLibro})
}





// PUT
export const putLibro = (
    req: Request,
    res: Response
) => {
    const id = Number(req.params.id)
    const libroAActualizar = findLibro(id, res)

    if(!libroAActualizar) return

    if(!req.body){
        res.status(400).json({error:"No has pasado nada"})
        return
    }


    if(!req.body.titulo){
        res.status(400).json({error:"Falta el titulo"})
        return
    }


    if(!req.body.autor){
        res.status(400).json({error:"Falta el autor"})
        return
    }


    if(!req.body.año){
        res.status(400).json({error:"Falta el año de publicación"})
        return
    }


    if(!req.body.disponible){
        res.status(400).json({error:"Falta la disponibilidad"})
        return
    }


    const nuevoLibro: LibroT = {
        id: id,
        titulo: req.body.titulo,
        autor: req.body.autor,
        año: req.body.año,
        disponible: req.body.disponible
    }


    cambiarLibros(libros.map((x) => x.id === id?nuevoLibro:x))
    res.json({message:"Libro actualizado correctamente", nuevoLibro: nuevoLibro})
}





// PATCH
export const patchLibro = (req: Request, res: Response) => {
    const id = Number(req.params.id)
    const libroAActualizar = findLibro(id, res)

    if (!libroAActualizar) return


    if(!req.body){
        res.status(400).json({error:"No has pasado nada"})
        return
    }


    if(!req.body.titulo && !req.body.autor && !req.body.año && !req.body.disponible){
        res.status(400).json({error:"Tienes que pasar al menos un campo"})
        return
    }


    const nuevoLibro: LibroT = {
        ...libroAActualizar,
        titulo: req.body.titulo ?? libroAActualizar.titulo,
        autor: req.body.autor ?? libroAActualizar.autor,
        año: req.body.año ?? libroAActualizar.año,
        disponible: req.body.disponible ?? libroAActualizar.disponible
    }


    cambiarLibros(libros.map((x) => x.id === id ? nuevoLibro : x))
    res.json({message:"Libro actualizado correctamente", nuevoLibro: nuevoLibro})
}





// DELETE
export const deleteLibro = (req: Request, res: Response) => {
    const id = Number(req.params.id)
    const libroAEliminar = findLibro(id, res)

    if(libroAEliminar){
        if(!libroAEliminar.disponible){
            return res.status(400).json({error:"No se puede borrar un libro prestado"})
        }
        cambiarLibros(libros.filter(x => x.id !== id))
        res.json({message:`El libro con id ${id} ha sido eliminado`})
    }
}