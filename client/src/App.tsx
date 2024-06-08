import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Loading from "./components/Loading";
import MainLayout from "./layouts/MainLayout";
import NotFound from "./pages/NotFound";
import { routes } from "./routes/routes";

function App() {
  return (
    <>
      <React.Suspense fallback={<Loading />}>
        <Routes>
          <Route element={<MainLayout />}>
            {routes &&
              routes.length > 0 &&
              routes.map(({ path, element }) => (
                <Route key={path} path={path} element={element}></Route>
              ))}
          </Route>
          <Route path="/" element={<Navigate to="/landing-page" replace />} />
          <Route path={"*"} element={<NotFound />}></Route>
        </Routes>
      </React.Suspense>
    </>
  );
}

export default App;
