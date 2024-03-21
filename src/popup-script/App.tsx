import HomepageComponent from "./home-page/home-page.component";
import NavbarComponent from "./navbar/navbar.component";
import LoginComponent from "./auth/login-page.component";

//TODO : make library imports and refactor naming of components
import "./App.css";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const RedirectToHome = () => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/");
  }, [navigate]);

  return null;
};

const App = () => {
  return (
    <BrowserRouter>
      <div className="w-full flex flex-col overflow-y-auto">
        <NavbarComponent />
        <Routes>
          <Route path="/" element={<HomepageComponent />} />
          <Route path="/login" element={<LoginComponent />} />
          <Route path="*" element={<RedirectToHome />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
