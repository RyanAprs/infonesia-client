import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginUser from "./pages/auth/LoginUser";
import ArticleList from "./pages/public/ArticleList";
import RegisterUser from "./pages/auth/RegisterUser";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ArticleList />} />

        <Route path="/login" element={<LoginUser />} />
        <Route path="/register" element={<RegisterUser />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
