import React from "react";

export default function OrderBy({ handleOrderFilter, handleClickFiltrar }) {
  return (
    <div className="order-by">
      <div className="alfabetic-filter">
        <label>Alfabético:</label>
        <select name="alfabeticFilter" onChange={handleOrderFilter}>
          <option value="ascendente">Ascendente</option>
          <option value="descendente">Descendente</option>
        </select>
      </div>
      <div className="attribute-filter">
        <label>Atributo:</label>
        <select name="attributeFilter" onChange={handleOrderFilter}>
          <option value="nombre">Nombre</option>
          <option value="poblacion">Población</option>
        </select>
      </div>
      <button onClick={handleClickFiltrar}>Filtrar</button>
    </div>
  );
}
