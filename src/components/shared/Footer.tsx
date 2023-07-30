import { Link } from "react-router-dom";
import style from "../../styles/components.module.css";

export default function Footer () {
    return (
        <div className={style.footerContainer}>
            <div className={style.footerColumns}>
                <div className={style.footerColumnContainer}>
                    <p className={style.fakeTitle}>Need help?</p>
                    <ul className={style.footerText}>
                        <li className={style.fakeLinks}>Customer Questions (FAQ)</li>
                        <li className={style.fakeLinks}>Submit Suggestion</li>
                        <li className={style.fakeLinks}>Contact Us</li>
                    </ul>
                </div>
                <div className={style.footerColumnContainer}>
                    <p className={style.fakeTitle}>Account</p>
                    <ul className={style.footerText}>
                        <li><Link to={"/login"}>Login</Link></li>
                        <li><Link to={"/signup"}>Create Account</Link></li>
                        <li className={style.fakeLinks}>My Purchase History</li>
                        <li className={style.fakeLinks}>Affiliate System</li>
                    </ul>  
                </div>
                <div className={style.footerColumnContainer}>
                    <p className={style.fakeTitle}>Information</p>
                    <ul className={style.footerText}>
                        <li className={style.fakeLinks}>About us</li>
                        <li className={style.fakeLinks}>Privacy Policy</li>
                        <li className={style.fakeLinks}>Our Newsletter</li>
                        <li className={style.fakeLinks}>Products Reviews</li>
                        <li className={style.fakeLinks}>Bug Bounty Program</li>
                    </ul>
                </div>
            </div>
            <div>
                <p className={style.footerCredits}>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ratione, dicta!
                </p>
            </div>
        </div>
    )
}