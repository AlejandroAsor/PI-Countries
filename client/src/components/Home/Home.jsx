import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  getCountries,
  getActivities,
  filterByContinent,
  filterByActivity,
  orderBy,
} from "../../actions/index";
import { Link } from "react-router-dom";
import Country from "../Country/Country";
import Paginado from "../Paginado/Paginado";
import SearchBar from "../SearchBar/SearchBar";
import style from "./Home.module.css";

export default function Home() {
  const dispatch = useDispatch();
  const allCountries = useSelector((state) => state.countries);
  const allActivities = useSelector((state) => state.activities);

  const [typeOrder, setTypeOrder] = useState({
    alfabeticFilter: "", //guarda ascendente o descendente
    attributeFilter: "", //guarda nombre o poblacion
  });

  //PAGINADO
  const [currentPage, setCurrentPage] = useState(1);
  const [countriesPerPage, setcountriesPerPage] = useState(9);
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
    setCurrentPage(pageNumber);
    if (pageNumber === 1) {
      setcountriesPerPage(9);
    } else {
      setcountriesPerPage(10);
    }
  };
  useEffect(() => {
    dispatch(getCountries());
    dispatch(getActivities());
  }, [dispatch]);

  function handleClickLimpiar(e) {
    e.preventDefault();
    dispatch(getCountries());
    setCurrentPage(1);
  }

  function handleFilterContinent(e) {
    if (e.target.value !== "Elegir Continente") {
      dispatch(filterByContinent(e.target.value));
      setCurrentPage(1);
    }
  }

  function handleFilterActivity(e) {
    if (e.target.value !== "Elegir Actividad") {
      dispatch(filterByActivity(e.target.value));
      setCurrentPage(1);
    }
  }

  function handleOrderFilter(e) {
    setTypeOrder({
      ...typeOrder,
      [e.target.name]: e.target.value,
    });
  }

  function handleClickFiltrar(e) {
    if (
      (typeOrder.alfabeticFilter === "ascendente" ||
        typeOrder.alfabeticFilter === "descendente") &&
      (typeOrder.attributeFilter === "nombre" ||
        typeOrder.attributeFilter === "poblacion")
    ) {
      e.preventDefault();
      dispatch(orderBy(typeOrder));
      setCurrentPage(1);
      setTypeOrder({
        alfabeticFilter: typeOrder.alfabeticFilter,
        attributeFilter: typeOrder.attributeFilter,
      });
    } else {
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
