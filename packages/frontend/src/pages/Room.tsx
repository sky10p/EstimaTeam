import { Estimation, EstimationOfPerson } from "Estimations";
import React from "react";
import { EstimationInput } from "../components/EstimationInput/EstimationInput";
import { EstimationsTable } from "../components/EstimationsTable/EstimationsTable";
import { Header } from "../components/Header/Header";
import { useParams } from "react-router-dom";
import styled from "styled-components";

const StyledRoom = styled.div`
  color: #333;
  font-size: 20px;
  margin-bottom: 10px;
  `;

export const Room = () => {
    const [estimations, setEstimations] = React.useState<EstimationOfPerson[]>([]);
    const [personName, setPersonName] = React.useState<string>("");
    const [choosenPersonName, setChoosenPersonName] = React.useState<boolean>(false);

  const estimationsChanged = (estimations: Estimation[]) => {
    setEstimations([{person: personName, estimations: estimations}]);
  }

  const {id} = useParams();

  return (
    <div>
      <Header title='EstimaTeam' />
      <StyledRoom>Room: {id}</StyledRoom>
      {!choosenPersonName ? <><div>Choose a name</div>
      <div id="addName">
        <input type="text" value={personName} onChange={(e) => setPersonName(e.target.value)} />
        <button onClick={() => setChoosenPersonName(true)}>Add Name</button>
      </div>
      </> : <><div id="estimations">
      <div>
        <EstimationInput onEstimationChange={estimationsChanged} />
      </div>
      <div>
        <EstimationsTable estimations={estimations} />
      </div>
      </div>
      </>}
      
    </div>
  );
}