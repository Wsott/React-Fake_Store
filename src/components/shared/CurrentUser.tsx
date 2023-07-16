import style from "../../styles/components.module.css";
import { LoggedUser } from "../../functions/DataType";
import { useContext } from "react";
import UserContext from "../../context/UserProvider";
import { useNavigate } from "react-router-dom";

export default function CurrentUser ( {name}: LoggedUser) {
    const { setUser } = useContext(UserContext);
    const navigate = useNavigate();

    function handleLogOut () {
        localStorage.removeItem("name");
        localStorage.removeItem("session");
        setUser("");
        navigate("/");
    }

    return (
        <div className={style.horizontalContainer}>
            <p className={style.welcomeMessage}>Welcome, {name}!</p>
            <button onClick={handleLogOut}>Log out</button>
        </div>
    )
}