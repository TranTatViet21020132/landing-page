import React from "react";
import { Route, Routes } from "react-router-dom";
import { LandingPage } from "./routes/routes";
import Loading from "./components/Loading";
import MainLayout from "./layouts/MainLayout";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <>
      <React.Suspense fallback={<Loading />}>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path={"/"} element={<LandingPage />}></Route>
          </Route>
          <Route path={"*"} element={<NotFound />}></Route>
        </Routes>
      </React.Suspense>
    </>
  );
}

export default App;
