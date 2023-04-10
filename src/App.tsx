import { createSignal } from 'solid-js';
import AppDescription from './components/AppDescription';
import Calculator from './components/Calculator';
import UnitsChooser from './components/calculator/UnitsChooser';
import { Units } from './enums/Units';
import Credits from './components/calculator/Credits';
import WhoTable from './components/calculator/WhoTable';

function App() {
  const [units, setUnits] = createSignal(Units.metric);

  return (
    <div class="container-fluid">
      <div class="row vh-md-100 align-items-center">
        <div class="col-md-6 h-100 bg-app overflow-y-auto">
          <div class="row h-100 align-items-center justify-content-end">
            <div class="col-lg-7 py-4">
              <div class="vstack gap-2">
                <AppDescription />
                <UnitsChooser units={units()} onUnitsChange={setUnits} />
                <WhoTable />
                <Credits />
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-6 h-100 overflow-y-auto">
          <div class="row h-100 align-items-center">
            <div class="col-lg-7 py-4">
              <div class="vstack gap-3">
                <Calculator units={units()} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
