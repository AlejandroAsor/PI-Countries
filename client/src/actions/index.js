// este archivo contiene las acciones que se van a ejecutar en el store
import {
  GET_ALL_COUNTRIES,
  GET_ALL_ACTIVITIES,
  POST_ACTIVITY,
  GET_NAME_COUNTRY,
  GET_DETAIL,
  FILTER_BY_CONTINENT,
  FILTER_BY_ACTIVITY,
  ORDER_BY,
  DELETE_ACTIVITY,
  CLEAR_STATE,
} from "./typeActions";

// importa axios para hacer las peticiones a la API y la constante URL que contiene la dirección de la API
import axios from "axios";
export const URL = "pi-countries-production-7708.up.railway.app";
// Esta línea exporta una función llamada "getCountries", que no tiene argumentos y devuelve una función anónima.
export const getCountries = () => {
  // Esta línea devuelve una función anónima que toma un argumento llamado "dispatch". La función es marcada como "async" lo que significa que se ejecutará de manera asíncrona.
  return async function (dispatch) {
    // El "try" permite ejecutar el código dentro de él y si ocurre algún error, el código dentro del "catch" será ejecutado.
    try {
      // Esta línea utiliza la librería "axios" para realizar una solicitud HTTP a la dirección especificada en la constante URL y agrega "/countries" al final. La respuesta se almacena en una variable llamada "json".
      const json = await axios(`${URL}/countries`);
      // Esta línea utiliza el argumento "dispatch" para enviar un objeto con una propiedad "type" y una propiedad "payload" al almacenamiento de aplicaciones. La propiedad "type" tiene el valor de la constante "GET_ALL_COUNTRIES" y la propiedad "payload" tiene el valor del atributo "data" del objeto "json".
      return dispatch({ type: GET_ALL_COUNTRIES, payload: json.data });
    } catch (error) {
      // Si ocurre algún error en el "try", este bloque "catch" imprimirá los datos de la respuesta del error en la consola.
      console.log(error.response.data);
    }
  };
};

export const getActivities = () => {
  // Se exporta una función constante llamada "getActivities"
  return async function (dispatch) {
    // La función retorna una función asíncrona que toma un argumento "dispatch"
    try {
      // Dentro de la función se intenta realizar una petición GET a la ruta "/activities" utilizando la librería axios. La respuesta se almacena en una variable llamada "json".
      const json = await axios(`${URL}/activities`);

      // Si la petición es exitosa, se ejecuta la acción "GET_ALL_ACTIVITIES" y se le pasa como payload los datos recibidos en la respuesta.
      return dispatch({ type: GET_ALL_ACTIVITIES, payload: json.data });
    } catch (error) {
      // En caso de error, se imprime en consola el mensaje de error recibido.
      console.log(error.response.data);
    }
  };
};

export const postActivity = (payload) => {
  // Se exporta una función constante llamada "postActivity" que toma un argumento "payload"
  return async function (dispatch) {
    // La función retorna una función asíncrona que toma un argumento "dispatch"
    try {
      // Dentro de la función se intenta realizar una petición POST a la ruta "/activities" utilizando la librería axios y enviando el payload como argumento
      const json = await axios.post(`${URL}/activities`, payload);

      // Si la petición es exitosa, se ejecuta un alert con el data que se recibe en la respuesta, y se ejecuta la acción "POST_ACTIVITY" y se le pasa como payload los datos recibidos en la respuesta
      alert(json.data);
      return dispatch({ type: POST_ACTIVITY, payload: json.data });
    } catch (error) {
      // En caso de error, se imprime en consola el mensaje de error recibido.

      console.log(error.response.data);
    }
  };
};

export const getNameCountry = (name) => {
  //  Se exporta una función constante llamada "getNameCountry" que toma un argumento "name"
  return async function (dispatch) {
    // La función retorna una función asíncrona que toma un argumento "dispatch"
    try {
      // Dentro de la función se intenta realizar una petición GET a la ruta "/countries" utilizando la librería axios y enviando el name como argumento
      const json = await axios(`${URL}/countries?name=${name}`, {}); // Se envía un objeto vacío como segundo argumento para que no se envíe el token de autenticación
      return dispatch({ type: GET_NAME_COUNTRY, payload: json.data }); // Se ejecuta la acción "GET_NAME_COUNTRY" y se le pasa como payload los datos recibidos en la respuesta
    } catch (error) {
      // En caso de error, se imprime en consola el mensaje de error recibido.
      alert(error.response.data);
    }
  };
};
export const clearState = () => {
  return function (dispatch) {
    dispatch({ type: CLEAR_STATE });
  };
};
export const getDetail = (id) => {
  // Se exporta una función constante llamada "getDetail" que toma un argumento "id"
  return async function (dispatch) {
    // La función retorna una función asíncrona que toma un argumento "dispatch"
    try {
      // Se intenta realizar una petición GET a la ruta "/countries" utilizando la librería fetch y enviando el id como argumento
      return fetch(`${URL}/countries/${id}`) // Se envía un objeto vacío como segundo argumento para que no se envíe el token de autenticación
        .then((response) => response.json()) // Se convierte la respuesta a formato JSON
        .then((json) => {
          //  Se ejecuta la acción "GET_DETAIL" y se le pasa como payload los datos recibidos en la respuesta
          dispatch({ type: GET_DETAIL, payload: json }); // Se ejecuta la acción "GET_DETAIL" y se le pasa como payload los datos recibidos en la respuesta
        });
    } catch (error) {
      // En caso de error, se imprime en consola el mensaje de error recibido.
      console.log(error);
      alert("no matches");
    }
  };
};

export const filterByContinent = (payload) => {
  // Se exporta una función constante llamada "filterByContinent" que toma un argumento "payload"
  return {
    // Se retorna un objeto con una propiedad "type" y una propiedad "payload"
    type: FILTER_BY_CONTINENT, // La propiedad "type" tiene el valor de la constante "FILTER_BY_CONTINENT"
    payload: payload, // La propiedad "payload" tiene el valor del argumento "payload"
  };
};

export const filterByActivity = (payload) => {
  // Se exporta una función constante llamada "filterByActivity" que toma un argumento "payload"
  return {
    // Se retorna un objeto con una propiedad "type" y una propiedad "payload"
    type: FILTER_BY_ACTIVITY, // La propiedad "type" tiene el valor de la constante "FILTER_BY_ACTIVITY"
    payload: payload, // La propiedad "payload" tiene el valor del argumento "payload"
  };
};

export const orderBy = (payload) => {
  return {
    type: ORDER_BY,
    payload: payload,
  };
};

export const deleteActivity = (id) => {
  // Se establece una función "deleteActivity" que recibe como parámetro un id.

  return async function (dispatch) {
    // Se retorna una función asíncrona que recibe como parámetro un argumento "dispatch".
    console.log(id + "este es"); // se imprime el id recibido en la consola
    try {
      // Se intenta realizar una petición DELETE a la ruta especificada, incluyendo el id en la ruta.
      const json = await axios.delete(`${URL}/activities/${id}`);
      console.log("json q recibe de la ruta (en el action):"); //// se imprime el json recibido en la consola

      console.log(json);
      // se retorna una acción DELETE_ACTIVITY y se pasa como payload el id recibido.

      return dispatch({ type: DELETE_ACTIVITY, payload: id });
    } catch (error) {
      console.log(error.response.data); // se imprime el error recibido en la consola
    }
  };
};

//OPCION CON FETCH-PROMESAS

/* export const getNameCountry = (payload) => {
    return async function (dispatch){

        try{
            return fetch(`http://localhost:3001/countries?name=${payload}`)
            .then(response => response.json())
            .then(json => {console.log('desde la action'); console.log(json);
            dispatch({ type: GET_NAME_COUNTRY, payload: json }); 
                    
            });

        }catch(error){
            console.log(error)
            alert('no matches')
        }        
    }
};  */

//OPCION CON AXIOS-PROMESAS
/* export const getNameCountry = (name) => {
    return async function(dispatch){
        try{
            return axios(`http://localhost:3001/countries?name=${name}`)
            
            .then(response => dispatch({type:GET_NAME_COUNTRY, payload: response.data}))

        }catch(error){
            console.log(error)
        }
    }
} */

//OPCION POST CON FETCH PROMESAS

/* export const postActivity = (payload) => {

    return async function (dispatch){

        try{

          return fetch("http://localhost:3001/activities",{
            method: 'POST',
            body: JSON.stringify(payload),
            headers:{'Content-type': 'application/json; charset=utf-8'}
          })
          .then(response => response.json())
          .then(json => {
             dispatch({ type: POST_ACTIVITY, payload: json }); 
          });

        }catch(error){
            
        }        
    }           
};  */

//OPCION POST CON FETCH PROMESAS y MSJ DE ALERTA

/* export const postActivity = (payload) => {

    return async function (dispatch){

        try{

          return fetch("http://localhost:3001/activities",{
            method: 'POST',
            body: JSON.stringify(payload),
            headers:{'Content-type': 'application/json; charset=utf-8'}
          })
          .then(response => response.json())
          .then(json => {alert(json); return json})  //retorna json para q mande la respuesta al dispatch y actualize estado alertas
          .then(json => {
             dispatch({ type: POST_ACTIVITY, payload: json }); 
          })
          

        }catch(error){
            
        }        
    }           
};   */
