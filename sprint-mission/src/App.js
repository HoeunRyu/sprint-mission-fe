import { Routes, Route } from "react-router-dom";
import RootLayout from "./shared/ui/RootLayout";
import { ItemsPage } from "./pages/ItemsPage/ItemsPage";
import { RegistrationItemsPage } from "./pages/RegistrationItemsPage/RegistrationItemsPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<RootLayout />}>
        {/* 중첩된 자식 라우트 */}
        {/* <Route index element={<LandingPage />} /> */}
        <Route path="items" element={<ItemsPage />} />
        {/* <Route path="items/:id" element={<ItemDetailPage />} /> */}
        <Route path="registration" element={<RegistrationItemsPage />} />
      </Route>
    </Routes>
  );
}

export default App;
