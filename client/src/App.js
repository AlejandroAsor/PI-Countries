import "./App.css";
import { BrowserRouter, Route } from "react-router-dom";
import React from "react";
import Landing from "./components/Landing/Landing";
import NavBar from "./components/NavBar/NavBar";
import Home from "./components/Home/Home";
import ActivityCreate from "./components/ActivityCreate/ActivityCreate";
import Detail from "./components/Detail/Detail";

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

export default App;
