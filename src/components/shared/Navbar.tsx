import style from "../../styles/shared.module.css";

export default function Navbar () {
    return (
        <div className={style.navbar}>
            <div className={style.content}>
                <div className={style.mainLinks}>
                    <span className={style.logo}>Ecommerce</span>
                    <span className={style.links}>Shop</span>
                    <span className={style.links}>Stories</span>
                    <span className={style.links}>About</span>
                </div>
                <div>
                    <span className={style.loginLink}>Login</span>
                </div>
            </div>
        </div>
    );
}