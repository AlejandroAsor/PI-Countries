//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// ---------------------------------------------------------------------------------

// Importar el paquete "dotenv" para configurar las variables de entorno
require("dotenv").config();

// Establecer la ruta del archivo de la aplicación a partir de una variable de entorno o utilizar la ruta predeterminada
const APP_FILE_PATH = process.env.APP_FILE_PATH || "./src/app.js";

// Importar el archivo de aplicación en la variable APP
const APP = require(APP_FILE_PATH);

// Importar la conexión a la base de datos y el modelo Country
const { conn } = require("./src/db.js");

// Establecer el puerto de la aplicación a partir de una variable de entorno o utilizar el puerto 3001
const PORT = process.env.PORT || 3001;

// Importar el paquete axios para hacer solicitudes HTTP
const { default: axios } = require("axios");

// Importar el modelo Country
const { Country } = require("./src/db");

// Definir una función asíncrona para cargar los países desde la API en la base de datos
async function countriesLoaded() {
  try {
    // Solicitar los datos de los países de la API
    const countriesApi = await axios.get("https://restcountries.com/v3.1/all");

    // Preparar los datos para la inserción masiva
    const countriesData = countriesApi.data.map((c) => {
      return {
        id: c.cca3,
        name: c.name.common,
        image: c.flags.png,
        continent: c.continents[0],
        capital: c.capital ? c.capital[0] : "No Data",
        subregion: c.subregion ? c.subregion : "No Data",
        area: c.area,
        population: c.population,
      };
    });

    // Insertar los datos en la tabla Country utilizando el método bulkCreate
    await Country.bulkCreate(countriesData);
  } catch (error) {
    console.log(
      "An error occurred while loading data to the database: ",
      error
    );
  }
}

// Sincronizar todos los modelos al mismo tiempo
conn.sync({ force: false }).then(async function () {
  // Cargar los datos de los países desde la API en la base de datos
  await countriesLoaded();

  // Iniciar la aplicación
  APP.listen(PORT, () => {
    console.log(`App listening at port ${PORT}`);
  });
});

/* // ASI ESTABA ANTES DE PONER LA FUNCION DE CARGAR PAISES EN DB
conn.sync({ force: true }).then(() => {
  server.listen(3001, () => {
    console.log('%s listening at 3001'); // eslint-disable-line no-console
  });
}); */

//FUNCION HECHA CON PROMESAS (AXIOS)  (sacar el async y el await en linea 60 y 61)
/* function countriesLoaded(){

  try{

     //traigo de api
     return axios.get('https://restcountries.com/v3.1/all') 
     //paso a BD
     .then(response => response.data.forEach(c =>{

      Country.findOrCreate({
          where:{ id: c.cca3 },
          defaults:{
                  name: c.name.common,
                  image: c.flags.png,
                  continent: c.continents[0],
                  capital: c.capital? c.capital[0] : 'No Data',
                  subregion: c.subregion? c.subregion : 'No Data',
                  area: c.area,
                  population: c.population 
          }
      })
  }) )

  }catch(error){
    console.log('No se cargaron los datos a la BD')
  }

}  */

/* El back-end de la aplicación está construido con Node.js y Express.js, y utiliza Sequelize como ORM para conectarse a una base de datos PostgreSQL. Los archivos principales que componen el back-end son:

app.js: Este es el archivo principal de la aplicación. Utiliza el framework Express para configurar el servidor, establecer middlewares y manejar rutas.

routes/: Este directorio contiene las rutas de la aplicación. Cada archivo en este directorio se encarga de manejar un conjunto específico de rutas relacionadas con un modelo o un conjunto de funciones específicas.

models/: Este directorio contiene los modelos de Sequelize que representan las tablas de la base de datos. Estos modelos se utilizan para realizar operaciones CRUD en la base de datos.

db.js: Este archivo se encarga de establecer la conexión a la base de datos y cargar los modelos en Sequelize.

index.js: Este archivo es el punto de entrada de la aplicación. Se encarga de sincronizar los modelos con la base de datos y luego iniciar el servidor. */

/* El primer archivo es "routes/activity.js", este archivo contiene las rutas para las actividades. Se importa el módulo "express" para poder utilizar las funciones de routing, se crea una instancia de un "router" para poder manejar las rutas de la aplicación, y se importan los modelos "Activity" y "Country" desde la carpeta "db" para poder realizar operaciones en la base de datos. En este archivo se crean dos rutas, una GET para obtener todas las actividades de la base de datos y enviarlas al cliente, y una POST para crear una nueva actividad en la base de datos.

El segundo archivo es "app.js", este archivo es el núcleo de la aplicación. Se importan los middlewares necesarios (cookie-parser, body-parser, morgan) y se configuran para usarlos en la aplicación. También se importa el archivo de rutas principal y se establecen las rutas de la a aplicación. Además, se configura el middleware CORS para permitir el acceso desde cualquier origen y se agrega un middleware para capturar errores generales en la aplicación. Finalmente, se exporta el servidor para su uso en otras partes de la aplicación.

El tercer archivo es "db.js", este archivo es responsable de configurar la conexión a la base de datos y de importar y exportar los modelos de la aplicación. Se utiliza el paquete Sequelize para establecer la conexión a la base de datos y se leen todos los archivos de la carpeta "models" para importar los modelos de la aplicación. También se establecen las relaciones entre los modelos y se exportan los modelos y la conexión a la base de datos.

Por último, el archivo "index.js" es el archivo principal de la aplicación. Se importa el archivo de aplicación y se establece el puerto de la aplicación. También se utiliza el paquete axios para hacer solicitudes HTTP a una API externa y se carga los países en la base de datos. Finalmente, se sincronizan todos los modelos y se inicia la aplicación.

En resumen, estos archivos trabajan juntos para configurar y ejecutar la aplicación. El archivo "app.js" es el núcleo de la aplicación y se encarga de configurar los middlewares, establecer las rutas y capturar los errores. El archivo "db.js" se encarga de configurar la conexión a la base de datos y de importar y exportar los modelos. El archivo "index.js" es el archivo principal de la aplicación y se encarga de cargar los países en la base de datos y de iniciar la aplicación.

*/
