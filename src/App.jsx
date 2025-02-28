import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginUser from "./pages/auth/LoginUser";
import ArticleList from "./pages/public/ArticleList";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ArticleList />} />
        
        <Route path="/login" element={<LoginUser />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
