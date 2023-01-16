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
} from "./typeActions";
import axios from "axios";

export const getCountries = () => {
  return async function (dispatch) {
    try {
      const json = await axios("http://localhost:3001/countries");
      return dispatch({ type: GET_ALL_COUNTRIES, payload: json.data });
    } catch (error) {
      console.log(error.response.data);
    }
  };
};

export const getActivities = () => {
  return async function (dispatch) {
    try {
      const json = await axios("http://localhost:3001/activities");

      return dispatch({ type: GET_ALL_ACTIVITIES, payload: json.data });
    } catch (error) {
      console.log(error.response.data);
    }
  };
};

export const postActivity = (payload) => {
  return async function (dispatch) {
    try {
      const json = await axios.post(
        "http://localhost:3001/activities",
        payload
      );

      alert(json.data);
      return dispatch({ type: POST_ACTIVITY, payload: json.data });
    } catch (error) {
      console.log(error.response.data);
      console.log(error.response.data);
    }
  };
};

export const getNameCountry = (name) => {
  return async function (dispatch) {
    try {
      const json = await axios(
        `http://localhost:3001/countries?name=${name}`,
        {}
      );
      return dispatch({ type: GET_NAME_COUNTRY, payload: json.data });
    } catch (error) {
      alert(error.response.data);
    }
  };
};

export const getDetail = (id) => {
  return async function (dispatch) {
    try {
      return fetch(`http://localhost:3001/countries/${id}`)
        .then((response) => response.json())
        .then((json) => {
          dispatch({ type: GET_DETAIL, payload: json });
        });
    } catch (error) {
      console.log(error);
      alert("no matches");
    }
  };
};

export const filterByContinent = (payload) => {
  return {
    type: FILTER_BY_CONTINENT,
    payload: payload,
  };
};

export const filterByActivity = (payload) => {
  return {
    type: FILTER_BY_ACTIVITY,
    payload: payload,
  };
};

export const orderBy = (payload) => {
  return {
    type: ORDER_BY,
    payload: payload,
  };
};

export const deleteActivity = (id) => {
  return async function (dispatch) {
    try {
      const json = await axios.delete(`http://localhost:3001/activities/${id}`);
      console.log("json q recibe de la ruta (en el action):");
      console.log(json);
      return dispatch({ type: DELETE_ACTIVITY, payload: id });
    } catch (error) {
      console.log(error.response.data);
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
