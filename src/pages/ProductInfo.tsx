import { useMutation } from "react-query";
import { Link, useParams } from "react-router-dom";
import { URL_PRODUCTS } from "../functions/GlobalConstants";
import axios from "axios";
import Loading from "../components/shared/Loading";
import { useContext, useEffect, useState } from "react";
import { CartItem, ProductData } from "../functions/DataType";
import pageStyle from "../styles/pages.module.css";
import { Separator } from "../components/shared/Separator";
import CartContext from "../context/CartProvider";
import NotFound from "./NotFound";
import UserContext from "../context/UserProvider";

export default function ProductInfo () {
    const cartContextData = useContext(CartContext);
    const { role } = useContext(UserContext);

    const {id}: any = useParams();
    const [data, setData] = useState<ProductData>();
    const [error, setError] = useState<boolean>(false);
    const findProductMutation = useMutation(
        (id: string) => {
            return axios.get(URL_PRODUCTS + id);
        },
        {
            onSuccess: (data) => {
                setData(data.data);
            },
            onError: () => {
                setError(true);
            }
        }
    );

    useEffect (() => {
        findProductMutation.mutate(id);
    }, [])

    function handleClick () {
        if (data) {
            const newItem: CartItem = {
                id: data.id,
                title: data.title,
                price: data.price,
                image: data.images[0],
                amount: 1
            };
            
            cartContextData.addItem(newItem);
        }
    }
    
    return (
        <>
        {
            (data)?
                <div className={pageStyle.centeredContent}>
                    <div className={pageStyle.productImageContainer}>
                        <img className={pageStyle.productImage} src={data.images[0]} alt="" />
                    </div>
                    <div className={pageStyle.productInfo}>
                        <p className={pageStyle.productTitle}>{data.title}</p>
                        <Separator/>
                        <p className={pageStyle.productDescription}>{data.description}</p>
                        <p className={pageStyle.productPrice}>${data.price}</p>
                        {
                        (role === "customer")?
                            <button onClick={handleClick} className={pageStyle.addToCart}>Add to the cart</button>
                        :
                            <p className={pageStyle.productDescription}>
                                You need to <Link  style={{textDecoration: "underline"}} to="/login"><b>login</b></Link> as a customer before adding items to your cart!
                            </p>
                        }
                    </div>
                </div>
            :
                (!error)?
                    <Loading/>
                :
                    <NotFound returnTo={"/products"}/>
        }
        </>
    );
}