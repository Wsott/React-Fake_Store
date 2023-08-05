import { useContext } from "react";
import CartContext from "../context/CartProvider";
import style from "../styles/pages.module.css";
import { useNavigate } from "react-router-dom";

export default function CheckoutFinished () {
    const { cleanTheCart } = useContext(CartContext);
    const navigate = useNavigate();

    function handleClick () {
        navigate("/");
        cleanTheCart();
    }

    return (
        <div className={style.checkoutShippingContainer}>
            <p className={style.checkoutFinishedTitle}>Your purchase was processed!</p>
            <p className={style.checkoutFinishedText}>Thanks for choosing us, we hope you enjoy your new stuff (remember, we don't accept refunds).</p>
            <button className={style.checkoutFinishedButton} onClick={handleClick}>I want to keep buying!</button>
        </div>
    );
}