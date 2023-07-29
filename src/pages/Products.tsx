import { useMutation } from "react-query";
import { Link, useLocation } from "react-router-dom";
import { NO_IMAGE, URL_PRODUCTS } from "../functions/GlobalConstants";
import Card from "../components/unique/Card";
import pageStyle from "../styles/pages.module.css";
import CategoriesFilter from "../components/unique/CategoriesFilter";
import axios from "axios";
import { useEffect, useState } from "react";
import style from "../styles/components.module.css";
import Loading from "../components/shared/Loading";


interface ProductsSearchData {
    modifiers: string;
}

interface ProductData {
    id: number;
    title: string;
    price: number;
    description: string;
    category: any;
    images: any;
}

export default function Products () {
    const { state } = useLocation();
    const [ data, setData ] = useState<ProductData[]>();
    const productsMutation = useMutation(
        (data: ProductsSearchData) => {
            return axios.get(URL_PRODUCTS + data.modifiers);
        },
        {
            onSuccess: (data) => {
                setData(data.data);
            }
        }
    )
    
    useEffect (() => {
        if (!state) {
            productsMutation.mutate({modifiers: ""});
        }
    }, []);

    function updateFilter (newFilter: string) {
        productsMutation.mutate({modifiers: newFilter});
    }

    

    return (
        <>
            <div className={style.centeredTitle}>
                <h1>Listado de productos</h1>
            </div>
            <div className={pageStyle.sectionedPage}>
                <div className={pageStyle.sideBar}>
                    <CategoriesFilter updateFilter={updateFilter} preSelected={state}/>                    
                </div>
                <div className={pageStyle.mainContentOnSectioned}>
                    {
                        (data)?
                            data.map((actual: any, index: number) => {
                                return (
                                    <Link to={"/products/" + actual.id}>
                                        <Card 
                                        key={index}
                                        id={actual.id} 
                                        name={actual.title + " - $" + actual.price} 
                                        image={actual.images[0].replace("unnamed.jpg", NO_IMAGE)} 
                                        creationDate={null} 
                                        updateDate={null}/>
                                    </Link>
                                )
                            })
                        :
                            <Loading/>
                    }
                </div>
            </div>
        </>
    );
}