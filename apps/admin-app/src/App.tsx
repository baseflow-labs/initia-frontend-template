import Spinner from "@initia/shared/ui/components/core/spinner";
import NotificationsToaster from "@initia/shared/ui/components/toaster";
import { Suspense, useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router";
import { apiCatchGlobalHandler } from "@initia/shared/utils/function";

import * as MetadataApi from "./api/metadata";
import AuthLayout from "./layouts/auth";
import PublicLayout from "./layouts/public";
import { setMetadata } from "./store/actions/settings";
import { useAppSelector } from "./store/hooks";
import { useDirectionHandler } from "./utils/useDirectionHandler";

const App = () => {
  const dispatch = useDispatch();
  const { accessToken } = useAppSelector((state) => state.auth);
  const { fontSize } = useAppSelector((state) => state.settings);

  // Handle RTL/LTR direction switching
  useDirectionHandler();

  useEffect(() => {
    document.documentElement.style.setProperty("--base-font-size", fontSize + "px");
  }, [fontSize]);

  useEffect(() => {
    MetadataApi.get()
      .then((res) => {
        dispatch(setMetadata(res.payload));
      })
      .catch(apiCatchGlobalHandler);
  }, []);

  return (
    <div className="bg-secondary max-vw-100 overflow-x-hidden">
      <BrowserRouter>
        <Suspense fallback={<Spinner />}>
          <NotificationsToaster />

          <Routes>
            {accessToken !== "null" ? (
              <Route path="*" element={<AuthLayout />} />
            ) : (
              <Route path="*" element={<PublicLayout />} />
            )}
          </Routes>
        </Suspense>
      </BrowserRouter>
    </div>
  );
};

export default App;
