import React from "react";
import { Link } from "react-router-dom";
import style from "./NavBar.module.css";

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
