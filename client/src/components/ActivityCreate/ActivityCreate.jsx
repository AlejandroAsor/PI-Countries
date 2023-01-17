import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { getCountries, postActivity } from "../../actions";
import { useDispatch, useSelector } from "react-redux";
import style from "./ActivityCreate.module.css";
import Form from "../Form/Form";

import { validate } from "./validate";

export default function ActivityCreate() {
  const dispatch = useDispatch();
  const history = useHistory();

  const countries = useSelector((state) => state.countries);
  const alertas = useSelector((state) => state.alertas);

  const [errors, setErrors] = useState({});

  const [input, setInput] = useState({
    name: "",
    difficulty: "",
    duration: "",
    season: "",
    paises: [],
  });

  useEffect(() => {
    dispatch(getCountries());
  }, [dispatch]);

  function handleChange(e) {
    if (e.target.value !== "Elegir Temporada") {
      setInput({
        ...input,
        [e.target.name]: e.target.value,
      });

      setErrors(
        validate({
          ...input,
          [e.target.name]: e.target.value,
        })
      );
    }
  }
  function handleSelect(e) {
    if (e.target.value !== "Elegir País") {
      if (input.paises.length >= 10) {
        alert("No puede seleccionar más de 10 países.");
      } else if (input.paises.includes(e.target.value)) {
        alert("Ya ha seleccionado este país.");
      } else {
        setInput({
          ...input,
          paises: [...input.paises, e.target.value],
        });
        setErrors(
          validate({ ...input, paises: [...input.paises, e.target.value] })
        );
      }
    }
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (
      JSON.stringify(errors) !== "{}" ||
      (input.name === "" &&
        (input.difficulty === "") & (input.duration === "") &&
        input.season === "" &&
        input.paises.length < 1)
    ) {
      alert("Verifique los datos ingresados");
    } else if (JSON.stringify(errors) === "{}") {
      dispatch(postActivity(input));

      console.log(alertas);

      setInput({
        name: "",
        difficulty: "",
        duration: "",
        season: "",
        paises: [],
      });

      setTimeout(() => {
        history.push("/countries");
      }, 1000);
    }
  }

  function handleDelete(e) {
    setInput({
      ...input,
      paises: input.paises.filter((c) => c !== e),
    });

    setErrors(
      validate({
        ...input,
        paises: input.paises.filter((c) => c !== e),
      })
    );
  }

  return (
    <Form
      handleChange={handleChange}
      handleSelect={handleSelect}
      handleSubmit={handleSubmit}
      handleDelete={handleDelete}
      input={input}
      errors={errors}
      countries={countries}
      alertas={alertas}
    />
  );
}
