import React, { lazy, Suspense, useState } from "react";
import Header from "./components/Header";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import {
  StylesProvider,
  createGenerateClassName,
} from "@material-ui/core/styles";
import Progress from "./components/Progress";

const generateClassName = createGenerateClassName({
  productionPrefix: "co",
});

const MarketingApp = lazy(() =>
  import(/* webpackChunkName: "marketing-app" */ "./components/MarketingApp")
);
const AuthApp = lazy(() =>
  import(/* webpackChunkName: "auth-app" */ "./components/AuthApp")
);

export default function App() {
  const [signedIn, setSignedIn] = useState(false);
  return (
    <StylesProvider generateClassName={generateClassName}>
      <BrowserRouter>
        <div>
          <Header signedIn={signedIn} onSignOut={() => setSignedIn(false)} />
          <Suspense fallback={<Progress />}>
            <Switch>
              <Route
                path="/auth"
                component={() => <AuthApp onSignIn={() => setSignedIn(true)} />}
              />
              <Route path="/" component={MarketingApp} />
            </Switch>
          </Suspense>
        </div>
      </BrowserRouter>
    </StylesProvider>
  );
}
