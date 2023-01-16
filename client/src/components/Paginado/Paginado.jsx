import React from "react";
import style from "./Paginado.module.css";

export default function Paginado({ countriesPerPage, allCountries, paginado }) {
  const pageNumbers = [];
  if (countriesPerPage === 9) countriesPerPage = 10;
  for (let i = 0; i < Math.round(allCountries / countriesPerPage); i++) {
    pageNumbers.push(i + 1);
  }

  return (
    <nav className={style.container}>
      <ul className={style.paginacion}>
        {pageNumbers &&
          pageNumbers.map((number) => {
            return (
              <li key={number}>
                <a onClick={() => paginado(number)} href={`countries#${number}`}>
                  {number}
                </a>
              </li>
            );
          })}
      </ul>
    </nav>
  );
}
