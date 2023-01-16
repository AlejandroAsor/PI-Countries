import React from "react";
import style from "../ActivityCreate/ActivityCreate.module.css";
import FormError from "../Form/FormError";

// FormInput component
const FormInput = (props) => {
  const { inputName, inputValue, handleChange, error } = props;
  return (
    <div className={style.inputContainer}>
      <h3>{inputName}:</h3>
      <input
        type="text"
        value={inputValue}
        name={inputName}
        onChange={handleChange}
      ></input>
      <FormError error={error} />
    </div>
  );
};
export default FormInput;
