import { Estimation, EstimationOfPerson, getEstimations } from "../types/Estimations";
import React from "react";
import { EstimationInput } from "../components/EstimationInput/EstimationInput";
import { EstimationsTable } from "../components/EstimationsTable/EstimationsTable";
import { Header } from "../components/Header/Header";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { Socket, io } from "socket.io-client";

const StyledRoom = styled.div`
  color: #333;
  font-size: 20px;
  margin-bottom: 10px;
`;
const socket: Socket = io("http://localhost:5000");

export const Room = () => {
  const [estimations, setEstimations] = React.useState<EstimationOfPerson[]>(
    []
  );
  const [personName, setPersonName] = React.useState<string>("");
  const [choosenPersonName, setChoosenPersonName] =
    React.useState<boolean>(false);

  const { id } = useParams();

  React.useEffect(() => {
    socket.emit("join", id);
    socket.on("estimations", (allEstimations: string) => {
      const arrayEstimations: { name: string; estimations: string }[] =
        JSON.parse(allEstimations);
      const estimationsOfPersons = arrayEstimations.map((estimation) => {
        return {
          person: estimation.name,
          estimations: getEstimations(estimation.estimations),
        };
      });
      setEstimations(estimationsOfPersons);
    });
    return () => {
     socket.off("estimations");
    }
  }, []);

  const estimationsChanged = (estimations: Estimation[]) => {
    socket.emit("userEstimations", estimations.join(" "));
  };

  return (
    <div>
      <Header title="EstimaTeam" />
      <StyledRoom>Room: {id}</StyledRoom>
      {!choosenPersonName ? (
        <>
          <div>Choose a name</div>
          <div id="addName">
            <input
              type="text"
              value={personName}
              onChange={(e) => setPersonName(e.target.value)}
            />
            <button onClick={() => setChoosenPersonName(true)}>Add Name</button>
          </div>
        </>
      ) : (
        <>
          <div id="estimations">
            <div>
              <EstimationInput onEstimationChange={estimationsChanged} />
            </div>
            <div>
              <EstimationsTable estimations={estimations} />
            </div>
          </div>
        </>
      )}
    </div>
  );
};
