// Importa el Router de Express
const { Router } = require("express");

// Importa el archivo de rutas de países
const countriesRoute = require("./countries");

// Importa el archivo de rutas de actividades
const activitiesRoute = require("./activities");

// Crea una instancia del Router de Express
const router = Router();

// Asigna el archivo de rutas de países a la ruta base '/countries'
router.use("/countries", countriesRoute);

// Asigna el archivo de rutas de actividades a la ruta base '/activities'
router.use("/activities", activitiesRoute);

// Exporta el router para ser utilizado en otras partes de la aplicación.
module.exports = router;
