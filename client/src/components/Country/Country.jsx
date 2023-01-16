import React from "react";
import style from "./Country.module.css";

export default function Country({ name, image, continent }) {
  return (
    <div className={style.card}>
      <img src={image} alt="img not found" />
      <h3>{name}</h3>
      <h5>{continent}</h5>
    </div>
  );
}
