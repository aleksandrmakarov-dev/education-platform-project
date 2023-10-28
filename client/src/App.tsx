import {
  Navigate,
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import DictionariesPage from "./pages/DictionariesPage";
import ThemesPage from "./pages/ThemesPage";
import WordsPage from "./pages/WordsPage";
import LearnPage from "./pages/LearnPage";
import SignOut from "./pages/auth/SignOut";
import ErrorPage from "./pages/ErrorPage";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<MainLayout />} errorElement={<ErrorPage />}>
      <Route index element={<Navigate to="/dictionaries" />} />
      <Route path="dictionaries">
        <Route index element={<DictionariesPage />} />
        <Route path=":dictionarySlug">
          <Route index element={<ThemesPage />} />
          <Route path="themes">
            <Route path=":themeSlug">
              <Route index element={<WordsPage />} />
              <Route path="learn" element={<LearnPage />} />
            </Route>
          </Route>
        </Route>
      </Route>
      <Route path="sign-out" element={<SignOut />} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
