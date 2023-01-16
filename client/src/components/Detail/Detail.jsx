import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getDetail, deleteActivity } from "../../actions/index";
import Activity from "../Activity/Activity";
import CountryDetail from "../Country/CountryDetail";
import style from "./Detail.module.css";

export default function Detail(props) {
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(getDetail(props.match.params.id));
  }, [props.match.params.id, dispatch]);

  const country = useSelector((state) => state.detail);

  function handleClick(id) {
    dispatch(deleteActivity(id));
    alert("La actividad fue eliminada");
    history.push("/countries");
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

/* {this.props.movies.map(m => 
    <li>
      {m.title} 
      <button onClick={() => this.props.removeMovieFavorite({id: m.id})}>X</button>
    </li>)}
</ul> */

/* {input.paises.map((e) => (
    <ul>
        <h4>{e}</h4>  
        <button onClick={()=>handleDelete(e)}>X</button>
    </ul>                          
    ))}    */
