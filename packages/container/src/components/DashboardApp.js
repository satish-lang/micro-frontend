import { mount } from "dashboard/DashboardApp";
import React, { useRef, useEffect } from "react";

export default function DashboardApp() {
  const ref = useRef(null);

  useEffect(() => {
    console.log("Dashboard mounted");
    mount(ref.current);
  }, []);

  return <div ref={ref} />;
}
