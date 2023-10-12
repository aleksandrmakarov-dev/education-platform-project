import { Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import HomePage from "./pages/HomePage";
import DictionariesPage from "./pages/DictionariesPage";
import ThemesPage from "./pages/ThemesPage";
import WordsPage from "./pages/WordsPage";
import PracticePage from "./pages/PracticePage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="dictionaries">
          <Route index element={<DictionariesPage />} />
          <Route path=":dictionarySlug">
            <Route index element={<ThemesPage />} />
            <Route path="themes">
              <Route path=":themeSlug" element={<WordsPage />} />
            </Route>
          </Route>
        </Route>
        <Route path="practice">
          <Route index element={<PracticePage />} />
          <Route path=":themeId">
            <Route path="flashcards" />
            <Route path="learn" />
            <Route path="test" />
            <Route path="match" />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
