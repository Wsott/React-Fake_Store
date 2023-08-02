import { useContext, useEffect, useState } from "react";
import style from "../styles/pages.module.css";
import CheckoutDetails from "./CheckoutDetails";
import CheckoutAddress from "./CheckoutAddress";
import CheckoutPayment from "./CheckoutPayment";
import CheckoutFinished from "./CheckoutFinished";
import { useNavigate } from "react-router-dom";
import UserContext from "../context/UserProvider";

export default function Checkout () {
    const [ stage, setStage ] = useState<number>(0);
    const { role } = useContext(UserContext);
    const navigate = useNavigate();

    useEffect (() => {
        if (role !== "customer") {
            navigate("/");
        }
    });

    function continueCheckout () {
        setStage(stage + 1);
    }

    return (
        <div className={style.checkoutContainer}>
            {
                (stage == 0)?
                    <CheckoutAddress nextPart={continueCheckout}/>
                :
                    (stage == 1)?
                        <CheckoutPayment nextPart={continueCheckout}/>
                    :
                        <CheckoutFinished/>
            }
            <CheckoutDetails/>
        </div>
    );
}