// se importa react y react-redux para poder usar el hook useSelector y useDispatch para poder acceder al estado global y despachar acciones.
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// se importa el hook useHistory para poder redireccionar a otra ruta.
import { useHistory } from "react-router-dom";

// se importan las acciones que se van a despachar.
import { getDetail, deleteActivity, clearState } from "../../actions/index";

// se importan los componentes que se van a usar.
import Activity from "../Activity/Activity";
import CountryDetail from "../Country/CountryDetail";

// se importan los estilos CSS.
import style from "./Detail.module.css";

// se crea un componente de funcion llamado Detail y se le pasa una propiedad props
export default function Detail(props) {
  const dispatch = useDispatch(); // se utiliza useDispatch para tener acceso a las acciones
  const history = useHistory(); // se utiliza useHistory para tener acceso a la navegacion

  useEffect(() => {
    // se utiliza useEffect para ejecutar un efecto secundario despues de que el componente se renderiza por primera vez.
    dispatch(getDetail(props.match.params.id)); // se ejecuta la accion getDetail y se le pasa el id como parametro
    return () => clearState();
  }, [props.match.params.id, dispatch]); // se especifican las dependencias de useEffect, en este caso el id y el dispatch

  // se utiliza useSelector para acceder al estado global y se obtiene el detalle del pais.
  const country = useSelector((state) => state.detail);

  // se crea una funcion que se ejecuta cuando se hace click en el boton eliminar actividad.
  function handleClick(id) {
    // se ejecuta la accion deleteActivity y se le pasa el id de la actividad como parametro.
    dispatch(deleteActivity(id));
    alert("La actividad fue eliminada");
    history.push("/countries"); // se redirecciona a la ruta /countries
  }

  return (
    <div>
      {country ? (
        <div className={style.container}>
          <div className={style.detail}>
            <CountryDetail
              key={country.id}
              image={country.image}
              name={country.name}
              id={country.id}
              continent={country.continent}
              subregion={country.subregion}
              capital={country.capital}
              area={country.area}
              population={country.population}
            />
          </div>
          <div className={style.activity}>
            <img key="img" src={country.image} alt="imagen" />
            <h1 key="act">Actividades Turísticas</h1>
            {country.activities && country.activities.length > 0 ? (
              country.activities.map((el) => {
                return (
                  <div key={el.id} className={style.detailAct}>
                    <Activity
                      id={el.id}
                      name={el.name}
                      difficulty={el.difficulty}
                      duration={el.duration}
                      season={el.season}
                      key={el.id}
                    />
                    <button onClick={() => handleClick(el.id)}>
                      Eliminar Actividad
                    </button>
                  </div>
                );
              })
            ) : (
              <h4>No hay actividades registradas</h4>
            )}
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

/* {input.paises.map((e) => (
    <ul>
        <h4>{e}</h4>  
        <button onClick={()=>handleDelete(e)}>X</button>
    </ul>                          
    ))}    */
