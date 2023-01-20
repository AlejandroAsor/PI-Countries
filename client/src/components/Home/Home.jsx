// Se importan los modulos necesarios
import { useEffect, useState } from "react";
// Se importa el modulo useDispatch para poder usar el dispatch de Redux en el componente y el modulo useSelector para poder usar el estado de Redux en el componente.
import { useDispatch, useSelector } from "react-redux";

import {
  getCountries, // se importa la funcion para obtener los paises
  getActivities, // se importa la funcion para obtener las actividades
  filterByContinent, // se importa la funcion para filtrar por continente
  filterByActivity, // se importa la funcion para filtrar por actividad
  orderBy, // se importa la funcion para ordenar
} from "../../actions/index";

// se importa el componente Link de react-router-dom
import { Link } from "react-router-dom";

// se importa el componente Country
import Country from "../Country/Country";

// se importa el componente Paginado
import Paginado from "../Paginado/Paginado";

// se importa el componente SearchBar
import SearchBar from "../SearchBar/SearchBar";

// se importa el archivo de estilos CSS
import style from "./Home.module.css";

export default function Home() {
  const dispatch = useDispatch(); // se crea una constante dispatch que es igual al useDispatch
  const allCountries = useSelector((state) => state.countries); // se obtiene la lista de paises del estado de redux
  const allActivities = useSelector((state) => state.activities); // se obtiene la lista de actividades del estado de redux

  const [typeOrder, setTypeOrder] = useState({
    // se establece el estado inicial de typeOrder
    alfabeticFilter: "", //guarda ascendente o descendente
    attributeFilter: "", //guarda nombre o poblacion
  });

  //PAGINADO
  const [currentPage, setCurrentPage] = useState(1); // Se utiliza el hook "useState" para establecer el estado inicial de "currentPage" en 1. El estado "currentPage" se utilizará para saber en qué página se encuentra el usuario.
  const [countriesPerPage, setcountriesPerPage] = useState(9); // Se utiliza el hook "useState" para establecer el estado inicial de "countriesPerPage" en 9. El estado "countriesPerPage" se utilizará para saber cuántos países se mostrarán por página.
  const indexOfLastCountry =
    currentPage === 1
      ? currentPage * countriesPerPage + 1
      : currentPage * countriesPerPage;
  const indexOfFirstCountry =
    currentPage === 1 ? 0 : currentPage * countriesPerPage - 11;
  const currentCountries = allCountries.slice(
    indexOfFirstCountry,
    indexOfLastCountry - 1
  );

  const paginado = (pageNumber) => {
    // Se define una función "paginado" que recibe como parámetro "pageNumber" que representa el número de página en el que se encuentra el usuario.
    setCurrentPage(pageNumber); // Utilizando el hook "useState" se actualiza el estado "currentPage" con el valor recibido como parámetro "pageNumber".
    if (pageNumber === 1) {
      // Se verifica si el valor de "pageNumber" es igual a 1
      setcountriesPerPage(9); // en caso afirmativo se actualiza el estado "countriesPerPage" con el valor 9.
    } else {
      setcountriesPerPage(10); // en caso contrario se actualiza el estado "countriesPerPage" con el valor 10.
    }
  };
  useEffect(() => {
    // Se utiliza el hook "useEffect" para ejecutar ciertas acciones cuando el componente es renderizado.
    dispatch(getCountries()); // Se utiliza la función "dispatch" para despachar la acción "getCountries", la cual se encarga de obtener los países.
    dispatch(getActivities()); // Se utiliza la función "dispatch" para despachar la acción "getActivities", la cual se encarga de obtener las actividades.
  }, [dispatch]); // El segundo argumento es el arreglo de dependencias, en este caso solo se esta pasando el dispatch, esto indica que solo se ejecutara cuando el dispatch cambie, es decir, solo una vez al cargar el componente.

  function handleClickLimpiar(e) {
    // Se define una función llamada "handleClickLimpiar" que recibe un evento como parámetro. Esta función se utilizará como manejador de eventos para el botón "Limpiar".
    e.preventDefault(); // Se utiliza esta línea para prevenir que el navegador realice la acción por defecto al hacer clic en el botón. En este caso, evita que la página se recargue.
    dispatch(getCountries()); // Se utiliza la función "dispatch" para despachar la acción "getCountries" que se encarga de obtener todos los países.
    setCurrentPage(1); // Se establece el estado "currentPage" en 1 para volver a la primera página de la vista.
  }

  function handleFilterContinent(e) {
    if (e.target.value !== "Elegir Continente") {
      // Se utiliza una condicional para verificar si el valor seleccionado no es "Elegir Continente".
      dispatch(filterByContinent(e.target.value)); // Si se cumple la condición anterior, se utiliza la función "dispatch" para despachar la acción "filterByContinent" y se pasa como parámetro el valor seleccionado en el menú desplegable.
      setCurrentPage(1); // Se establece el estado "currentPage" en 1 para volver a la primera página de la vista.
    }
  }

  function handleFilterActivity(e) {
    if (e.target.value !== "Elegir Actividad") {
      //  // Se utiliza una condicional para verificar si el valor seleccionado no es "Elegir Actividad".
      dispatch(filterByActivity(e.target.value)); // Si se cumple la condición anterior, se utiliza la función "dispatch" para despachar la acción "filterByActivity" y se pasa como parámetro el valor
      setCurrentPage(1); // Se establece el estado "currentPage" en 1 para volver a la primera página de la vista.
    }
  }

  // se utiliza para actualizar el estado "typeOrder" con los valores seleccionados en los menús desplegables para ordenar los países.
  function handleOrderFilter(e) {
    setTypeOrder({
      ...typeOrder,
      [e.target.name]: e.target.value,
    });
  }

  // es una función manejadora de eventos que se ejecuta cuando se hace clic en el botón "Filtrar".
  function handleClickFiltrar(e) {
    // Se utiliza una condicional para verificar si se han seleccionado valores válidos en los menús desplegables para ordenar los países.
    if (
      (typeOrder.alfabeticFilter === "ascendente" ||
        typeOrder.alfabeticFilter === "descendente") &&
      (typeOrder.attributeFilter === "nombre" ||
        typeOrder.attributeFilter === "poblacion")
    ) {
      e.preventDefault(); // Se utiliza para prevenir que el navegador realice la acción por defecto al hacer clic en el botón. En este caso, evita que la página se recargue.
      dispatch(orderBy(typeOrder)); //  Se utiliza la función "dispatch" para despachar la acción "orderBy" y se pasa como parámetro el estado "typeOrder" que contiene los valores seleccionados en los menús desplegables.
      setCurrentPage(1); // Se establece el estado "currentPage" en 1 para volver a la primera página de la vista.
      setTypeOrder({
        //Se actualiza el estado "typeOrder" con los valores seleccionados en los menús desplegables.
        alfabeticFilter: typeOrder.alfabeticFilter,
        attributeFilter: typeOrder.attributeFilter,
      });
    } else {
      // Si no se han seleccionado valores válidos en los menús desplegables, se muestra un mensaje de alerta.
      alert("Debe seleccionar orden y tipo de filtro");
    }
  }
  return (
    <div className={style.container}>
      <div className={style.filtrado}>
        <div className={style.continente}>
          <select
            value="Elegir Continente"
            onChange={(e) => handleFilterContinent(e)}
          >
            <option key="Elegir Continente" value="Elegir Continente">
              Elegir Continente
            </option>
            <option key="South America" value="South America">
              South America
            </option>
            <option key="North America" value="North America">
              North America
            </option>
            <option key="Europe" value="Europe">
              Europe
            </option>
            <option key="Africa" value="Africa">
              Africa
            </option>
            <option key="Asia" value="Asia">
              Asia
            </option>
            <option key="Oceania" value="Oceania">
              Oceania
            </option>
            <option key="Antarctica" value="Antarctica">
              Antarctica
            </option>
          </select>
        </div>

        <div className={style.actividad}>
          <select
            value="Elegir Actividad"
            onChange={(e) => handleFilterActivity(e)}
          >
            <option value="Elegir Actividad">Elegir Actividad</option>
            {allActivities &&
              allActivities.map((act) => {
                return (
                  <option key={act.name} value={act.name}>
                    {act.name}
                  </option>
                );
              })}
          </select>
        </div>

        <div className={style.alfabetico}>
          <select
            defaultValue="Elegir Orden"
            name="alfabeticFilter"
            onChange={(e) => handleOrderFilter(e)}
          >
            <option value="Elegir Orden">Elegir Orden</option>
            <option value="ascendente">Ascendente</option>
            <option value="descendente">Descendente</option>
          </select>
        </div>

        <div className={style.tipo}>
          <select
            defaultValue="Elegir Tipo"
            name="attributeFilter"
            onChange={(e) => handleOrderFilter(e)}
          >
            <option value="Elegir Tipo">Elegir Tipo</option>
            <option value="nombre">Nombre</option>
            <option value="poblacion">Población</option>
          </select>
        </div>

        <div className={style.btnFiltrar}>
          <button onClick={(e) => handleClickFiltrar(e)}>Filtrar</button>
        </div>

        <div className={style.btnReset}>
          <button onClick={(e) => handleClickLimpiar(e)}>
            Limpiar filtros
          </button>
        </div>

        <div className={style.searchBar}>
          <SearchBar key={paginado.id} paginado={paginado} />
        </div>
      </div>

      <div className={style.paginado}>
        <Paginado
          key={style.paginado}
          countriesPerPage={countriesPerPage}
          allCountries={allCountries.length}
          paginado={paginado}
          currentPage={currentPage}
        />
      </div>

      <div className={style.cards}>
        {allCountries !== "No existen datos del país ingresado" &&
          currentCountries &&
          currentCountries.map((c) => (
            <div key={c.id}>
              <Link
                key={c.id}
                to={`/countries/${c.id}`}
                style={{ textDecoration: "none", color: "#f3f3f3" }}
              >
                <Country
                  key={c.id}
                  name={c.name}
                  image={c.image}
                  continent={c.continent}
                />
              </Link>
            </div>
          ))}
      </div>
    </div>
  );
}
