import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header.tsx";
import Footer from "./components/Footer.tsx";
import Home from "./pages/Home/Home.tsx";
import About from "./pages/About/About.tsx";
import Login from "./pages/User/Login.tsx";
import Register from "./pages/User/Register.tsx";
import Result from "./pages/Result/Result.tsx";
import Privacypolicy from "./pages/Privacypolicy/Privacypolicy.tsx";
import Favorite from "./pages/Favorite/Favorite.tsx";
import "./App.css";
import SinglePage from "./pages/SinglePage/SinglePage.tsx";
import PageContent from "./pages/SinglePage/PageContent.tsx";
import Admin from "./pages/Admin/Admin.tsx";

function App() {
  return (
    <div className="app-container">
      <BrowserRouter>
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/about" element={<About />}></Route>
            <Route path="/result" element={<Result />}></Route>
            <Route path="/admin" element={<Admin />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/register" element={<Register />}></Route>
            <Route path="/privacypolicy" element={<Privacypolicy />}></Route>
            <Route path="/favorite" element={<Favorite />}></Route>
            <Route path="/books/:id" element={<SinglePage />} />
            <Route
              path="/chapter/:id/:chapter_number"
              element={<PageContent />}
            />
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
