import "./App.css";
import { useState } from "react";
import MultiSelectAsync from "./MultiSelect";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PlacesAutoComplete from "./PlacesAutocomplete";
import DragPlan from "./DragPlan";

function App() {
  return (
    <div className="center">
      <Router>
        <Routes>
          <Route path="/category" element={<MultiSelectAsync />} />
          <Route path="/" element={<PlacesAutoComplete />} />
          <Route path="/plan" element={<DragPlan />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
