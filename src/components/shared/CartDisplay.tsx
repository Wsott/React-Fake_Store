import { useContext } from "react";
import CartContext from "../../context/CartProvider";
import style from "../../styles/components.module.css";

export default function CartDisplay () {
    const { items, totalPrice } = useContext(CartContext);

    return (
        <span className={style.links}>
            🛒 {items.length} items (${totalPrice})
        </span>      
    );
}