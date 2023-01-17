import React from "react";
import style from "./Paginado.module.css";

export default function Paginado({ allCountries, paginado }) {
  const pageNumbers = [];
  let cantidadPaginas = Math.ceil(allCountries / 10 + 0.1);
  for (let i = 0; i < cantidadPaginas; i++) {
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
