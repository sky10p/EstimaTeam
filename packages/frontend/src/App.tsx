import React from 'react';
import './App.css';
import { Header } from './components/Header/Header';
import { EstimationInput } from './components/EstimationInput/EstimationInput';
import { Estimation, EstimationOfPerson } from './types/Estimations';
import { EstimationsTable } from './components/EstimationsTable/EstimationsTable';

const App = () => {
  const [estimations, setEstimations] = React.useState<EstimationOfPerson[]>([]);

  const estimationsChanged = (estimations: Estimation[]) => {
    setEstimations([{person: "Pablo Guijarro", estimations: estimations}]);
  }
  return (
    <div>
      <Header title='EstimaTeam' />
      <div>
        <EstimationInput onEstimationChange={estimationsChanged} />
      </div>
      <div>
        <EstimationsTable estimations={estimations} />
      </div>
    </div>
  );
}

export default App;
