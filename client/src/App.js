import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
function App() {
  const getResults = async () => {
    const { data } = await axios.get(`/events`);
    console.log(data, "the data");
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>

        <button onClick={getResults}>get food events in ny</button>
      </header>
    </div>
  );
}

export default App;
