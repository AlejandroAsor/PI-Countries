// importa react
import React from "react";

export default function CountryDetail({
  // se exporta el componente de funcion CountryDetail y se le pasa como parametro un objeto con las propiedades
  image,
  name,
  id,
  continent,
  subregion,
  capital,
  area,
  population,
}) {
  return (
    // se retorna el componente de funcion CountryDetail
    <div className="detail">
      <img src={image} alt={image} />
      <h1>{name}</h1>
      <h2>{continent}</h2>
      <h3>{id}</h3>
      <h3>Subregion: {subregion}</h3>
      <h3>Capital: {capital}</h3>
      <h3>Area: {area} km2</h3>
      <h3>Población: {population} personas</h3>
    </div>
  );
}
/* 
{
 <h3>Población: {population && (population/1000).toFixex(2)} Millones de personas</h3> 
}
*/
