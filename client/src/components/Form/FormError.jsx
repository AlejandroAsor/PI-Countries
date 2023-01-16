import React from "react";
import style from "../ActivityCreate/ActivityCreate.module.css";
const FormError = (props) => {
  const { error } = props;
  return error && <p>{error}</p>;
};

export default FormError;
