import React from "react"; // // Se importa React para poder utilizar JSX
import style from "./Country.module.css"; // Se importa el archivo de estilos CSS

// Se exporta por defecto una función que recibe como parámetros el nombre, imagen y continente del país.
// Se crea un div con una clase css "card" que se importa desde el archivo de estilos.
// Se utiliza JSX para renderizar una imagen con la url de la imagen del país y un texto alternativo en caso de no poder cargar la imagen.
// Se utiliza JSX para renderizar un título de nivel 3 con el nombre del país.
// Se utiliza JSX para renderizar un título de nivel 5 con el continente del país.
export default function Country({ name, image, continent }) {
  return (
    <div className={style.card}>
      <img src={image} alt="img not found" />
      <h3>{name}</h3>
      <h5>{continent}</h5>
    </div>
  );
}
