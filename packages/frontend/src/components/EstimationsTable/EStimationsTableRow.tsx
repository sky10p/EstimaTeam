import React from "react";

import styled from "styled-components";
import { Estimation } from "Estimations";

export type EstimationsTableRowProps = {
  personName: string;
  estimations: Estimation[];
};

const StyledNameEstimatorColumn = styled.td`
  padding: 10px;
  border: 1px solid #ccc;
  font-size: 16px;
  text-align: center;
  font-weight: bold;
`;

const StyledEstimationColumn = styled.td`
    padding: 10px;
    border: 1px solid #ccc;
    font-size: 16px;
    text-align: center;
`;


export const EstimationsTableRow: React.FC<EstimationsTableRowProps> = ({
  estimations,
  personName
}) => {
  return (
    <tr>
      <StyledNameEstimatorColumn>
        {personName}
      </StyledNameEstimatorColumn>
      {estimations.map((estimation, index) => (
        <StyledEstimationColumn key={index}>
          {estimation}
        </StyledEstimationColumn>
      ))}
    </tr>
  );
};
