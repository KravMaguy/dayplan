import logo from "./logo.svg";
import "./App.css";
// import axios from "axios";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PlacesAutoComplete from "./PlacesAutocomplete";

function App() {
  return (
    <div className="center">
      <Router>
        <Routes>
          <Route path="/" element={<PlacesAutoComplete />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
