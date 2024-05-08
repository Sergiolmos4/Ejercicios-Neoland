// REQUERIMOS LAS LIBRERIAS una vez instaladas en el packaje.json Y CONFIGURAMOS DOTENV, index= archivo principal de la app

const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors"); // librería cors desde packaje.json previa instalacion alli con npm i cors//
dotenv.config(); // si no se configura, no funciona el env

/// CREAR SEERVER WEB instanciando a express( se puede poner cualquier nombre, en este caso se llama app)
const app = express();

// TRAER DEL ENV LA VARIABLE DE ENTORNO DEL PORT

const PORT = process.env.PORT; // la constante PORT siempre en mayúscula// coje PORT de .env
console.log(PORT);

// CORS --> CONFIGURAR EL QUE SE PUEDE HACER EN EL BACK ASI COMO EL ACCESO
app.use(cors());

//! ------------------ limitaciones de cantidad en el back end
app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ limit: "5mb", extended: false }));
//límites de lo que se puede enviar y recibir, esto NO SE TOCA, aquí el límite esta en 5mb texto//
//! ------------------ ROUTAS DE LA APP -------------------------

//! -----------------  ERRORES GENERALES Y RUTA NO ENCONTRADA

app.use("*", (req, res, next) => {
  // en un controlador siempre request, response y next//
  const error = new Error("Route not found");
  error.status = 404; // not found//
  return next(error);
});

// ----- en este caso como gestionamos un error la callback lleva de parametros error, req, res IMPORTANTE
// cuando es un controlador normal llevaria siempre como para parametros REQ, RES, NEXT ---> en este orden siemppre
app.use((error, req, res) => {
  return res
    .status(error.status || 500) // internal server error//
    .json(error.message || "unexpected error");
});

//! ------------------ ESCUCHAMOS EN EL PUERTO EL SERVIDOR WEB-----

// esto de aqui  nos revela con que tecnologia esta hecho nuestro back
app.disable("x-powered-by");
app.listen(PORT, () =>
  console.log(`Server listening on port 👌🔍 http://localhost:${PORT}`)
);
