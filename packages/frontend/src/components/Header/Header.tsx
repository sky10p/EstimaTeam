import { LinearProgress } from "@mui/material";
import { useAuthContext } from "../../contexts/AuthContext";
import "./Header.css";
import { useLoadingStateContext } from "../../contexts/LoadingContext";
export type HeaderProps = {
    title: string;
}

export const Header: React.FC<HeaderProps> = ({title}) => {
  const {anonymousLogged} = useAuthContext();
  const loading = useLoadingStateContext();

  const goToHome = () => {
    window.location.href = "/";
  };
  return (
    <>
    <header className="header">
      <div className="left"></div>
      <div className="center">
       <span onClick={goToHome} style={{cursor: "pointer"}}> {title}</span>
      </div>
      <div className="right">
        <h6>{anonymousLogged ? "Anonymous Logged" : "Not logged"}</h6>
      </div>
    </header>
    {loading && <LinearProgress />}
    </>
  );
};
