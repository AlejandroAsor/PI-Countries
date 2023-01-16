import React from "react";
import style from "../ActivityCreate/ActivityCreate.module.css";
import FormError from "../Form/FormError";

const FormSelect = (props) => {
  const { options, handleChange, selectedOption, error } = props;
  return (
    <div className={style.selectContainer}>
      <h3>{selectName}:</h3>
      <select value={selectedOption} name={selectName} onChange={handleChange}>
        <option value="Elegir Temporada">Elegir Temporada</option>
        {options.map((option) => {
          return (
            <option key={option.id} value={option.name}>
              {option.name}
            </option>
          );
        })}
      </select>
      <FormError error={error} />
    </div>
  );
};
export default FormSelect;
