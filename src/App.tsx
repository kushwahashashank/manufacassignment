import { MantineProvider } from '@mantine/core';
import './App.css';
import Table from './Components/Table/Table';
import {getcalculatedvalues} from "./Components/Functions/Functions"

function App() {
const values=getcalculatedvalues();


  return (
    <MantineProvider>
      <div className="App">
        <div className="table">
          <p>Flavanoids calculated values</p>
        <Table data={values[0]} />
        </div>
        
        <div className="table">
          <p>Gamma calculated values</p>
<Table data={values[1]} />
        </div>
        
       
      </div>
    </MantineProvider>
  );
}

export default App;
