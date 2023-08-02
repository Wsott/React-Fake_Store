import { Link } from "react-router-dom";
import style from "../styles/pages.module.css";

export default function NotFound () {
    return (
        <div className={style.notFoundContainer}>
            <img className={style.notFoundImage} src="/NotFound.png" alt="We couldn't find this page!" />
            <p className={style.notFoundMessage}>Looks like you've wandered into a digital Bermuda Triangle.</p>
            <p className={style.notFoundMessage}>Rest assured, <Link to={"/"}>👉<b>we'll guide you back to safety</b>!👈</Link></p>
        </div>
    )
}