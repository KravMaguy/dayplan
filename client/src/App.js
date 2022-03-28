import "./App.css";
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PlacesAutoComplete from "./PlacesAutocomplete";
import DragPlan from "./DragPlan";

function App() {
  const [center, setCenter] = useState({
    lat: 40.7579746792255,
    lng: -73.98546749996966,
  });
  return (
    <div className="center">
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <PlacesAutoComplete center={center} setCenter={setCenter} />
            }
          />
          <Route
            path="/plan"
            element={<DragPlan center={center} setCenter={setCenter} />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
