import "./App.css";
import MultiSelectAsync from "./MultiSelect";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PlacesAutoComplete from "./PlacesAutocomplete";
import DragPlan from "./DragPlan";
import HomePage from "./HomePage";
import PlanPreview from "./PlanPreview";
import Header from "./Header";
import PrivacyPolicy from "./PrivacyPolicy";
import Tos from "./Tos";
function App() {
  return (
    <div className="">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/categories" element={<MultiSelectAsync />} />
          <Route path="/location" element={<PlacesAutoComplete />} />
          <Route path="/plan" element={<DragPlan />} />
          <Route path="/plans/:email/:id" element={<PlanPreview />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-service" element={<Tos />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
