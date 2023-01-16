const { Router } = require("express");
const { Country, Activity } = require("../db");
const { Op } = require("sequelize");
/* const { UPSERT } = require('sequelize/types/query-types'); */

const router = Router();

router.get("/", async (req, res) => {
  try {
    const { name } = req.query;
    if (name) {
      //traigo datos de BD filtrado por name
      const allCountries = await Country.findAll({
        attributes: ["id", "name", "continent", "image", "population"],
        include: [Activity],
        where: {
          name: { [Op.iLike]: "%" + name + "%" },
        },
      });

      if (allCountries.length > 0) {
        res.status(201).send(allCountries);
      } else {
        res.status(404).json("No existen datos del país ingresado");
      }
    } else {
      //traigo datos de BD                //const allCountries = await Country.findAll({ attributes: ['id', 'name','continent','image','population']});

      const allCountries = await Country.findAll({
        attributes: ["id", "name", "continent", "image", "population"],
        include: [Activity],
        order: [["name", "ASC"]],
      });

      if (allCountries.length > 0) {
        res.status(201).send(allCountries);
      } else {
        res.status(404).json("No existen paises");
      }
    }
  } catch (error) {
    console.log(error);
    res.status(404).json("No se pueden mostrar los paises");
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    let detail = await Country.findByPk(id.toUpperCase(), {
      include: [Activity],
    });

    res.send(detail);
  } catch (error) {
    console.log(error);
    res.status(404).json("No existen datos del pais seleccionado");
  }
});

module.exports = router;
