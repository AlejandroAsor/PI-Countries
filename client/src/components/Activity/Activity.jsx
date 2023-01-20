// Importa la librería React para poder utilizar componentes de React.
import React from "react";

// Importa un archivo de estilos CSS para dar estilo al componente.
import style from "./Activity.module.css";

// Crea un componente de función llamado Activity que recibe como parámetros las propiedades name, difficulty, duration y season.

// Crea un contenedor con una clase que permite aplicar estilos CSS.
// Muestra un título con el nombre de la actividad.
// Crea un contenedor con una clase que permite aplicar estilos CSS para mostrar los datos de la actividad.
// Muestra un subtítulo con la dificultad de la actividad.
// Muestra un subtítulo con la duración de la actividad en horas.
// Muestra un subtítulo con la temporada en la que se recomienda realizar la actividad.
export default function Activity({ name, difficulty, duration, season }) {
  return (
    <div className={style.container}>
      <h3>Actividad: {name}</h3>
      <div className={style.datos}>
        <h4>Dificultad: {difficulty}</h4>
        <h4>Duración: {duration} horas</h4>
        <h4>Temporada: {season}</h4>
      </div>
    </div>
  );
}
