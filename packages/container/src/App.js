import React, { lazy, Suspense, useState, useEffect } from "react";
import Header from "./components/Header";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import { createBrowserHistory } from "history";
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
const DashboardApp = lazy(() =>
  import(/* webpackChunkName: "dashboard-app" */ "./components/DashboardApp")
);

const history = createBrowserHistory();
export default function App() {
  const [signedIn, setSignedIn] = useState(false);
  useEffect(() => {
    if (signedIn) {
      history.push("/dashboard");
    }
  }, [signedIn]);
  return (
    <StylesProvider generateClassName={generateClassName}>
      <Router history={history}>
        <div>
          <Header signedIn={signedIn} onSignOut={() => setSignedIn(false)} />
          <Suspense fallback={<Progress />}>
            <Switch>
              <Route
                path="/auth"
                component={() => <AuthApp onSignIn={() => setSignedIn(true)} />}
              />

              <Route path="/dashboard">
                {!signedIn ? <Redirect to="/" /> : <DashboardApp />}
              </Route>
              <Route path="/" component={MarketingApp} />
            </Switch>
          </Suspense>
        </div>
      </Router>
    </StylesProvider>
  );
}
