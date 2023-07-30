import { useContext } from "react";
import CartContext from "../context/CartProvider";
import CheckoutRow from "../components/unique/CheckoutRow";
import style from "../styles/pages.module.css";
import { Separator } from "../components/shared/Separator";
import { Link } from "react-router-dom";

export default function CartDetail () {
    const { items, totalPrice } = useContext(CartContext);
    
    return (
        <div className={style.checkOutContainer}>
            <p className={style.cartDetailTitle}>Cart detail</p>
            <Separator/>
            {
                (items.length != 0)?
                    <>
                        {items.map((actual: any, key:number) => {
                        return (
                            <CheckoutRow id={actual.id} title={actual.title} price={actual.price} amount={actual.amount} image={actual.image}/>
                        )
                        })}
                        <Separator/>
                        <div style={{display: "flex", flexDirection: "column"}}>
                            <p className={style.checkoutText}>Final price: ${totalPrice}</p>
                            <button className={style.checkoutButton}>Checkout</button>
                        </div>
                    </>
                :
                    <p className={style.emptyCart}>Your order has no items! Go to our <Link style={{textDecoration: "underline"}} to={"/products"}>catalogue</Link> to add some item.</p>
            }
        </div>
    );
}