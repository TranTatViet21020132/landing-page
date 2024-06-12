import React from "react";
import { Route, Routes } from "react-router-dom";
import Loading from "./components/Loading";
import MainLayout from "./layouts/MainLayout";
import NotFound from "./pages/NotFound";
import { routes } from "./routes/routes";
import FormProvider from "./context/formContext";

function App() {
  return (
    <>
      <FormProvider>
        <React.Suspense fallback={<Loading />}>
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
    </>
  );
}

export default App;
