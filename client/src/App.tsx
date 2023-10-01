import { Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import HomePage from "./pages/HomePage";
import DictionariesPage from "./pages/DictionariesPage";
import ThemesPage from "./pages/ThemesPage";
import TermsPage from "./pages/TermsPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="dictionaries">
          <Route index element={<DictionariesPage />} />
          <Route path=":dictionaryId">
            <Route index element={<ThemesPage />} />
            <Route path="themes">
              <Route path=":themeId" element={<TermsPage />} />
            </Route>
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
