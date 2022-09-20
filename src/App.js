import "./App.css";
import { useState } from "react";

const URL = "https://api.exchangerate.host/latest";

function App() {
  const [eur, setEur] = useState(0);
  const [gbp, setGBP] = useState(0);
  const [rate, setRate] = useState(0);

  async function convert(e) {
    e.preventDefault();
    try {
      const address = URL;
      const response = await fetch(address);

      if (response.ok) {
        const json = await response.json();
        console.log(json.rates.GBP);
        setRate(json.rates.GBP);

        setGBP(eur * json.rates.GBP);
      } else {
        alert("Error retrieving exchange rate.");
        console.log(response.ok);
      }
    } catch (err) {
      alert(err);
    }
  }

  return (
    <div id="container">
      <form onSubmit={convert}>
        <div>
          <label>Eur</label>&nbsp;
          <input
            type="number"
            step="0.1"
            value={eur}
            onChange={(e) => setEur(e.target.value)}
          />
          <output>{rate}</output>
        </div>
        <div>
          <label>Gbp</label>&nbsp;
          <output>{gbp.toFixed(2)} €</output>
        </div>
        <div>
          <button>Calculate</button>
        </div>
      </form>
    </div>
  );
}

export default App;
