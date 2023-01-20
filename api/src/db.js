// importa y carga las variables de entorno desde el archivo .env
require("dotenv").config();

// importa las dependencias sequelize y Op
const { Sequelize, Op } = require("sequelize");

// importa el módulo fs de node
const fs = require("fs");

// importa el módulo path de node
const path = require("path");

// extrae las variables de entorno necesarias para conectarse a la BD
const { DB_USER, DB_PASSWORD, DB_HOST, DB_DEPLOY } = process.env;

// Crea una nueva instancia de Sequelize con los parámetros de conexión a la BD
// const sequelize = new Sequelize(
//   `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/countries`,
//   {
//     logging: false, // set to console.log to see the raw SQL queries
//     native: false, // lets Sequelize know we can use pg-native for ~30% more speed
//   }
// );

// Crea una nueva instancia de Sequelize con los parámetros de conexión a la BD
const sequelize = new Sequelize(DB_DEPLOY, {
  logging: false, // set to console.log to see the raw SQL queries
  native: false, // lets Sequelize know we can use pg-native for ~30% more speed
});

// obtiene el nombre del archivo actual
const basename = path.basename(__filename);

// crea un arreglo vacío para almacenar los modelos
const modelDefiners = [];

// Lee todos los archivos de la carpeta Models, los requiere y agrega al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, "/models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "/models", file)));
  });

// Inyecta la conexión sequelize a todos los modelos
modelDefiners.forEach((model) => model(sequelize));
// Capitaliza los nombres de los modelos (ie: product => Product)
const entries = Object.entries(sequelize.models);
const capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

// Destructuring para obtener los modelos importados
const { Country, Activity } = sequelize.models;

// Crea las relaciones entre los modelos
Country.belongsToMany(Activity, { through: "country_activity" });
Activity.belongsToMany(Country, { through: "country_activity" });

// Exporta los modelos y la conexión a la BD
module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize, // para importart la conexión { conn } = require('./db.js');
};
