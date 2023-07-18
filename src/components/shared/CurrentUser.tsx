import style from "../../styles/components.module.css";
import { LoggedUser } from "../../functions/DataType";
import { useContext } from "react";
import UserContext from "../../context/UserProvider";
import { useNavigate } from "react-router-dom";

export default function CurrentUser ( {name}: LoggedUser) {
    const { setUser, logOut } = useContext(UserContext);
    const navigate = useNavigate();

    function handleLogOut () {
        logOut();
        //saludar();
        // localStorage.removeItem("name");
        // localStorage.removeItem("session");
        setUser("");
        navigate("/");
    }

    return (
        <div className={style.horizontalContainer}>
            <p className={style.welcomeMessage}>Welcome, {name}!</p>
            <button className={style.logoutButton} onClick={handleLogOut}>Log out</button>
        </div>
    )
}