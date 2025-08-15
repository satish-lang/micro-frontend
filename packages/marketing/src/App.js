import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Switch, Route } from "react-router-dom";
import { StylesProvider } from "@material-ui/core/styles";
import Landing from "./components/Landing";
import Pricing from "./components/Pricing";

export default function App() {
  return (
    <StylesProvider>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Landing} />
          <Route path="/pricing" exact component={Pricing} />
        </Switch>
      </BrowserRouter>
    </StylesProvider>
  );
}
