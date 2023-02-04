
import './App.css';
import { AnalogClock } from "./ui-components/analog-clock";
import {TimeFormat, ClockMode} from "./utils/types";

function App() {

  return (
    <div className="App">
        <div>
            <h1>My React Clock</h1>
            <AnalogClock size={400} timeFormat={TimeFormat.Mode24Hour} clockMode={ClockMode.Live}/>
            {/* <AnalogClock missingNumbers={[3,5,8,11]}/> */}
        </div>
    </div>
  );
}

export default App;
