import { useContext } from "react";
import CartContext from "../../context/CartProvider";
import style from "../../styles/components.module.css";

export interface CheckoutRowData {
    id: number;
    title: string;
    price: string;
    amount: number;
    image: string;
}

export default function CheckoutRow ( {id, title, price, amount, image}: CheckoutRowData) {
    const { changeAmount, removeItem } = useContext(CartContext);
    
    return (
        <div className={style.containerCheckoutRow}>
            <img className={style.checkoutImage} src={image} alt={"Image of " + title} />
            <div className={style.checkoutTextContainer}>
                <p className={style.checkoutText}>{title}</p>
                <p className={style.checkoutText}>${price}</p>
                <div className={style.amountContainer}>
                    <p className={style.amountText}>Amount: </p>
                    <button onClick={() => {changeAmount(id, -1)}} className={style.amountButton} disabled={amount == 1}>-</button>
                    <p className={style.amountText}>{amount}</p>
                    <button onClick={() => {changeAmount(id, 1)}} className={style.amountButton}>+</button>
                </div>
                <p className={style.checkoutText}>= ${amount * Number(price)}</p>
                <button onClick={() => {removeItem(id)}} className={style.removeButton}>❌</button>
            </div>
        </div>
    );
}