import { Routes, Route } from "react-router-dom";
import RootLayout from "./shared/ui/RootLayout";
import { ItemsPage } from "./pages/ItemsPage/ItemsPage";
import { RegistrationItemsPage } from "./pages/RegistrationItemsPage/RegistrationItems";

function App() {
  return (
    <Routes>
      {/* <Route
        path="/"
        element={
          <RootLayout>
            <LandingPage />
          </RootLayout>
        }
      /> */}
      <Route
        path="/items"
        element={
          <RootLayout>
            <ItemsPage />
          </RootLayout>
        }
      />
      <Route
        path="/registration"
        element={
          <RootLayout>
            <RegistrationItemsPage />
          </RootLayout>
        }
      />
    </Routes>
  );
}

export default App;
