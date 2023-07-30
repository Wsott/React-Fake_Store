import style from "../../styles/components.module.css";

export interface CheckoutRowData {
    title: string;
    price: string;
    ammount: number;
    image: string;
}

export default function CheckoutRow ( {title, price, ammount, image}: CheckoutRowData) {
    return (
        <div className={style.containerCheckoutRow}>
            <img className={style.checkoutImage} src={image} alt={"Image of " + title} />
            <div className={style.checkoutTextContainer}>
                <p className={style.checkoutText}>{title}</p>
                <p className={style.checkoutText}>${price}</p>
                <div className={style.ammountContainer}>
                    <p className={style.ammountText}>Ammount: </p>
                    <button className={style.ammountButton}>-</button>
                    <p className={style.ammountText}>{ammount}</p>
                    <button className={style.ammountButton}>+</button>
                </div>
                <p className={style.checkoutText}>= ${ammount * Number(price)}</p>
            </div>
        </div>
    );
}