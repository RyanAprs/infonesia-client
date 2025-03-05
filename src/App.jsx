import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginUser from "./pages/auth/LoginUser";
import ArticleList from "./pages/public/ArticleList";
import RegisterUser from "./pages/auth/RegisterUser";
import LoginAdmin from "./pages/auth/LoginAdmin";
import DashboardAdmin from "./pages/admin/DashboardAdmin";
import UseAuthManager from "./store/AuthProvider";
import NavbarAdmin from "./components/navbar/NavbarAdmin";
import { AdminProtectedRoute } from "./components/ProtectedRoute/ProtectedRoute";

function App() {
  const { isAuthenticated, token } = UseAuthManager();

  return (
    <BrowserRouter>
      <Routes>
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
            path="/admin/dashboard"
            element={
              <>
                <NavbarAdmin>
                  <DashboardAdmin />
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
