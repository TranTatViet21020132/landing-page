import React from "react";
import { Route, Routes } from "react-router-dom";
import LoadingPage from "./pages/LoadingPage";
import MainLayout from "./layouts/MainLayout";
import NotFound from "./pages/NotFoundPage";
import { routes } from "./routes/routes";
import FormProvider from "./context/formContext";

function App() {
  return (
    <React.Fragment>
      <FormProvider>
        <React.Suspense fallback={<LoadingPage />}>
          <Routes>
            <Route element={<MainLayout />}>
              {routes &&
                routes.length > 0 &&
                routes.map(({ path, element }) => (
                  <Route key={path} path={path} element={element}></Route>
                ))}
            </Route>
            <Route path={"*"} element={<NotFound />}></Route>
          </Routes>
        </React.Suspense>
      </FormProvider>
    </React.Fragment>
  );
}

export default App;
