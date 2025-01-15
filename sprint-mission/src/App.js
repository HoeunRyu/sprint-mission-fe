import { Routes, Route } from "react-router-dom";
import RootLayout from "./shared/ui/RootLayout";
import { ItemsPage } from "./pages/ItemsPage/ItemsPage";

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
    </Routes>
  );
}

export default App;
