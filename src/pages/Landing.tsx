import { useContext, useEffect } from "react";
import UserContext from "../context/UserProvider";
import { useMutation } from "react-query";
import { LoginToken } from "../functions/DataType";
import axios from "axios";
import { URL_PROFILE_FETCH } from "../functions/GlobalConstants";
import LandingMessage from "../components/unique/LandingMessage";
import style from "../styles/pages.module.css";

export default function Landing () {
    const { setUser, setRole } = useContext(UserContext);
    
    const nameMutation = useMutation(
        (data: LoginToken) => {
            return axios.get(URL_PROFILE_FETCH, {headers: {
                "Authorization": "Bearer " + data.access_token
            }});
        },
        {
            onSuccess: (data) => {
                const name = data.data.name as string;
                const role = data.data.role as string;

                setUser(name);
                setRole(role);
            }
        }
    )

    useEffect (() => {
        const tokens = JSON.parse(localStorage.getItem("session") || "{}");
        nameMutation.mutate(tokens);
    }, []);

    return (
        <>
        <div className={style.landingImageContainer}>
            <img className={style.landingImage} src="/landingImage.png" alt="Landing image" />
        </div>
        <LandingMessage 
            image={"/ecommerce.jpg"} 
            title={"Welcome to our online store!"} 
            text={"Ladies and gentlemen, we have a grand announcement to make! After a series of unfortunate financial events that involved missing rent payments and being evicted from our charming store, we've decided to make the leap into the dazzling world of cyberspace. Welcome to our online shop born out of our inability to keep a physical location afloat. With our impeccable track record of financial mishaps, we assure you that our prices are so low, they'll make your bank account do a double take. So, grab your virtual shopping carts, bid farewell to our nonexistent rent woes, and join us on this digital adventure where our inability to pay the bills works in your favor. "} 
            imageOnLeft={false}></LandingMessage>
        
        <LandingMessage 
            image={"/harold-customer.png"} 
            title={"Our customer's opinion"} 
            text={`"As an avid customer of this shop let me clarify that I'm not getting paid a single dime for this shameless endorsement. I simply can't resist the allure of their quirky collection, from rubber chickens to dancing disco socks. It's like stepping into a parallel universe where every purchase becomes an adventure, and my bank account weeps with joy. So, dear friends, if you ever find yourself craving an absurdly delightful shopping experience, head over to this shop - you won't regret it (but your wallet might)." - A real customer.`} 
            imageOnLeft={true} />

        <LandingMessage 
            image={"/losing-money.jpg"} 
            title={"The lowest prices in town"} 
            text={"We take pride in our incredibly low prices, so low that we're pretty sure we're losing money on every sale. How do we achieve such magnificently terrible financial decisions? Well, it's simple – we make all the wrong moves, much to the dismay of our competitors, investors, and regulators who despise us. You see, we're the renegades of the retail world, the masters of miscalculation, and the champions of budget-breaking deals. So, if you're looking for prices so low that they make accountants weep, come on down to our shop, where we're financially foolish for your benefit."} 
            imageOnLeft={false}></LandingMessage>
        
        <LandingMessage 
            image={"/no-refunds.jpg"} 
            title={"No refundings"} 
            text={"We take our 'no refunding' policy to heart, we have a heart of stone when it comes to returns. Once you've made a purchase, consider it a lifelong commitment. Our dedication to this policy is so unwavering that even the most charismatic lawyers won't sway us. So, choose wisely because when you walk through our doors, there's no turning back."} 
            imageOnLeft={true}></LandingMessage>
        </>
    );
}