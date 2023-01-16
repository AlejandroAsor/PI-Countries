import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getNameCountry } from "../../actions/index";
import style from "./SearchBar.module.css";

export default function SearchBar({ paginado }) {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  function handleInputChange(e) {
    e.preventDefault();
    setName(e.target.value);
  }

  function handleSubmit(e) {
    if (name) {
      e.preventDefault();
      dispatch(getNameCountry(name));
      setName("");
      paginado(1); //para que muestre el resultado en pagina 1
    } else {
      alert("Debe ingresar un nombre");
    }
  }

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
