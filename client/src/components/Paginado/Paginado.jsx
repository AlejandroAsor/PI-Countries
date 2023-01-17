import React from "react";
import style from "./Paginado.module.css";

export default function Paginado({ countriesPerPage, allCountries, paginado }) {
  const pageNumbers = [];
  for (let i = 0; i < Math.round(allCountries / countriesPerPage + 1); i++) {
    if (i === 26) break;
    pageNumbers.push(i + 1);
  }

  return (
    <nav className={style.container}>
      <ul className={style.paginacion}>
        {pageNumbers &&
          pageNumbers.map((number) => {
            return (
              <li key={number}>
                <a
                  onClick={() => paginado(number)}
                  href={`countries#${number}`}
                >
                  {number}
                </a>
              </li>
            );
          })}
      </ul>
    </nav>
  );
}
