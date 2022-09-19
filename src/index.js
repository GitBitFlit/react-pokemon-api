import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "src/styles/index.css";
import NavBar from "./components/navbar";
import Pokemon from "./pages/pokemon";
import Poke from "./pages/poke";
// import App from "./App";
import Favourites from "./pages/favourites";
import reportWebVitals from "./reportWebVitals";
import "font-awesome/css/font-awesome.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <NavBar />
      <Routes>
        <Route path="/pokemon/:pokeId" element={<Poke />} />
        <Route path="/" element={<Pokemon />} />
        <Route path="/favourites" element={<Favourites />} />
      </Routes>
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
