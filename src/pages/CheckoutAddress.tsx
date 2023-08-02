import { Separator } from "../components/shared/Separator";
import { CheckoutConfirmOperation } from "../functions/DataType";
import style from "../styles/pages.module.css";

export default function CheckoutAddress ( {nextPart}: CheckoutConfirmOperation ) {
    return (
        <div className={style.checkoutShippingContainer}>
            <p className={style.checkoutShippingTitle}>Shipping information</p>
            <Separator/>
            <div className={style.checkoutInputContainerTwo}>
                <input className={style.checkoutInput} type="text" placeholder={"First name"} />
                <input className={style.checkoutInput} type="text" placeholder={"Last name"} />
            </div>
            <div className={style.checkoutInputContainerTwo}>
                <input className={style.checkoutInput} type="text" placeholder={"Address"} />
                <input className={style.checkoutInput} type="text" placeholder={"Apartment, etc. (optional)"} />
            </div>
            <div className={style.checkoutInputContainerThree}>
                <input className={style.checkoutInput} type="text" placeholder={"City"} />
                <input className={style.checkoutInput} type="text" placeholder={"Country"} />
                <input className={style.checkoutInput} type="text" placeholder={"Zipcode"} />
            </div>
            <input className={style.checkoutInput} type="text" placeholder={"Other details"} />
            <Separator/>
            <button className={style.checkoutShippingButton} onClick={() => {nextPart()}}>Confirm address</button>
        </div>
    );
}