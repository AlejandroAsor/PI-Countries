// Importa las constantes que representan los diferentes tipos de acciones que se pueden realizar en el almacenamiento global.
import {
  GET_ALL_COUNTRIES,
  GET_ALL_ACTIVITIES,
  GET_NAME_COUNTRY,
  GET_DETAIL,
  FILTER_BY_CONTINENT,
  ORDER_BY,
  FILTER_BY_ACTIVITY,
  POST_ACTIVITY,
  DELETE_ACTIVITY,
  CLEAR_STATE,
} from "../actions/typeActions";

// Establece un estado inicial para los datos almacenados en el almacenamiento global.
const initialState = {
  countries: [],
  activities: [],
  detail: [],
  allCountries: [],
  alertas: [],
};

//  Define una función que se utilizará como "reductor raíz" para manejar las acciones y actualizar el estado en el almacenamiento global.
const rootReducer = (state = initialState, action) => {
  //  Declara una variable para almacenar una copia de todos los países. Esta variable se utilizará en varios casos para realizar filtros y ordenamientos.
  let allCountries = [];

  // Una estructura switch que toma la acción enviada como un parámetro y determina qué acción se debe tomar en función del tipo de acción.
  switch (action.type) {
    // Si el tipo de acción es GET_ALL_COUNTRIES, se actualiza el estado de los países con los datos recibidos en la acción y se guarda una copia de todos los países en la variable allCountries.
    case GET_ALL_COUNTRIES:
      allCountries = action.payload;
      allCountries.sort((a, b) => a.name.localeCompare(b.name));
      return {
        ...state,
        countries: action.payload,
        allCountries: action.payload,
      };

    //Si el tipo de acción es GET_ALL_ACTIVITIES, se actualiza el estado de las actividades con los datos recibidos en la acción.
    case GET_ALL_ACTIVITIES:
      return { ...state, activities: action.payload };

    case CLEAR_STATE:
      return { ...state, detail: initialState.detail };

    // Si el tipo de acción es GET_NAME_COUNTRY, se actualiza el estado de los países con los datos recibidos en la acción.
    case GET_NAME_COUNTRY:
      return { ...state, countries: action.payload };

    // Si el tipo de acción es GET_DETAIL, se actualiza el estado del detalle con los datos recibidos en la acción.
    case GET_DETAIL:
      return { ...state, detail: action.payload };

    case POST_ACTIVITY:
      return { ...state };

    // Si el tipo de acción es FILTER_BY_CONTINENT, se filtran los países en allCountries según el continente especificado en la acción y se actualiza el estado de los países.
    case FILTER_BY_CONTINENT:
      allCountries = state.allCountries;
      const continentFilter = allCountries.filter(
        (el) => el.continent === action.payload
      );
      return { ...state, countries: continentFilter };

    //Si el tipo de acción es FILTER_BY_ACTIVITY, se filtran los países en el arreglo allCountries del estado según la actividad especificada en la acción.
    case FILTER_BY_ACTIVITY:
      // Se declara un arreglo vacío para almacenar los países que cumplen con el criterio de filtrado.
      const filt = [];

      // Se asigna el arreglo allCountries del estado a una variable para poder trabajar con ella.
      allCountries = state.allCountries;

      allCountries.forEach((el) => {
        el.activities.forEach((act) => {
          if (act.name === action.payload) {
            filt.push(el);
          }
        });
      });
      // for antiguo
      /*for(var i=0; i<allCountries.length;i++){
                    for(var j=0; j<allCountries[i].activities.length;j++){
                        if(allCountries[i].activities[j].name === action.payload){
                            filt.push(allCountries[i])
                        }
                    }
                } */
      console.log("reducer filterAct");
      console.log(filt);

      return { ...state, countries: filt };

    // Si el tipo de acción es ORDER_BY, se ordenan los países en el estado según los criterios especificados en la acción (alfabético ascendente/descendente y atributo de ordenamiento nombre/población).
    case ORDER_BY:
      let countrySorted = [];

      if (
        action.payload.alfabeticFilter === "ascendente" &&
        action.payload.attributeFilter === "nombre"
      ) {
        countrySorted = state.countries.sort((a, b) =>
          a.name.localeCompare(b.name)
        );
      } else if (
        action.payload.alfabeticFilter === "descendente" &&
        action.payload.attributeFilter === "nombre"
      ) {
        countrySorted = state.countries.sort((a, b) =>
          b.name.localeCompare(a.name)
        );
      } else if (
        action.payload.alfabeticFilter === "ascendente" &&
        action.payload.attributeFilter === "poblacion"
      ) {
        countrySorted = state.countries.sort(
          (a, b) => a.population - b.population
        );
      } else if (
        action.payload.alfabeticFilter === "descendente" &&
        action.payload.attributeFilter === "poblacion"
      ) {
        countrySorted = state.countries.sort(
          (a, b) => b.population - a.population
        );
      }
      return { ...state, countries: countrySorted };

    case DELETE_ACTIVITY:
      // Si el tipo de acción es DELETE_ACTIVITY, se realiza un filtrado en el arreglo de actividades del estado para eliminar la actividad con el id especificado en la acción.
      console.log("action.payload del reducer");
      console.log(action.payload);
      return {
        ...state,
        activities: state.activities.filter((a) => a.id !== action.payload),
      };

    // Si no se cumple ninguna de las condiciones anteriores, se devuelve el estado actual sin cambios.
    default:
      return { ...state };
  }
};
//  Exporta la función "reductor raíz" para que pueda ser utilizada
export default rootReducer;
