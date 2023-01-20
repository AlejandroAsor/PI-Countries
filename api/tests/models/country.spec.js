// importa el modelo Country y la conexión a la base de datos desde el archivo db.js
const { Country, conn } = require("../../src/db.js");

// importa el módulo chai para manejar las expectativas de las pruebas
const { expect } = require("chai");

// describe el modelo Country
describe("Country model", () => {
  // esta función se ejecuta antes de las pruebas
  before(() =>
    // intenta autenticarse con la base de datos
    conn.authenticate().catch((err) => {
      // si no puede, imprime un error en la consola
      console.error("Unable to connect to the database:", err);
    })
  );
  // describe las validaciones del modelo
  describe("Validators", () => {
    // antes de cada prueba, sincroniza la tabla del modelo en la base de datos y la fuerza a vaciar
    beforeEach(() => Country.sync({ force: true }));
    // describe la validación del nombre
    describe("name", () => {
      // espera que se lance un error si el nombre es nulo
      it("should throw an error if name is null", (done) => {
        // intenta crear un país sin nombre
        Country.create({})
          // si se crea, se espera un error
          .then(() => done(new Error("It requires a valid name")))
          // si no se crea, se considera que la prueba pasó
          .catch(() => done());
      });
      // espera que funcione si se ingresa un nombre válido
      it("should work when its a valid name", () => {
        Country.create({ name: "Argentina" }); // Intenta crear un país con nombre "Argentina"
      });
    });
  });
});
