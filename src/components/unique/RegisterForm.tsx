import { useMutation } from "react-query";
import { SignupData } from "../../functions/DataType";
import style from "../../styles/components.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function RegisterForm () {
    const history = useNavigate();
    const signupMutation = useMutation(
        (data: SignupData) => {
            return axios.post("https://api.escuelajs.co/api/v1/users/", data)
        },
        {
            onSuccess: () => {
                history("/login");
            }
        }
    );

    function handleForm (event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const email: string = formData.get("email") as string;
        const password: string = formData.get("pass") as string;
        const name: string = formData.get("name") as string;
        const avatar = "https://images.generated.photos/r3D-3kNmD8rSFf6Kn7o9bPPs0j0Xy1uabcf0XPcBoBI/rs:fit:512:512/wm:0.95:sowe:18:18:0.33/czM6Ly9pY29uczgu/Z3Bob3Rvcy1wcm9k/LnBob3Rvcy92M18w/NTYxOTY4LmpwZw.jpg";

        const signupData: SignupData = {
            name,
            email,
            password,
            avatar
        };

        signupMutation.mutate(signupData);
    }

    return (
        <div className={style.centeredContainer}>
            <form onSubmit={handleForm} className={style.loginContainer}>
                <p className={style.loginTitle}>Create new account</p>
                <p className={style.loginSubtitle}>Thanks for making an account!</p>

                <label htmlFor="name">Your name</label>
                <input className={style.loginInput} type="text" name="name" id="name" placeholder="John Doe" />
                <label htmlFor="email">Your email</label>
                <input className={style.loginInput} type="email" name="email" id="email" placeholder="example@mail.com" />
                <label htmlFor="pass">Your password</label>
                <input className={style.loginInput} type="password" name="pass" id="pass" />

                <div>
                    <input type="checkbox" name="terms" id="terms" />
                    <label htmlFor="terms">I agree to the <b>terms</b> and <b>privacy policy</b>.</label>
                </div>
                
                <button>Create my account!</button>
            </form>
        </div>
    )
}