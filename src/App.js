
import './App.css';
import { AnalogClock } from "./ui-components/analog-clock";
import { ClockMissingHours } from './ui-components/clock-missing-hours';
import {TimeFormat, ClockMode} from "./utils/types";

function App() {

  return (
    <div className="App">
        <div>
            <h1>My React Clock</h1>
            {/* <AnalogClock size={400} timeFormat={TimeFormat.Mode24Hour} clockMode={ClockMode.Live}/> */}
            <ClockMissingHours />
        </div>
    </div>
  );
}

export default App;
