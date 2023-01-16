import React from "react";
import style from "../ActivityCreate/ActivityCreate.module.css";

function Form(props) {
  // your JSX code here
  const handleChange = props.handleChange;
  const handleSelect = props.handleSelect;
  const handleSubmit = props.handleSubmit;
  const handleDelete = props.handleDelete;
  const { input, errors, countries } = props;
  return (
    <div className={style.container}>
      <div className={style.card}>
        <div className={style.title}>
          <h2>Crear Actividad Turística</h2>
        </div>

        <div className={style.form}>
          <form onSubmit={(e) => handleSubmit(e)}>
            <div className={style.name}>
              <h3>Nombre:</h3>
              <input
                type="text"
                value={input.name}
                name="name"
                onChange={(e) => handleChange(e)}
              ></input>
            </div>
            <div className={style.errors}>
              {errors.name && <p>{errors.name}</p>}
            </div>

            <div className={style.difficulty}>
              <h3>Dificultad:</h3>
              <input
                type="number"
                value={input.difficulty}
                name="difficulty"
                min="1"
                max="5"
                onChange={(e) => handleChange(e)}
              ></input>
            </div>
            <div className={style.errors}>
              {errors.difficulty && <p>{errors.difficulty}</p>}
            </div>

            <div className={style.duration}>
              <h3>Duración:</h3>
              <input
                type="text"
                value={input.duration}
                name="duration"
                onChange={(e) => handleChange(e)}
              ></input>
            </div>
            <div className={style.errors}>
              {errors.duration && <p>{errors.duration}</p>}
            </div>

            <div className={style.season}>
              <h3>Temporada:</h3>
              <select
                value={input.season}
                name="season"
                onChange={(e) => handleChange(e)}
              >
                <option value="Elegir Temporada">Elegir Temporada</option>
                <option value="Verano">Verano</option>
                <option value="Otoño">Otoño</option>
                <option value="Invierno">Invierno</option>
                <option value="Primavera">Primavera</option>
              </select>
            </div>
            <div className={style.errors}>
              {errors.season && <p>{errors.season}</p>}
            </div>
            <div className={style.countries}>
              <h3>Paises:</h3>
              <select onChange={(e) => handleSelect(e)}>
                <option value="Elegir País">Elegir País</option>
                {/* <option disabled selected>Elegir País</option> */}
                {countries.map((c) => {
                  return (
                    <option key={c.id} value={c.name}>
                      {c.name}
                    </option>
                  ); //ordenar por orden alfabetico
                })}
              </select>
            </div>
            <div className={style.errors}>
              {input.paises.length === 0 && <p>{errors.paises}</p>}
            </div>

            <div className={style.btn}>
              <button>Crear Actividad</button>
            </div>
          </form>
        </div>
      </div>

      <div className={style.countrySelected}>
        {input.paises.map((e) => (
          <ul>
            <h4>{e}</h4> {/* li */}
            <button onClick={() => handleDelete(e)}>X</button>
          </ul>
        ))}
      </div>
    </div>
  );
}

export default Form;
