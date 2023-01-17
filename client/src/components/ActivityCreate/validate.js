export function validate(input) {
  let errors = {};
  if (!input.name) {
    errors.name = "Debe ingresar un nombre";
  } else if (!/[A-Za-z0-9]/.test(input.name)) {
    errors.name = "El nombre admite solo letras, numeros y espacios";
  } else if (input.name.length < 3) {
    errors.name = "El nombre debe tener al menos 3 caracteres";
  } else if (input.name.length > 25) {
    errors.name = "El nombre no puede ser mayor a 25 caracteres";
  } else if (
    !input.difficulty ||
    input.difficulty < 1 ||
    input.difficulty > 5 ||
    input.difficulty.length > 1
  ) {
    errors.difficulty = "Debe ingresar un valor entre 1 y 5 (numeros enteros)";
  } else if (!input.duration || input.duration < 1 || input.duration > 9) {
    errors.duration = "La duración debe ser de 1 a 9 horas";
  } else if (input.duration.length > 1) {
    errors.duration = "La duración debe ser en horas (numeros enteros)";
  } else if (!input.season) {
    errors.season = "Debe seleccionar una temporada";
  } else if (input.paises.length === 0) {
    errors.paises = "Debe seleccionar al menos un país";
  }
  return errors;
}
