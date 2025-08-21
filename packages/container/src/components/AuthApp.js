import { mount } from "auth/AuthApp";
import React, { useRef, useEffect } from "react";
import { useHistory } from "react-router-dom";

export default function AuthApp({ onSignIn }) {
  const ref = useRef(null);
  const history = useHistory();

  const onSignInHandler = () => {
    onSignIn();
    if (
      history.location.pathname === "/auth/signin" ||
      history.location.pathname === "/auth/signup"
    ) {
      history.push("/dashboard");
    }
  };

  useEffect(() => {
    console.log("AuthApp mounted");
    const { onParentNavigate } = mount(ref.current, {
      onNavigate: ({ pathname: nextPathname }) => {
        const { pathname } = history.location;
        if (pathname !== nextPathname) {
          history.push(nextPathname);
        }
      },
      initialPath: history.location.pathname,
      onSignIn: onSignInHandler,
    });
    history.listen(onParentNavigate);
  }, []);

  return <div ref={ref} />;
}
