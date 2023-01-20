// Importa la librería React para poder utilizar componentes de React.
import React from "react";

// Importa el componente Link de react-router-dom para poder utilizar enlaces dentro de la aplicación.
import { Link } from "react-router-dom";

// Importa un archivo de estilos CSS para dar estilo al componente.
import style from "./Landing.module.css";

// Crea un componente de función llamado Landing que no recibe parámetros.
// Crea un contenedor con una clase que permite aplicar estilos CSS.
// Muestra un título con el nombre de la aplicación.
// Crea un enlace que redirige al usuario a la ruta "/countries" de la aplicación.
// Crea un botón con una clase que permite aplicar estilos CSS y con el texto "Let's go...".

export default function Landing() {
  return (
    <div className={style.container}>
      <h1 className={style.title}>Countries App</h1>
      <Link to="/countries">
        <button className={style.btn}>Let's go...</button>
      </Link>
    </div>
  );
}
