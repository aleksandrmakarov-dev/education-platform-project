import { Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import HomePage from "./pages/Home";
import StudyPage from "./pages/Study";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="study" element={<StudyPage />} />
      </Route>
    </Routes>
  );
}

export default App;
