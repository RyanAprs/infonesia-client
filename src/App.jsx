import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginUser from "./pages/auth/LoginUser";
import ArticleList from "./pages/public/ArticleList";
import RegisterUser from "./pages/auth/RegisterUser";
import LoginAdmin from "./pages/auth/LoginAdmin";
import DashboardAdmin from "./pages/admin/DashboardAdmin";
import NavbarAdmin from "./components/navbar/NavbarAdmin";
import {
  AdminProtectedRoute,
  JournalistProtectedRoute,
} from "./components/ProtectedRoute/ProtectedRoute";
import UserData from "./pages/admin/UserData";
import NewsData from "./pages/admin/NewsData";
import JournalistData from "./pages/admin/JournalistData";
import CategoryData from "./pages/admin/CategoryData";
import UseAuthManager from "./store/AuthProvider";
import LoginJournalist from "./pages/auth/LoginJournalist";
import DashboardJournalist from "./pages/journalist/DashboardJournalist";
import NewsDataJurnalist from "./pages/journalist/NewsDataJournalist";
import CategoryDataJournalist from "./pages/journalist/CategoryDataJournalist";

function App() {
  const { isAuthenticated, token } = UseAuthManager();

  return (
    <BrowserRouter>
      <Routes>
        {/* PUBLIC */}
        <Route path="/" element={<ArticleList />} />

        {/* ADMIN */}
        <Route path="/admin/login" element={<LoginAdmin />} />
        <Route
          element={
            <AdminProtectedRoute
              isAuthenticated={isAuthenticated}
              token={token}
            />
          }
        >
          <Route
            path="/admin/beranda"
            element={
              <>
                <NavbarAdmin>
                  <DashboardAdmin />
                </NavbarAdmin>
              </>
            }
          />
          <Route
            path="/admin/pengguna"
            element={
              <>
                <NavbarAdmin>
                  <UserData />
                </NavbarAdmin>
              </>
            }
          />
          <Route
            path="/admin/berita"
            element={
              <>
                <NavbarAdmin>
                  <NewsData />
                </NavbarAdmin>
              </>
            }
          />
          <Route
            path="/admin/jurnalis"
            element={
              <>
                <NavbarAdmin>
                  <JournalistData />
                </NavbarAdmin>
              </>
            }
          />
          <Route
            path="/admin/kategori"
            element={
              <>
                <NavbarAdmin>
                  <CategoryData />
                </NavbarAdmin>
              </>
            }
          />
        </Route>

        {/* JOURNALIST */}
        <Route path="/jurnalis/login" element={<LoginJournalist />} />
        <Route
          element={
            <JournalistProtectedRoute
              isAuthenticated={isAuthenticated}
              token={token}
            />
          }
        >
          <Route
            path="/jurnalis/beranda"
            element={
              <>
                <NavbarAdmin>
                  <DashboardJournalist />
                </NavbarAdmin>
              </>
            }
          />
          <Route
            path="/jurnalis/berita"
            element={
              <>
                <NavbarAdmin>
                  <NewsDataJurnalist />
                </NavbarAdmin>
              </>
            }
          />
          <Route
            path="/jurnalis/kategori"
            element={
              <>
                <NavbarAdmin>
                  <CategoryDataJournalist />
                </NavbarAdmin>
              </>
            }
          />
        </Route>

        {/* USER */}
        <Route path="/login" element={<LoginUser />} />
        <Route path="/register" element={<RegisterUser />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
