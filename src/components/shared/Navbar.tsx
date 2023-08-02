import { Link } from "react-router-dom";
import style from "../../styles/components.module.css";
import CurrentUser from "./CurrentUser";
import { useContext, useEffect } from "react";
import UserContext from "../../context/UserProvider";
import { LoginToken } from "../../functions/DataType";
import axios from "axios";
import { useMutation } from "react-query";
import { URL_PROFILE_FETCH } from "../../functions/GlobalConstants";
import CartDisplay from "./CartDisplay";

export default function Navbar () {
    const { user, role, logIn } = useContext(UserContext);
    // const { logIn } = useContext(UserContext);
    
    const nameMutation = useMutation(
        (data: LoginToken) => {
            return axios.get(URL_PROFILE_FETCH, {headers: {
                "Authorization": "Bearer " + data.access_token
            }});
        },
        {
            onSuccess: (data) => {
                const name = data.data.name as string;
                const role = data.data.role as string;

                logIn(name, role);

                // setUser(name);
                // setRole(role);
            }
        }
    )

    useEffect (() => {
        const tokens = JSON.parse(localStorage.getItem("session") || "{}");
        nameMutation.mutate(tokens);
    }, []);

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
                    {
                    (role === "admin")?
                        <Link to="/admin-panel">
                            <span className={style.links}>Admin Panel</span>
                        </Link>
                    :
                    (role === "customer") &&
                        <Link to="/cart-detail">
                            <CartDisplay/>
                        </Link>
                    }
                    {/* <span className={style.links}>About</span> */}
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