import { Link } from "react-router-dom";
import style from "../styles/pages.module.css";
import { NotFoundReturnPath } from "../functions/DataType";

export default function NotFound ({returnTo}: NotFoundReturnPath) {
    return (
        <div className={style.notFoundContainer}>
            <img className={style.notFoundImage} src="/NotFound.png" alt="We couldn't find this page!" />
            <p className={style.notFoundMessage}>Looks like you've wandered into a digital Bermuda Triangle.</p>
            <p className={style.notFoundMessage}>Rest assured, <Link to={returnTo}>👉<b>we'll guide you back to safety</b>!👈</Link></p>
        </div>
    )
}