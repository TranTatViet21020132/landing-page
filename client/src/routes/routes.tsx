import React from "react";
import { lazy } from "react";
import { Route } from "../configs/config-type";
import { FORM_PAGE_ROUTE, ROOT_ROUTE } from "./route-const";

// Example of lazy loading a component
const LandingPage = lazy(() => import("../pages/LandingPage"));
const FormPage = lazy(() => import("../pages/FormPage"));

/* Routes Component */
const routes: Route[] = [
  {
    path: ROOT_ROUTE,
    element: <LandingPage />,
  },
  {
    path: FORM_PAGE_ROUTE,
    element: <FormPage />,
  },

  // this base route should be at the end of all other routes, but not needed for this project
  {
    path: `/`,
    exact: true,
    element: <></>,
  },
];

export { routes };
