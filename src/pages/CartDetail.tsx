import { useContext } from "react";
import CartContext from "../context/CartProvider";
import CheckoutRow from "../components/unique/CheckoutRow";
import style from "../styles/pages.module.css";

export default function CartDetail () {
    const { items } = useContext(CartContext);
    
    return (
        <div className={style.checkOutContainer}>
            {
                items.map((actual: any, key:number) => {
                    return (
                        <CheckoutRow id={actual.id} title={actual.title} price={actual.price} amount={actual.amount} image={actual.image}/>
                    )
                })
            }
        </div>
    );
}