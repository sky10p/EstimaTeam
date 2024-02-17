import QRCode from "qrcode.react";
import "./RoomShare.css";

export type RoomShareProps = {
  roomId: string;
};

export const RoomShare: React.FC<RoomShareProps> = ({ roomId }) => {
  const host = window.location.host;
  const url = `http://${host}/room/${roomId}`;
  return (
    <div className="room-share-container">
      <div className="room-share-qr">
        <QRCode value={url} size={100} />
      </div>
      <div className="room-share-text">
        <span>Share this room</span>
        <a href={url} target="_blank" rel="noreferrer">
          {url}
        </a>
      </div>
    </div>
  );
};
