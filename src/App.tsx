import { Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router";
import AuthLayout from "./layouts/auth";
import PublicLayout from "./layouts/public";
import { useAppSelector } from "./store/hooks";

const App = () => {
  const { token } = useAppSelector((state) => state.auth);

  return (
    <BrowserRouter>
      <Suspense fallback={<>Loading...</>}>
        <Routes>
          {token ? (
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
