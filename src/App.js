
import './App.css';
import { AnalogClock } from "./AnalogClock";
import {TimeFormat, ClockMode} from "./clock-utils";

function App() {

  return (
    <div className="App">
        <div>
            <h1>My React Clock</h1>
            <AnalogClock size={400} timeFormat={TimeFormat.Mode24Hour} clockMode={ClockMode.Live}/>
        </div>
    </div>
  );
}

export default App;
