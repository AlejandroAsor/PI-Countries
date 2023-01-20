// importa el módulo de React para poder utilizar componentes de React y el hook "useState" de React para poder utilizar el estado en el componente.
import React, { useState } from "react";

// importa el hook "useDispatch" de "react-redux" para poder enviar acciones al almacén de Redux.
import { useDispatch } from "react-redux";

// importa la acción "getNameCountry" del archivo "index.js" de la carpeta "actions" para poder enviar la acción al almacén de Redux.
import { getNameCountry } from "../../actions/index";

// importa un archivo de estilos CSS para dar estilo al componente.
import style from "./SearchBar.module.css";

export default function SearchBar({ paginado }) {
  // Utiliza el hook "useDispatch" para obtener una función "dispatch" que se usa para enviar acciones al almacén de Redux.
  const dispatch = useDispatch();

  // Utiliza el hook "useState" para crear un estado para el nombre ingresado en el campo de texto. El valor inicial es una cadena vacía.
  const [name, setName] = useState("");

  // define una función que se activa cuando se escribe en el campo de texto. Recibe un evento "e" como parámetro.
  function handleInputChange(e) {
    // evita la acción predeterminada del evento, en este caso, evita que la página se recargue al escribir en el campo de texto.
    e.preventDefault();
    // utiliza la función "setName" para actualizar el estado del nombre con el valor actual del campo de texto.
    setName(e.target.value);
  }

  // define una función que se activa al hacer clic en el botón "Buscar". Recibe un evento "e" como parámetro.
  function handleSubmit(e) {
    // si el nombre no esta vacío
    if (name) {
      // evita la acción predeterminada del evento, en este caso, evita que la página se recargue al hacer clic en el botón "Buscar".
      e.preventDefault();
      // envía la acción "getNameCountry" al almacén de Redux con el nombre actual como parámetro.
      dispatch(getNameCountry(name));
      // limpia el estado del nombre.
      setName("");
      // llama a una función "paginado" que se utiliza para mostrar el resultado en la primera página.
      paginado(1);
    }
    // si el nombre esta vacío
    else {
      alert("Debe ingresar un nombre");
    }
  }
  // retorna el componente.
  // Crea un div con una clase "container" para darle estilo al componente.

  // Crea un campo de texto con un placeholder, un valor inicial igual al estado del nombre y un evento onChange que ejecuta la función handleInputChange cuando el valor del campo cambia.

  // Crea un botón con un tipo submit y un evento onClick que ejecuta la función handleSubmit cuando se hace clic en el botón. El texto del botón es "Buscar".
  return (
    <div className={style.container}>
      <input
        type="text"
        placeholder="Buscar..."
        value={name}
        onChange={(e) => handleInputChange(e)}
      ></input>
      <button type="submit" onClick={(e) => handleSubmit(e)}>
        Buscar
      </button>
    </div>
  );
}
