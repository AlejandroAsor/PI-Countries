import React, { useState, useEffect } from "react"; // importa React, useState y useEffect desde la biblioteca react.
import { useHistory } from "react-router-dom"; // importa useHistory desde react-router-dom.
import { getCountries, postActivity } from "../../actions"; // importa las acciones getCountries y postActivity desde un archivo específico.
import { useDispatch, useSelector } from "react-redux"; // importa useDispatch y useSelector desde react-redux.
import Form from "../Form/Form"; // importa un componente llamado Form y una función llamada validate desde archivos específicos.
import { validate } from "./validate";

export default function ActivityCreate() {
  const dispatch = useDispatch(); // Se utiliza el hook useDispatch para poder ejecutar acciones
  const history = useHistory(); // el hook useHistory para navegar a través de la aplicación.

  const countries = useSelector((state) => state.countries); // Se utiliza el hook useSelector para acceder al estado de la aplicación.
  const alertas = useSelector((state) => state.alertas); // Se utiliza el hook useSelector para acceder al estado de la aplicación.

  const [errors, setErrors] = useState({}); // Se utiliza el hook useState para manejar el estado de los errores.

  const [input, setInput] = useState({
    /// Se utiliza el hook useState para manejar el estado de los inputs.
    name: "",
    difficulty: "",
    duration: "",
    season: "",
    paises: [],
  });

  useEffect(() => {
    // Se utiliza el hook useEffect para ejecutar una función cuando se renderiza el componente.
    dispatch(getCountries()); // Se ejecuta la acción getCountries.
  }, [dispatch]); // Se ejecuta la acción getCountries cuando se renderiza el componente.

  function handleChange(e) {
    //  Se crea una función que maneja los cambios en los inputs.
    if (e.target.value !== "Elegir Temporada") {
      // Si el valor del input es diferente a "Elegir Temporada" se ejecuta el código de abajo.
      setInput({
        // Se actualiza el estado de los inputs.
        ...input,
        [e.target.name]: e.target.value, // Se actualiza el valor del input que se está modificando.
      });
      // Se actualiza el estado de los errores.
      setErrors(
        // Se ejecuta la función validate con los nuevos valores de los inputs.
        validate({
          ...input,
          [e.target.name]: e.target.value,
        })
      );
    }
  }
  // Se crea una función que maneja los cambios en los inputs.
  function handleSelect(e) {
    if (e.target.value !== "Elegir País") {
      // Si el valor del input es diferente a "Elegir País" se ejecuta el código de abajo.
      if (input.paises.length >= 10) {
        // Si el array de países tiene más de 10 elementos se ejecuta el código de abajo.
        alert("No puede seleccionar más de 10 países."); // Se muestra un mensaje de alerta.
      } else if (input.paises.includes(e.target.value)) {
        // Si el array de países incluye el país seleccionado se ejecuta el código de abajo.
        alert("Ya ha seleccionado este país."); // Se muestra un mensaje de alerta.
      } else {
        setInput({
          // Se actualiza el estado de los inputs.
          ...input,
          paises: [...input.paises, e.target.value],
        });
        setErrors(
          // Se actualiza el estado de los errores.
          validate({ ...input, paises: [...input.paises, e.target.value] })
        );
      }
    }
  }

  // Se crea una función que maneja el envío del formulario.
  function handleSubmit(e) {
    e.preventDefault();
    // Si el objeto de errores no está vacío o si el nombre, la dificultad, la duración, la temporada o el array de países están vacíos se ejecuta el código de abajo.
    if (
      JSON.stringify(errors) !== "{}" ||
      (input.name === "" &&
        (input.difficulty === "") & (input.duration === "") &&
        input.season === "" &&
        input.paises.length < 1)
    ) {
      // Se muestra un mensaje de alerta.
      alert("Verifique los datos ingresados");
    } else if (JSON.stringify(errors) === "{}") {
      // Si el objeto de errores está vacío se ejecuta el código de abajo.
      dispatch(postActivity(input)); // Se ejecuta la acción postActivity con los datos del formulario.

      console.log(alertas);
      // Se actualiza el estado de los inputs.
      setInput({
        name: "",
        difficulty: "",
        duration: "",
        season: "",
        paises: [],
      });
      // Se muestra un mensaje de alerta.
      setTimeout(() => {
        // Se ejecuta la función setTimeout para que se muestre el mensaje de alerta por 1 segundo.
        history.push("/countries"); //
      }, 1000); // Se ejecuta la función setTimeout para que se muestre el mensaje de alerta por 1 segundo.
    }
  }
  // Se crea una función que maneja la eliminación de países.
  function handleDelete(e) {
    // Se actualiza el estado de los inputs.
    setInput({
      // Se actualiza el estado de los inputs.
      ...input,
      //
      paises: input.paises.filter((c) => c !== e),
    });
    // Se actualiza el estado de los errores.
    setErrors(
      // Se ejecuta la función validate con los nuevos valores de los inputs.
      validate({
        ...input,
        paises: input.paises.filter((c) => c !== e),
      })
    );
  }

  // Se retorna el componente Form con las propiedades necesarias.
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
