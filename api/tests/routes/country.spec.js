// Se importa chai para poder hacer las comparaciones en las pruebas
const chai = require("chai");

// Se importa el modelo de actividades
const { Activity } = require("../../src/db");

// se asigna a una variable para ser utilizado en las pruebas
const expect = chai.expect;

describe("Activity Router", () => {
  // Se describe la prueba para el metodo GET en el endpoint /activity
  describe("GET /activity", () => {
    // se especifica lo que se espera que haga esta prueba
    it("debería devolver todas las actividades", async () => {
      // se buscan todas las actividades en la base de datos
      const allActivities = await Activity.findAll({
        // se especifican los atributos a traer
        attributes: ["name", "id"],
      });
      // se espera que el resultado sea un arreglo
      expect(allActivities).to.be.an("array");

      // se espera que el primer resultado tenga un atributo llamado "name"
      expect(allActivities[0]).to.have.property("name");

      // se espera que el primer resultado tenga un atributo llamado "id"
      expect(allActivities[0]).to.have.property("id");
    });
  });

  // Se describe la prueba para el metodo POST en el endpoint /activity
  describe("POST /activity", () => {
    // se especifica lo que se espera que haga esta prueba
    it("debería crear una nueva actividad", async () => {
      // se crea un objeto con los datos de una actividad de prueba
      const activityData = {
        name: "Test Activity",
        difficulty: 3,
        duration: 2,
        season: "Verano",
      };
      // se utiliza el modelo para crear una nueva actividad en la base de datos con los datos especificados
      const newActivity = await Activity.create(activityData);
      // se espera que la actividad creada tenga un nombre igual al especificado en los datos de pruebas
      expect(newActivity).to.have.property("name", "Test Activity");
      // se espera que la actividad creada tenga una dificultad igual al especificado en los datos de prueba
      expect(newActivity).to.have.property("difficulty", 3);
      // se espera que la actividad creada tenga una duración igual al especificado en los datos de prueba
      expect(newActivity).to.have.property("duration", 2);
      // se espera que la actividad creada tenga una temporada igual al especificado en los datos de prueba
      expect(newActivity).to.have.property("season", "Verano");
    });
  });

  // Se describe la prueba para el metodo DELETE en el endpoint /activity/:id
  describe("DELETE /activity/:id", () => {
    // se especifica lo que se espera que haga el metodo, en este caso se espera que elimine una actividad existente.
    it("debería eliminar una actividad existente", async () => {
      // Se crea una nueva actividad para poder eliminarla luego.
      const newActivity = await Activity.create({
        name: "Test Activity",
        difficulty: 3,
        duration: 2,
        season: "Verano",
      });
      // Se elimina la actividad recien creada con el metodo destroy y se almacena en deletedRowsCount el numero de filas eliminadas.
      const deletedRowsCount = await Activity.destroy({
        where: { id: newActivity.id },
      });
      // Se espera que deletedRowsCount sea igual a 1, indicando que se eliminó correctamente la actividad.
      expect(deletedRowsCount).to.equal(1);
    });
  });
});
