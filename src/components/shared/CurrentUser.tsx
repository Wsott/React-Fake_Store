import style from "../../styles/components.module.css";
import { LoggedUser } from "../../functions/DataType";
import { useContext } from "react";
import UserContext from "../../context/UserProvider";

export default function CurrentUser ( {name}: LoggedUser) {
    const { user, setUser } = useContext(UserContext);

    function handleLogOut () {
        localStorage.removeItem("name");
        localStorage.removeItem("session");
        setUser("");
        console.log(user)
    }

    return (
        <div className={style.horizontalContainer}>
            <p className={style.welcomeMessage}>Welcome, {name}!</p>
            <button onClick={handleLogOut}>Log out</button>
        </div>
    )
}