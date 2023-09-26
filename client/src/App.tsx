import { Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import HomePage from "./pages/Home";
import StudyPage from "./pages/Dictionaries";
import ThemeDetailsPage from "./pages/ThemeDetailsPage";
import DictionaryDetailsPage from "./pages/DictionaryDetails";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="dictionaries">
          <Route index element={<StudyPage />} />
          <Route path=":dictionaryId">
            <Route index element={<DictionaryDetailsPage />} />
            <Route path="themes">
              <Route path=":themeId" element={<ThemeDetailsPage />} />
            </Route>
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
