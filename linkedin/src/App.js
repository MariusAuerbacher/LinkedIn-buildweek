import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBar from "./Components/NavBar";
import Profile from "./Components/Profile";
import "./styles/navBar.css";
import Footer from "./Components/Footer";
import ExperiencePage from "./Components/ExperiencePage";
import MainFeed from "./Components/MainFeed";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Profile />} />
        <Route path="/experience-page" element={<ExperiencePage />} />
        <Route path="/feed" element={<MainFeed />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
