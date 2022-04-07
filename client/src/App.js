import "./App.css";
import MultiSelectAsync from "./MultiSelect";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PlacesAutoComplete from "./PlacesAutocomplete";
import DragPlan from "./DragPlan";
import HomePage from "./HomePage";
import PlanPreview from "./PlanPreview";
function App() {
  return (
    <div className="">
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/categories" element={<MultiSelectAsync />} />
          <Route path="/location" element={<PlacesAutoComplete />} />
          <Route path="/plan" element={<DragPlan />} />
          <Route path="/plans/:email/:id" element={<PlanPreview />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
