import { Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router";
import AuthLayout from "./layouts/auth";
import PublicLayout from "./layouts/public";

const App = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<>Loading...</>}>
        <Routes>
          {false ? (
            <Route path="*" element={<AuthLayout />} />
          ) : (
            <Route path="*" element={<PublicLayout />} />
          )}
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
