import "./App.css";
import Home from "./Components/Home";
import NavBar from "./Components/NavBar";
import About from "./Components/About";
import Instructions from "./Components/Instructions";
import ContactUs from "./Components/ContactUs";
import Footer from "./Components/Footer";
import Examples from "./Components/Examples";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Hero from "./Components/Hero";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <div className="flex flex-col">
              <NavBar />
              <Home />
              <About className="border-solid border-black border-2" />
              <Instructions/>
              <Examples />
              <Footer />
            </div>
          }
        />
        <Route path="/hero" element={<Hero />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
