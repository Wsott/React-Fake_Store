import { useContext } from "react";
import { Separator } from "../components/shared/Separator";
import CartContext from "../context/CartProvider";
import style from "../styles/pages.module.css";

export default function CheckoutDetails () {
    const { items, totalPrice } = useContext(CartContext);

    return (
        <div className={style.checkoutDetailsContainer}>
             <>
                <p className={style.checkoutDetailsTitle}>Your order</p>
                <Separator/>
                {items.map((actual: any, key:number) => {
                    return (
                        <p className={style.checkoutDetailsElements} key={key}>{actual.title} x{actual.amount} = ${actual.price * actual.amount}</p>
                    )
                })}
                <Separator/>
                <p className={style.checkoutDetailsSubtitle}>Final price: ${totalPrice}</p>
            </>
        </div>
    );
}