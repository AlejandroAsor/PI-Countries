// Se importa el objeto Router de express, para poder utilizar las funciones del router de express.
const { Router } = require("express");

// Se importan los modelos Country y Activity desde la carpeta db.
const { Country, Activity } = require("../db");

// Se importa el objeto Op (operadores) de sequelize para poder realizar operaciones de comparación en las consultas a la base de datos.
const { Op } = require("sequelize");
/* const { UPSERT } = require('sequelize/types/query-types'); */

const router = Router();

// Se define una ruta GET para el endpoint raiz del router, cuando se realiza una solicitud GET a esta ruta se ejecutara el codigo dentro de las llaves {}
router.get("/", async (req, res) => {
  try {
    const { name } = req.query;
    // Se verifica si existe un query parametro llamado name en la solicitud GET
    if (name) {
      // Se realiza una consulta a la base de datos con el modelo Country, para obtener todos los paises.
      const allCountries = await Country.findAll({
        // Se especifican los atributos que se quieren obtener de la tabla countries
        attributes: ["id", "name", "continent", "image", "population"],
        // Se incluye la relacion con el modelo Activity, para obtener tambien los datos de las actividades relacionadas con cada pais.
        include: [Activity],
        // Se establece una condición en la consulta, donde el nombre del pais sea similar al valor del query name, utilizando el operador iLike (case insensitive) y agregando % al principio y al final del valor del query para permitir la búsqueda parcial.
        where: {
          name: { [Op.iLike]: "%" + name + "%" },
        },
      });
      // Si se encuentran paises con esa condición, se envian los datos de los paises encontrados con un estado 201
      if (allCountries.length > 0) {
        res.status(201).send(allCountries);
      }
      // si no se encuentran paises con esa condición, se envia un mensaje de error con un estado 404
      else {
        res.status(404).json("No existen datos del país ingresado");
      }
    } else {
      // y se ordenan ascendentemente por nombre.
      const allCountries = await Country.findAll({
        attributes: ["id", "name", "continent", "image", "population"],
        include: [Activity],
        order: [["name", "ASC"]],
      });
      // Si se encuentran paises, se envian los datos con un estado 201
      if (allCountries.length > 0) {
        res.status(201).send(allCountries);
      }
      // si no se encuentran paises, se envia un mensaje de error con un estado 404
      else {
        res.status(404).json("No existen paises");
      }
    }
  } catch (error) {
    //  si ocurre un error se envia un mensaje de error
    console.log(error);
    res.status(404).json("No se pueden mostrar los paises");
  }
});
router.get("/:id", async (req, res) => {
  // Se obtiene el valor del parametro de la ruta (:id)
  const { id } = req.params;

  try {
    // Se realiza una consulta a la base de datos mediante el metodo findByPk para obtener un pais especifico mediante su id, y se convierte a mayusculas el valor del id.
    let detail = await Country.findByPk(id.toUpperCase(), {
      // Se incluye la relacion con el modelo Activity, para obtener tambien los datos de las actividades relacionadas con el pais.
      include: [Activity],
    });
    // Se envia la respuesta con los datos del pais encontrado.
    res.send(detail);
    // Si ocurre un error se envia un mensaje de error
  } catch (error) {
    console.log(error);
    res.status(404).json("No existen datos del pais seleccionado");
  }
});

// Se exporta el router para poder ser utilizado en otro archivo.
module.exports = router;
