import { EstimationOfPerson } from "../../types/Estimations";
import React from "react";

import "./EstimationsTable.css";


export type EstimationsTableProps = {
  estimations: EstimationOfPerson[];
};

export const EstimationsTable: React.FC<EstimationsTableProps> = ({
  estimations,
}) => {
  
const numberTasks = estimations.map((estimation) => estimation.estimations.length).reduce((max, current) => Math.max(max, current), 0);
 const tasks = Array.from({length: numberTasks}, (_, index) => index + 1);
  return (

      <table>
        <thead>
          <tr>
            <th></th>
            {tasks.map((task, index) => (
              <th key={index}>Task {task}</th>
            ))}

          </tr>
        </thead>
        <tbody>
          {estimations.map((estimation, index) => (
            <tr key={estimation.person}>
              <td>{estimation.person}</td>
              {tasks.map((task, index) => {
                const estimationOfTask = estimation.estimations[index];
                return <td key={index}>{estimationOfTask}</td>;
              })}
            </tr>
          ))}
        </tbody>
      </table>
  );
};
