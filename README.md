API REST de Biblioteca

API REST basica construida con Node.js, Express y TypeScript para gestionar libros y prestamos.

Requisitos previos

Node.js instalado (version 14 o superior).

Instalacion y ejecucion

Clona este repositorio y accede a la carpeta:
git clone https://github.com/jnlss/prc2
cd api-biblioteca

Instala las dependencias necesarias:
npm install

Arranca el servidor local:
npm run dev

El servidor se ejecutara por defecto en el puerto 3000 (http://localhost:3000).

Endpoints disponibles

Libros

GET /libros : Lista todos los libros.

GET /libros/:id : Muestra un libro por su ID.

POST /libros : Crea un nuevo libro (requiere titulo, autor y año).

PUT /libros/:id : Reemplaza los datos de un libro.

PATCH /libros/:id : Modifica parcialmente un libro.

DELETE /libros/:id : Elimina un libro (solo si no esta prestado).

Prestamos

GET /prestamos : Lista todos los prestamos.

GET /libros/:id/prestamos : Historial de prestamos de un libro.

POST /libros/:id/prestar : Presta un libro (requiere usuario).

POST /libros/:id/devolver : Devuelve un libro prestado.

Estadisticas

GET /estadisticas : Muestra el total de libros, su disponibilidad y el autor principal.