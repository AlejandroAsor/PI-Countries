// importa el framework express
const express = require("express");

// importa el middleware cookie-parser
const cookieParser = require("cookie-parser");

// importa el middleware body-parser
const bodyParser = require("body-parser");

// importa el middleware morgan
const morgan = require("morgan");

// importa el archivo de rutas principal
const routes = require("./routes/index.js");

// importa la configuración de la base de datos
require("./db.js");

// crea una instancia de express
const server = express();

// asigna un nombre a la API
server.name = "API";

// configura el middleware body-parser para parsear las peticiones con formato urlencoded con un límite de 50mb
server.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));

// configura el middleware body-parser para parsear las peticiones con formato json con un límite de 50mb
server.use(bodyParser.json({ limit: "50mb" }));

// configura el middleware cookie-parser
server.use(cookieParser());

// configura el middleware morgan en modo desarrollo
server.use(morgan("dev"));

// configura las cabeceras CORS para permitir el acceso desde cualquier origen
server.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

// se establecen las rutas
server.use("/", routes);

// Utiliza un middleware para capturar errores generales en la aplicación
server.use((err, req, res, next) => {
  // eslint-disable-line no-unused-vars
  // // Asigna un estado de error (500) si no se especifica uno en el error recibido
  const status = err.status || 500;
  // Asigna un mensaje de error si no se especifica uno en el error recibido
  const message = err.message || err;
  // Imprime el error en la consola
  console.error(err);
  // Envía el estado y el mensaje de error al cliente
  res.status(status).send(message);
});

// Exporta el servidor para su uso en otras partes de la aplicación.
module.exports = server;
