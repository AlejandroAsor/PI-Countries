// se importa react
import React from "react";

// se importa los estilos CSS
import style from "../ActivityCreate/ActivityCreate.module.css";

function Form(props) {
  // your JSX code here
  const handleChange = props.handleChange; // Asigna la función handleChange a una constante para poder usarla en el código.
  const handleSelect = props.handleSelect; // Asigna la función handleSelect a una constante para poder usarla en el código.
  const handleSubmit = props.handleSubmit; //
  const handleDelete = props.handleDelete; // Asigna la función handleDelete a una constante para poder usarla en el código.
  const { input, errors, countries } = props; // Desestructura las propiedades input, errors, y countries del objeto props para poder acceder a ellas en el código.

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
                value={input.difficulty}
                name="difficulty"
                onChange={(e) => handleChange(e)}
              ></input>
            </div>
            <div className={style.errors}>
              {errors.difficulty && <p>{errors.difficulty}</p>}
            </div>

            <div className={style.duration}>
              <h3>Duración:</h3>
              <input
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

// se exporta el componente
export default Form;

/*
  const handleChange = props.handleChange;: Asigna la función handleChange a una constante para poder usarla en el código.
const handleSelect = props.handleSelect;: Asigna la función handleSelect a una constante para poder usarla en el código.
const handleSubmit = props.handleSubmit;: Asigna la función handleSubmit a una constante para poder usarla en el código.
const handleDelete = props.handleDelete;: Asigna la función handleDelete a una constante para poder usarla en el código.
const { input, errors, countries } = props;: Desestructura las propiedades input, errors, y countries del objeto props para poder acceder a ellas en el código.
<form onSubmit={(e) => handleSubmit(e)}>: Crea un formulario que al ser enviado llama a la función handleSubmit pasando el evento como argumento.
<input type="text" value={input.name} name="name" onChange={(e) => handleChange(e)}>: Crea un input de tipo texto, con el valor actual de input.name, el nombre "name" y un evento onChange que al ser activado llama a la función handleChange pasando el evento como argumento.
<div className={style.errors}>{errors.name && <p>{errors.name}</p>}</div>: Crea un div con la clase style.errors, si hay algún error en el nombre se muestra en un párrafo dentro de este div.
<select value={input.season} name="season" onChange={(e) => handleChange(e)}>: Crea un select con el valor actual de input.season, el nombre "season" y un evento onChange que al ser activado llama a la función handleChange pasando el evento como argumento.
<select onChange={(e) => handleSelect(e)}>: Crea un select con un evento onChange que al ser activado llama a la función handleSelect pasando el evento como argumento.
<button>Crear Actividad</button>: Crea un botón con el texto "Crear Actividad" que al ser presionado envia el formulario.
<button onClick={() => handleDelete(e)}>X</button>: Crea un botón con un evento onClick que al ser activado llama a la función handleDelete pasando el nombre del país como argumento.
*/
