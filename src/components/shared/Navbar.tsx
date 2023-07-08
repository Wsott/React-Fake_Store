import { Link } from "react-router-dom";
import style from "../../styles/components.module.css";

export default function Navbar () {
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
                    <Link to="/login">
                        <span className={style.loginLink}>Login</span>
                    </Link>
                </div>
            </div>
        </div>
    );
}