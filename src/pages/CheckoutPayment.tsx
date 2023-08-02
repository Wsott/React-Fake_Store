import { Separator } from "../components/shared/Separator";
import { CheckoutConfirmOperation } from "../functions/DataType";
import style from "../styles/pages.module.css";

export default function CheckoutPayment ( {nextPart}: CheckoutConfirmOperation ) {
    return (
        <div className={style.checkoutShippingContainer}>
            <p className={style.checkoutShippingTitle}>Payment details</p>
            <Separator/>
            <div className={style.checkoutInputContainerOne}>
                <input className={style.checkoutInput} type="text" placeholder={"Cardholder Name"} />
            </div>
            <div className={style.checkoutInputContainerOne}>
                <input className={style.checkoutInput} type="text"disabled={true} placeholder={"Card Number"} />
            </div>
            <div className={style.checkoutInputContainerThree}>
                <input className={style.checkoutInput} type="text" disabled={true} placeholder={"Month"} />
                <input className={style.checkoutInput} type="text" disabled={true} placeholder={"Year"} />
                <input className={style.checkoutInput} type="text" disabled={true} placeholder={"CVC"} />
            </div>
            <Separator/>
            <button className={style.checkoutShippingButton} onClick={() => {nextPart()}}>Confirm payment</button>
        </div>
    );
}