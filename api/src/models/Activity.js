// Se importa el módulo "DataTypes" de la librería "sequelize" para poder utilizar los tipos de datos en la definición del modelo.
const { DataTypes } = require("sequelize");

// Se define un módulo exportable que recibe como parámetro una instancia de "sequelize" para poder definir el modelo en la base de datos.
module.exports = (sequelize) => {
  //Se define el modelo "activity" en la instancia de "sequelize" recibida como parámetro.
  sequelize.define("activity", {
    //Se define una columna "id" con tipo "UUID" y como valor predeterminado "UUIDV4". También se especifica que es la clave primaria del modelo.
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    // Se define una columna "name" con tipo "STRING" y que no puede ser nula.
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    // Se define una columna "difficulty" con tipo "INTEGER" y que no puede ser nula. También se especifica una validación para que el valor sea un número entero entre 1 y 5.
    difficulty: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
        max: 5,
      },
    },

    // Se define una columna "duration" con tipo "INTEGER" y que no puede ser nula. También se especifica una validación para que el valor sea un número entero entre 1 y 24.
    duration: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
        max: 24,
      },
    },

    // Se define una columna "season" con tipo "ENUM" y que no puede ser nula. Se especifican los valores posibles para esta columna: "Verano", "Otoño", "Invierno" y "Primavera".
    season: {
      type: DataTypes.ENUM("Verano", "Otoño", "Invierno", "Primavera"),
      allowNull: false,
    },
  });
};
