import { Link, useNavigate } from "react-router-dom";
import style from "../../styles/components.module.css";
import { Separator } from "../shared/Separator";
import { LoginData, LoginToken } from "../../functions/DataType";
import { useMutation } from "react-query";
import axios from "axios";
import { URL_LOGIN } from "../../functions/GlobalConstants";

export default function LoginForm () {
    const navigate = useNavigate();
    
    const loginMutation = useMutation(
        (data: LoginData) => {
            return axios.post(URL_LOGIN, data);
        },
        {
            onSuccess: (data) => {
                const access_token = data.data.access_token;
                const refresh_token = data.data.refresh_token;

                const sessionData: LoginToken = {
                    access_token,
                    refresh_token
                };
                
                localStorage.setItem("session", JSON.stringify(sessionData));
                navigate("/");
            }
        }
    )

    async function handleForm(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const email: string = formData.get("email") as string;
        const password: string = formData.get("pass") as string;
        const loginData: LoginData = {email, password};

        await loginMutation.mutate(loginData);
    }

    return (
        <div className={style.centeredContainer}>
            <form onSubmit={handleForm} className={style.loginContainer}>
                <p className={style.loginTitle}>Welcome back</p>
                <p className={style.loginSubtitle}>Login with email</p>
                <input className={style.loginInput} type="email" name="email" id="email" placeholder="Email" />
                <input className={style.loginInput} type="password" name="pass" id="pass" placeholder="Password" />
                <button className={style.loginButton}>Login</button>
                <Separator/>
                <p className={style.forgotPass}>Forgot Password?</p>
                <Link to="/signup" className={style.create}>
                    Or create an <span className={style.boldCreate}>account</span>
                </Link>
            </form>
        </div>
    );
}