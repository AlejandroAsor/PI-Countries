//Se importa el módulo "DataTypes" de la librería "sequelize" para poder utilizar los tipos de datos en la definición del modelo.
const { DataTypes } = require("sequelize");

// Se define un módulo exportable que recibe como parámetro una instancia de "sequelize" para poder definir el modelo en la base de datos.
module.exports = (sequelize) => {
  // Se define el modelo "country" en la instancia de "sequelize" recibida como parámetro.
  sequelize.define("country", {
    // Se define una columna "id" con tipo "STRING" de longitud 3, que no puede ser nula y es la clave primaria del modelo.
    id: {
      type: DataTypes.STRING(3),
      allowNull: false,
      primaryKey: true,
    },
    // Se define una columna "name" con tipo "STRING" y que no puede ser nula.
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // Se define una columna "image" con tipo "STRING" y que no puede ser nula.
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // Se define una columna "continent" con tipo "STRING" y que no puede ser nula.
    continent: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // Se define una columna "capital" con tipo "STRING" y que no puede ser nula.
    capital: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // Se define una columna "subregion" con tipo "STRING".
    subregion: {
      type: DataTypes.STRING,
    },
    // Se define una columna "area" con tipo "INTEGER".
    area: {
      type: DataTypes.INTEGER,
    },
    // Se define una columna "population" con tipo "INTEGER".
    population: {
      type: DataTypes.INTEGER,
    },
  });
};
