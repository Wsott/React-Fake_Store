import { useMutation, useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { URL_PRODUCTS } from "../functions/GlobalConstants";
import axios from "axios";
import Loading from "../components/shared/Loading";
import { useContext, useEffect, useState } from "react";
import { CartData, CartItem, ProductData } from "../functions/DataType";
import pageStyle from "../styles/pages.module.css";
import { Separator } from "../components/shared/Separator";
import CartContext from "../context/CartProvider";

export default function ProductInfo () {
    const cartContextData = useContext(CartContext);

    const {id}: any = useParams();
    const [data, setData] = useState<ProductData>();
    const findProductMutation = useMutation(
        (id: string) => {
            return axios.get(URL_PRODUCTS + id);
        },
        {
            onSuccess: (data) => {
                setData(data.data);
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
                ammount: 1
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
                        <button onClick={handleClick} className={pageStyle.addToCart}>Add to the cart</button>
                    </div>
                </div>
            :
                <Loading/>
        }
        </>
    );
}