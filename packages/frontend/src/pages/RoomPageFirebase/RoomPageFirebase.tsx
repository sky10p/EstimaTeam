
import { EstimationInput } from "../../components/EstimationInput/EstimationInput";
import { EstimationsTable } from "../../components/EstimationsTable/EstimationsTable";
import { useParams } from "react-router-dom";
import { InputWithButton } from "../../components/InputWithButton";
import { useRoom } from "./useRoom";
import { generateUuid } from "../../utils/utils";
import { Estimation } from "../../types/Estimations"

export const RoomFirebase = () => {
  
  const { id } = useParams();

  const {joinRoom, user, errorUser, addEstimation, usersAndEstimations, anonymousLogged} = useRoom(id ?? generateUuid());


 
  if (!id) {
    return <div>No room id</div>;
  }


  const estimationsChanged = (estimations: Estimation[]) => {
    addEstimation(estimations.join(" "));
  }

  const setPerson = (name: string) => {
    joinRoom(name);
  }
  

  const PersonFragment = () => (
    <InputWithButton
      label="Choose a name"
      placeholder="Your name here"
      textButton="Go to the room with this name"
      onClickButton={setPerson}
      validate={() => !errorUser}
      required={true}
      validationErrorMessage="User already exists"
    />
  );

  const RoomFragment = () => (
    <>
      <EstimationInput onEstimationChange={estimationsChanged} />
      <h1>Estimations</h1>
      <div className="full-width">
        <EstimationsTable estimations={usersAndEstimations} />
      </div>
    </>
  );

  return (
    <>
      <div className="container">
        {anonymousLogged ? "Logged" : "Not logged"}
        <div className="room-id">Room: {id}</div>
        {!user ? <PersonFragment /> : <RoomFragment />}
      </div>
    </>
  );
};
