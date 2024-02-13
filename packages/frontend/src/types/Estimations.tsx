export type Estimation = string;
export type EstimationOfPerson = {
    person: string;
    estimations: Estimation[];
    };
export const isEstimation = (value: string): value is Estimation => {
  const isMinutes = /^\d{1,2}m$/;
  const isHours = /^\d{1,2}h$/;
  const isDays = /^\d{1,2}d$/;

  return value.split(" ").every((estimation) => {
    return (
      isMinutes.test(estimation) ||
      isHours.test(estimation) ||
      isDays.test(estimation)
    );
  });
};

export const getEstimation = (value: string): Estimation => {
  if (!isEstimation(value)) {
    throw new Error(`Invalid estimation format: ${value}`);
  }
  return value;
};

export const getEstimations = (value: string): Estimation[] => {
  return value.split(" ").map(getEstimation);
};
