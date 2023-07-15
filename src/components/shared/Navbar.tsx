import { Link } from "react-router-dom";
import style from "../../styles/components.module.css";
import CurrentUser from "./CurrentUser";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/UserProvider";
import UserContext from "../../context/UserProvider";

export default function Navbar () {
    const { user } = useContext(UserContext);

    // useEffect(() => {
    //     setLoggedIn(localStorage.getItem('name') != null);
    // }, [window.addEventListener('storage', () => localStorage.getItem("name") != null)])


    return (
        <div className={style.navbar}>
            <div className={style.content}>
                <div className={style.mainLinks}>
                    <Link to="/">
                        <span className={style.logo}>Ecommerce</span>
                    </Link>
                    <Link to="/categories">
                        <span className={style.links}>Categories</span>
                    </Link>
                    <Link to="/products">
                        <span className={style.links}>Products</span>
                    </Link>
                    <span className={style.links}>About</span>
                </div>
                <div>
                    {
                        (user !== "")?
                            <CurrentUser name={user}/>
                        :
                            <Link className={style.loginLink} to="/login">
                                Login
                            </Link>
                    }
                </div>
            </div>
        </div>
    );
}