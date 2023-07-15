import { Link } from "react-router-dom";
import style from "../../styles/components.module.css";
import { Separator } from "../shared/Separator";

export default function LoginForm () {
    return (
        <div className={style.centeredContainer}>
            <div className={style.loginContainer}>
                <p className={style.loginTitle}>Welcome back</p>
                <p className={style.loginSubtitle}>Login with email</p>
                <input className={style.loginInput} type="email" name="email" id="email" placeholder="Email" />
                <input className={style.loginInput} type="password" name="pass" id="pass" placeholder="Password" />
                <button>Login</button>
                <Separator/>
                <p className={style.forgotPass}>Forgot Password?</p>
            </div>
            <Link to="/signup" className={style.create}>
                Or create an <span className={style.boldCreate}>account</span>
            {/* <p className={style.create}>Or create an <span className={style.boldCreate}>account</span></p> */}
            </Link>
        </div>
    );
}