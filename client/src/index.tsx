import { StrictMode } from "react";
import ReactDOM from "react-dom";
import { HashRouter as Router, Redirect, Route } from "react-router-dom";

import { App } from "./App";
import "./index.css";

ReactDOM.render(
  <StrictMode>
    <Router>
      <Route path="/" exact={true}>
        <Redirect to="/1" />
      </Route>
      <App />
    </Router>
  </StrictMode>,
  document.querySelector("#root"),
);
