import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { createMemoryHistory, createBrowserHistory } from "history";

export const mount = (el, { onNavigate, defaultHistory, initialPath }) => {
  if (el) {
    const history =
      defaultHistory ||
      createMemoryHistory({
        initialEntries: [initialPath],
      });
    if (onNavigate) {
      history.listen(onNavigate);
    }
    ReactDOM.render(<App history={history} />, el);
    return {
      onParentNavigate: ({ pathname: nextPathname }) => {
        const { pathname } = history.location;
        if (pathname !== nextPathname) {
          history.push(nextPathname);
        }
      },
    };
  }
};

if (process.env.NODE_ENV === "development") {
  const el = document.querySelector("#dev-marketing");
  if (el) {
    mount(el, { defaultHistory: createBrowserHistory() });
  }
}
