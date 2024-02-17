import { EstimationInput } from "../../components/EstimationInput/EstimationInput";
import { EstimationsTable } from "../../components/EstimationsTable/EstimationsTable";
import { useParams } from "react-router-dom";
import { useRoom } from "./useRoom";
import { generateUuid } from "../../utils/utils";
import { Estimation } from "../../types/Estimations";
import { RoomShare } from "../../components/RoomShare";
import { useLoadingDispatcherContext } from "../../contexts/LoadingContext";
import { PersonFragment } from "./fragments/PersonFragment/PersonFragment";
import { useCallback } from "react";
export const RoomFirebase = () => {
  const { id } = useParams();

  const { joinRoom, user, addEstimation, usersAndEstimations, userExists } =
    useRoom(id ?? generateUuid());
  const setLoading = useLoadingDispatcherContext();

  if (!id) {
    return <div>No room id</div>;
  }

  const estimationsChanged = (estimations: Estimation[]) => {
    addEstimation(estimations.join(" "));
  };

  const setPerson = useCallback((name: string) => {
    joinRoom(name);
  }, [joinRoom]);

  const ifUserNotExists = useCallback(async (userName: string) => {
    setLoading(true);
    const exists = await userExists(userName);
    setLoading(false);
    return !exists;
  }, []);

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
        <RoomShare roomId={id} />
        {!user ? (
          <PersonFragment
            ifUserNotExists={ifUserNotExists}
            setPerson={setPerson}
          />
        ) : (
          <RoomFragment />
        )}
      </div>
    </>
  );
};
