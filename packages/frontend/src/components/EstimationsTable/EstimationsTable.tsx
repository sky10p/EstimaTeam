import { EstimationOfPerson } from "../../types/Estimations";
import React from "react";

import styled from "styled-components";
import { EstimationsTableRow } from "./EStimationsTableRow";

const StyledTable = styled.table`
  border-collapse: collapse;
  margin-top: 20px;
`;

const StyledTitle = styled.h2`
  color: #333;
  font-size: 20px;
  margin-bottom: 10px;
`;
export type EstimationsTableProps = {
  estimations: EstimationOfPerson[];
};

export const EstimationsTable: React.FC<EstimationsTableProps> = ({
  estimations,
}) => {
  

  
  return (
    <div>
      <StyledTitle>Estimations</StyledTitle>
      <StyledTable>
        <tbody>
            {estimations.map((estimation, index) => (
                <EstimationsTableRow key={index} personName={estimation.person} estimations={estimation.estimations} />
            ))}
        </tbody>
      </StyledTable>
    </div>
  );
};
