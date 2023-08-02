import { useContext, useEffect } from "react";
import CartContext from "../context/CartProvider";
import CheckoutRow from "../components/unique/CheckoutRow";
import style from "../styles/pages.module.css";
import { Separator } from "../components/shared/Separator";
import { Link } from "react-router-dom";
import UserContext from "../context/UserProvider";

export default function CartDetail () {
    const { items, totalPrice } = useContext(CartContext);
    const { role } = useContext(UserContext);

    
    return (
        <div className={style.checkOutContainer}>
            <p className={style.cartDetailTitle}>Cart detail</p>
            <Separator/>
            {
                (items.length != 0)?
                    <>
                        {items.map((actual: any, key:number) => {
                        return (
                            <CheckoutRow key={key} id={actual.id} title={actual.title} price={actual.price} amount={actual.amount} image={actual.image}/>
                        )
                        })}
                        <Separator/>
                        <div style={{display: "flex", flexDirection: "column"}}>
                            <p className={style.checkoutText}>Final price: ${totalPrice}</p>
                            <Link className={style.checkoutLink} to={"/checkout"}>
                                <button className={style.checkoutButton}>Checkout</button>
                            </Link>
                        </div>
                    </>
                :
                    (role === "customer")?
                        <p className={style.emptyCart}>Your cart has no items! Go to our <Link style={{textDecoration: "underline"}} to={"/products"}>catalogue</Link> to add some items.</p>
                    :
                        <p className={style.emptyCart}>You need to <Link  style={{textDecoration: "underline"}} to="/login"><b>login</b></Link> as a customer before checking your cart!</p>
            }
        </div>
    );
}