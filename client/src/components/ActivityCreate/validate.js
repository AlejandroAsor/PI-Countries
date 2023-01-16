export function validate(input) {
  let errors = {};
  if (!input.name) {
    errors.name = "Debe ingresar un nombre";
  } else if (!/[A-Za-z0-9]/.test(input.name)) {
    errors.name = "El nombre admite solo letras, numeros y espacios";
  } else if (!input.difficulty) {
    errors.difficulty = "Debe ingresar un valor entre 1 y 5";
  } else if (input.difficulty < 1 || input.difficulty > 5) {
    errors.difficulty = "Debe ingresar un valor entre 1 y 5";
  } else if (!input.duration) {
    errors.duration = "Debe ingresar la duración en horas";
  } else if (input.duration < 0 || input.duration > 24) {
    errors.duration = "La duración debe ser de 1 a 24 horas";
  } else if (!input.season) {
    errors.season = "Debe seleccionar una temporada";
  } else if (input.paises.length === 0) {
    errors.paises = "Debe seleccionar al menos un país";
  }
  return errors;
}
