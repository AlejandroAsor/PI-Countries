// importa la librería React
import React from "react";

// importa el componente Link de react-router-dom
import { Link } from "react-router-dom";

// importa el archivo NavBar.module.css
import style from "./NavBar.module.css";

// Crea un elemento div con una clase específica para dar estilo al contenedor.
// Crea un elemento h3 con el texto "PI-Countries".
// Crea un elemento Link de react-router-dom con una ruta específica.
// Crea un botón con una clase específica para dar estilo al botón y el texto "Home".
// Crea un elemento Link de react-router-dom con una ruta específica.
// Crea un botón con una clase específica para dar estilo al botón y el texto "Nueva Actividad".
export default function NavBar() {
  return (
    <div className={style.container}>
      <h3>PI-Countries</h3>
      <Link to="/countries">
        <button className={style.btnHome}>Home</button>
      </Link>
      <Link to="/activity">
        <button className={style.btnActividad}>Nueva Actividad</button>
      </Link>
    </div>
  );
}
