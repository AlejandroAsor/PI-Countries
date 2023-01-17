import React from "react";
import style from "../ActivityCreate/ActivityCreate.module.css";
import FormError from "./FormError";

const SelectedCountries = (props) => {
  const { countries } = props;
  return (
    <div className={style.selectedCountriesContainer}>
      {countries.map((country) => (
        <ul key={country.id}>{country.name}</ul>
      ))}
    </div>
  );
};
export default SelectedCountries;
