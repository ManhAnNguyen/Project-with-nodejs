import DetailUser from "pages/DetailUser";
import Home from "pages/Home";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user/:id" element={<DetailUser />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
