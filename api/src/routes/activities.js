// Se importa el módulo "express" para poder utilizar las funciones de routing.
const express = require("express");

// Se crea una instancia de un "router" para poder manejar las rutas de la aplicación.
const router = express.Router();

// Se importan los modelos "Activity" y "Country" desde la carpeta "db" para poder realizar operaciones en la base de datos.
const { Activity, Country } = require("../db");

// Se crea una ruta GET para la raíz de la ruta de actividades. Esta ruta se encarga de obtener todas las actividades de la base de datos y enviarlas al cliente.
router.get("/", async (req, res) => {
  try {
    // Se utiliza el método "findAll" del modelo "Activity" para obtener todas las actividades de la base de datos. Se especifican los atributos "name" e "id" para que solo se obtengan estos datos.
    const allActivities = await Activity.findAll({
      attributes: ["name", "id"],
    });

    // Se verifica si existen actividades en la base de datos. Si existen, se envían al cliente con un estado de respuesta de 200.
    if (allActivities.length > 0) {
      res.status(200).send(allActivities);
      // Si no existen, se envía un estado de respuesta de 204 y un mensaje de "No existen actividades".
    } else {
      res.status(204).json("No existen actividades");
    }
    // En caso de error al intentar obtener las actividades, se envía un estado de respuesta de 404 y un mensaje de "No se pueden mostrar las actividades".
  } catch (error) {
    res.status(404).json("No se pueden mostrar las actividades");
  }
});

// Se crea una ruta POST para la raíz de la ruta de actividades. Esta ruta se encarga de crear una nueva actividad en la base de datos.
router.post("/", async (req, res) => {
  try {
    // Se obtienen los datos de la nueva actividad del cuerpo de la solicitud.
    const { name, difficulty, duration, season, paises } = req.body;

    // Se verifica que los datos recibidos sean válidos antes de crear la nueva actividad. Si alguno de los datos es inválido o faltante, se envía un estado de respuesta de 404 y un mensaje de "Los datos ingresados son incorrectos, la actividad no se ha creado".
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
      // Se utiliza el método "create" del modelo "Activity" para crear una nueva actividad con los datos recibidos.
      const newActivity = await Activity.create({
        name,
        difficulty,
        duration,
        season,
      });

      // Se buscan los países relacionados con la actividad mediante el modelo "Country" y se utiliza el método "addCountry" para relacionarlos con la nueva actividad creada.
      let countries = await Country.findAll({
        where: { name: paises },
      });
      newActivity.addCountry(countries);
      //Si la actividad se ha creado correctamente, se envía un estado de respuesta de 200 y un mensaje de "La actividad se ha creado exitosamente!".
      res.status(200).json("La actividad se ha creado exitosamente!");
    }
  } catch (error) {
    console.log(error);
    res.status(404).json("La actividad no se ha podido crear");
  }
});

// Se crea una ruta DELETE para la raíz de la ruta de actividades con un parámetro "id". Esta ruta se encarga de eliminar una actividad específica de la base de datos.
router.delete("/:id", async (req, res) => {
  // Se obtiene el id de la actividad a eliminar de los parámetros de la ruta.
  const { id } = req.params;

  try {
    // Se utiliza el método "destroy" del modelo "Activity" para eliminar la actividad con el id especificado.
    const deletedRowsCount = await Activity.destroy({ where: { id } });
    // Se verifica si se ha eliminado alguna fila de la base de datos. Si se ha eliminado alguna, se envía un estado de respuesta de 200 y un mensaje de "La actividad fue eliminada".
    if (deletedRowsCount) {
      res.status(200).json({ message: "La actividad fue eliminada" });
    }
    // Si no se ha eliminado ninguna, se envía un estado de respuesta de 404 y un mensaje de "La actividad no se encontró".
    else {
      res.status(404).json({ message: "La actividad no se encontró" });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Ocurrió un error al eliminar la actividad" });
  }
});

// Se crea una ruta PUT para la ruta de actividades con un parámetro "id". Esta ruta se encarga de actualizar una actividad específica en la base de datos.
router.put("/update/:id", async (req, res) => {
  //Se obtiene el id de la actividad a actualizar de los parámetros de la ruta, y los nuevos datos de la actividad del cuerpo de la solicitud. Se crea un objeto "updateData" con estos datos y un objeto "updateOptions" con la condición del id para actualizar la actividad correcta en la base de datos.
  const { id } = req.params;
  const { name, difficulty, duration, season } = req.body;
  const updateData = { name, difficulty, duration, season };
  const updateOptions = { where: { id } };

  try {
    //Se utiliza el método "update" del modelo "Activity" para actualizar la actividad en la base de datos con los nuevos datos y las opciones especificadas.
    const [updatedRowsCount, updatedRows] = await Activity.update(
      updateData,
      updateOptions
    );
    // Se verifica si se ha actualizado alguna fila en la base de datos. Si se ha actualizado alguna, se envía un estado de respuesta de 200 y un mensaje de "La actividad se ha modificado exitosamente!".
    if (updatedRowsCount) {
      res
        .status(200)
        .json({ message: "La actividad se ha modificado exitosamente!" });
    }
    //Si no se ha actualizado ninguna, se envía un estado de respuesta de 404 y un mensaje de "La actividad no se encontró".
    else {
      res.status(404).json({ message: "La actividad no se encontró" });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Ocurrió un error al actualizar la actividad" });
  }
});

// Se exporta el router para poder ser utilizado en otras partes de la aplicación.
module.exports = router;
