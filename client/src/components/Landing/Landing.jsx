import React from "react";
import { Link } from "react-router-dom";
import style from "./Landing.module.css";

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
