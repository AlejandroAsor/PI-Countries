// importa react.
import React from "react";

// importa un archivo de estilos CSS para dar estilo al componente.
import style from "./Paginado.module.css";

// define un componente que recibe como parámetro un objeto "props" que contiene las propiedades "allCountries" y "paginado".
export default function Paginado({ allCountries, paginado }) {
  // Crea un array vacío para almacenar los números de página.
  const pageNumbers = [];

  // Calcula la cantidad total de páginas necesarias para mostrar todos los países, redondeando hacia arriba si es necesario.
  let cantidadPaginas = Math.ceil(allCountries / 10 + 0.1);
  // Itera a través de la cantidad de páginas y agrega cada número de página al array pageNumbers.
  for (let i = 0; i < cantidadPaginas; i++) {
    pageNumbers.push(i + 1);
  }
  // Crea un elemento nav con una clase específica para dar estilo al contenedor.
  // Crea una lista desordenada con una clase específica para dar estilo al contenedor de los números de página.
  // Itera a través del array de números de página y crea un elemento li para cada número.
  // Crea un enlace con un evento onClick que ejecuta la función paginado con el número de página actual como parámetro. El enlace tiene una URL específica que indica la página actual. El texto del enlace es el número de página.
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
