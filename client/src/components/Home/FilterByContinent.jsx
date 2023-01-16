import React from "react";

export default function FilterByContinent({ handleFilterContinent }) {
  return (
    <div className="filter-by-continent">
      <select onChange={handleFilterContinent}>
        <option value="Elegir Continente">Elegir Continente</option>
        <option value="South America">South America</option>
        <option value="North America">North America</option>
        <option value="Europe">Europe</option>
        <option value="Africa">Africa</option>
        <option value="Asia">Asia</option>
        <option value="Oceania">Oceania</option>
        <option value="Antarctica">Antarctica</option>
      </select>
    </div>
  );
}
