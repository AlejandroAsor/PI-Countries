//importa el archivo de estilos para la aplicación
import "./App.css";

// importa los componentes necesarios de react-router-dom para manejar las rutas de la aplicación
import { BrowserRouter, Route } from "react-router-dom";

// importa react
import React from "react";

// importa los componentes necesarios para la aplicación
import Landing from "./components/Landing/Landing";
import NavBar from "./components/NavBar/NavBar";
import Home from "./components/Home/Home";
import ActivityCreate from "./components/ActivityCreate/ActivityCreate";
import Detail from "./components/Detail/Detail";

// función que renderiza el componente App
// el componente App es el componente principal de la aplicación
// el componente App contiene las rutas de la aplicación
// el componente App contiene el componente NavBar que se renderiza en todas las rutas excepto en la raíz
// el componente App contiene el componente Landing que se renderiza en la ruta raíz
// el componente App contiene el componente Home que se renderiza en la ruta /countries
// el componente App contiene el componente Detail que se renderiza en la ruta /countries/:id
// el componente App contiene el componente ActivityCreate que se renderiza en la ruta /activity
function App() {
  return (
    <BrowserRouter>
      <React.Fragment>
        <Route exact path="/" component={Landing} />
        <Route
          path="/"
          render={(props) => {
            if (props.location.pathname !== "/") {
              return <NavBar {...props} />;
            }
            return null;
          }}
        />{" "}
        <Route exact path="/countries" component={Home} />
        <Route path="/countries/:id" component={Detail} />
        <Route path="/activity" component={ActivityCreate} />
      </React.Fragment>
    </BrowserRouter>
  );
}
// se exporta el componente App para poder ser utilizado en otros archivos de la aplicación.
export default App;
