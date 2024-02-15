
import { Estimation, getEstimations, isEstimation } from '../../types/Estimations';
import React from 'react';
import { InputWithButton } from '../InputWithButton';

export type EstimationInputProps = {
  onEstimationChange: (estimations: Estimation[]) => void;
}

export const EstimationInput: React.FC<EstimationInputProps> = ({onEstimationChange}) => {


  const handleClick = (estimation: string) => {
    onEstimationChange(getEstimations(estimation));
  }



  return (
    <InputWithButton
      label='Add your estimation'
      placeholder='Ej: 3d 4h'
      textButton='Add'
      onClickButton={handleClick}
      required={true}
      validate={isEstimation}
      validationErrorMessage='Invalid estimation format'
      
    />
    
  );
};