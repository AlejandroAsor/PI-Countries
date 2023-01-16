const express = require("express");
const router = express.Router();
const { Activity } = require("../db");
const { Country } = require("../db");

router.get("/", async (req, res) => {
  try {
    const allActivities = await Activity.findAll({
      attributes: ["name", "id"],
    });

    if (allActivities.length > 0) {
      res.status(200).send(allActivities);
    } else {
      res.status(204).json("No existen actividades");
    }
  } catch (error) {
    res.status(404).json("No se pueden mostrar las actividades");
  }
});

router.post("/", async (req, res) => {
  try {
    const { name, difficulty, duration, season, paises } = req.body;

    if (
      !name ||
      name === "" ||
      (!difficulty && isNaN(difficulty) === true) ||
      (!duration && isNaN(duration) === true) ||
      (season !== "Verano" &&
        season !== "Otoño" &&
        season !== "Invierno" &&
        season !== "Primavera") ||
      paises.length === 0
    ) {
      res
        .status(404)
        .json(
          "Los datos ingresados son incorrectos, la actividad no se ha creado"
        );
    } else {
      const newActivity = await Activity.create({
        name,
        difficulty,
        duration,
        season,
      });

      let countries = await Country.findAll({
        where: { name: paises },
      });
      newActivity.addCountry(countries);
      res.status(200).json("La actividad se ha creado exitosamente!");
    }
  } catch (error) {
    console.log(error);
    res.status(404).json("La actividad no se ha podido crear");
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deletedRowsCount = await Activity.destroy({ where: { id } });

    if (deletedRowsCount) {
      res.status(200).json({ message: "La actividad fue eliminada" });
    } else {
      res.status(404).json({ message: "La actividad no se encontró" });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Ocurrió un error al eliminar la actividad" });
  }
});

router.put("/update/:id", async (req, res) => {
  const { id } = req.params;
  const { name, difficulty, duration, season } = req.body;
  const updateData = { name, difficulty, duration, season };
  const updateOptions = { where: { id } };

  try {
    const [updatedRowsCount, updatedRows] = await Activity.update(
      updateData,
      updateOptions
    );
    if (updatedRowsCount) {
      res
        .status(200)
        .json({ message: "La actividad se ha modificado exitosamente!" });
    } else {
      res.status(404).json({ message: "La actividad no se encontró" });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Ocurrió un error al actualizar la actividad" });
  }
});

module.exports = router;
