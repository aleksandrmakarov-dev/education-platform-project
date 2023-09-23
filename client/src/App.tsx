import { Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import HomePage from "./pages/Home";
import StudyPage from "./pages/Dictionaries";
import DictionaryDetailsPage from "./pages/DictionaryDetails";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="dictionaries">
          <Route index element={<StudyPage />} />
          <Route path=":slug" element={<DictionaryDetailsPage />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
