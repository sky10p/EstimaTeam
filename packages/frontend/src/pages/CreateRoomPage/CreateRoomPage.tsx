import { InputWithButton } from "../../components/InputWithButton";
import { Button } from "../../components/Button";
import { generateUuid } from "../../utils/utils";
export const CreateRoomPage = () => {


  const goToRoom = (roomId: string) => {
    window.location.href = `/room/${roomId}`;
  };
    
  return (
    <div className="container">
      <InputWithButton label="Room ID" placeholder="Write the room name here" textButton="Enter the room" onClickButton={goToRoom}/>
      <Button textButton="Create a room" onClick={()=> goToRoom(generateUuid())}/>
    </div>
  );
};
