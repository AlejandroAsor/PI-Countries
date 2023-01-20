// importa la funcion createStore y applyMiddleware de redux
import { createStore, applyMiddleware } from "redux";

// importa la funcion composeWithDevTools de redux-devtools-extension
import { composeWithDevTools } from "redux-devtools-extension";

// importa el middleware thunk
import thunk from "redux-thunk";

// importa el rootReducer desde el archivo de reducer
import rootReducer from "../reducer";

// crea el store con el rootReducer y el middleware thunk
const store = createStore(
  // le pasa el rootReducer como primer argumento
  rootReducer,
  // utiliza composeWithDevTools para habilitar la extensión de desarrollador de Redux y aplica el middleware thunk
  composeWithDevTools(applyMiddleware(thunk))
);
// exporta la store creada como default.
export default store;
