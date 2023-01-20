// importa React
import React from "react";

// importa ReactDOM
import ReactDOM from "react-dom";

// importa el archivo de estilos
import "./index.css";

// importa el componente principal de la aplicación
import App from "./App";

// importa una funcion para medir el rendimiento de la aplicación
import reportWebVitals from "./reportWebVitals";

// importa el componente Provider de react-redux
import { Provider } from "react-redux";

// importa el store configurado
import store from "./store";

// Renderiza el componente App en el elemento con id "root" del archivo index.html
ReactDOM.render(
  // Se envuelve el componente App en el componente Provider para poder acceder al store desde cualquier componente
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
