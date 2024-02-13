
import styled from 'styled-components';
import { Estimation, getEstimations, isEstimation } from '../../types/Estimations';
import React, { useState } from 'react';

export type EstimationInputProps = {
  onEstimationChange: (estimations: Estimation[]) => void;
}

const StyledInput = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  width: 100%;
`;

const StyledTitle = styled.h1`
  color: #333;
  font-size: 24px;
  margin-bottom: 20px;
`;

const StyledButton = styled.button`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  width: 100%;
  margin-top: 20px;
  cursor: pointer;
  background-color: #4CAF50;
  color: white;
`;

const StyledError = styled.div`
  color: red;
  font-size: 14px;
  margin-top: 10px;
`;

export const EstimationInput: React.FC<EstimationInputProps> = ({onEstimationChange}) => {
  const [estimation, setEstimation] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleEstimationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setEstimation(value);    
  }

  const handleClick = () => {
    if(!isEstimation(estimation)) {
      setError("Invalid estimation format");
      return;
    }
    onEstimationChange(getEstimations(estimation));
    setError("");
  }

  return (
    <div>
      <StyledTitle>Add your estimation</StyledTitle>
      <StyledInput type="text" value={estimation} onChange={handleEstimationChange} />
      {error && <StyledError>{error}</StyledError>}
      <StyledButton onClick={handleClick}>Add</StyledButton>
      
    </div>
  );
};