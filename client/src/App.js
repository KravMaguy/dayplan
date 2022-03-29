import "./App.css";
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PlacesAutoComplete from "./PlacesAutocomplete";
import DragPlan from "./DragPlan";
import { useDispatch, useSelector } from "react-redux";

function App() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const center = state.center;
  // you will notice that i'm handling the constraints here not on my reducer
  const handleIncrement = () =>
    state.count < 10 && dispatch({ type: "INCREMENT" });
  const handleDecrement = () =>
    state.count > 0 && dispatch({ type: "DECREMENT" });
  // const [center, setCenter] = useState({
  //   lat: 40.7579746792255,
  //   lng: -73.98546749996966,
  // });

  return (
    <div className="center">
      <h1>state = greater than 0 and less than 10</h1>
      <p>state: {state.count}</p>
      <button onClick={handleIncrement}>Increment</button>{" "}
      <button onClick={handleDecrement}>Decrement</button>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <PlacesAutoComplete
                //should also comment the below
                center={center}
                // setCenter={setCenter}
              />
            }
          />
          <Route
            path="/plan"
            element={
              <DragPlan
                //should also comment the below
                center={center}
                // setCenter={setCenter}
              />
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
