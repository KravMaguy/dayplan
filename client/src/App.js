import "./App.css";
import { useState } from "react";
import MultiSelectAsync from "./MultiSelect";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PlacesAutoComplete from "./PlacesAutocomplete";
import DragPlan from "./DragPlan";
import HomePage from "./HomePage";
function App() {
  return (
    <div className="">
      <Router>
        <Routes>
          <Route path="/cat" element={<MultiSelectAsync />} />
          <Route path="/" element={<HomePage />} />

          <Route path="/location" element={<PlacesAutoComplete />} />
          <Route path="/plan" element={<DragPlan />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
