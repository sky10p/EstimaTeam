import {
  Estimation,
  EstimationOfPerson,
  getEstimations,
} from "../types/Estimations";
import React, { useRef } from "react";
import { EstimationInput } from "../components/EstimationInput/EstimationInput";
import { EstimationsTable } from "../components/EstimationsTable/EstimationsTable";
import { useParams } from "react-router-dom";
import { Socket, io } from "socket.io-client";
import { InputWithButton } from "../components/InputWithButton";

export const Room = () => {
  const [estimations, setEstimations] = React.useState<EstimationOfPerson[]>(
    []
  );
  const [personName, setPersonName] = React.useState<string>("");
  React.useState<boolean>(false);

  const { id } = useParams();
  const socketRef = useRef<Socket | null>(null);
  React.useEffect(() => {
    socketRef.current = io("http://localhost:5000");
    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, []);

  React.useEffect(() => {
    if (!socketRef.current) {
      return;
    }
    socketRef.current.emit("join", id);
    socketRef.current.on("estimations", (allEstimations: string) => {
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
      if (!socketRef.current) {
        return;
      }
      socketRef.current.off("estimations");
    };
  }, [id]);

  const estimationsChanged = (estimations: Estimation[]) => {
    if (!socketRef.current) {
      return;
    }
    socketRef.current.emit("userEstimations", estimations.join(" "));
  };

  const setPerson = (name: string) => {
    if (!socketRef.current) {
      return;
    }
    socketRef.current.emit("name", name);
    setPersonName(name);
  };

  if (!id) {
    return <div>No room id</div>;
  }

  const PersonFragment = () => (
    <InputWithButton
      label="Choose a name"
      placeholder="Your name here"
      textButton="Go to the room with this name"
      onClickButton={setPerson}
    />
  );

  const RoomFragment = () => (
    <>
      <EstimationInput onEstimationChange={estimationsChanged} />
      <h1>Estimations</h1>
      <div className="full-width">
        <EstimationsTable estimations={estimations} />
      </div>
    </>
  );

  return (
    <>
      <div className="container">
        <div className="room-id">Room: {id}</div>
        {!personName ? <PersonFragment /> : <RoomFragment />}
      </div>
    </>
  );
};
