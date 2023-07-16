import { useMutation, useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import { URL_PRODUCTS } from "../functions/GlobalConstants";
import Card from "../components/unique/Card";
import pageStyle from "../styles/pages.module.css";
import CategoriesFilter from "../components/unique/CategoriesFilter";
import axios from "axios";
import { useEffect, useState } from "react";



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
            console.log(URL_PRODUCTS + data.modifiers);
            return axios.get(URL_PRODUCTS + data.modifiers);
        },
        {
            onSuccess: (data) => {
                const name = data.data.name as string;
                //console.log(data.data);
                setData(data.data);
                //localStorage.setItem("name", data.data.name);
                //setUser(name)
                //console.log(name);
                // navigate("/");
            }
        }
    )

    useEffect (() => {
        productsMutation.mutate({modifiers: ""});
    }, []);

    function updateFilter (newFilter: string) {
        console.log(newFilter);
        productsMutation.mutate({modifiers: newFilter});
    }

    

    return (
        <>
            <h1>Productos filtrado por: {(state)? state.filter : "no filter"}</h1>
            <div className={pageStyle.sectionedPage}>
                <div className={pageStyle.sideBar}>
                    <CategoriesFilter updateFilter={updateFilter}/>                    
                </div>
                <div className={pageStyle.mainContentOnSectioned}>
                    {
                        (data) &&
                            data.map((actual: any, index: number) => {
                                return <Card 
                                    key={index}
                                    id={actual.id} 
                                    name={actual.title} 
                                    image={actual.images[0]} 
                                    creationDate={null} 
                                    updateDate={null}/>
                            })
                    }
                    {/* {
                        status == "success" &&
                            data.map((actual: any, index: number) => {
                                return (
                                    <Card 
                                        key={index}
                                        id={actual.id} 
                                        name={actual.title} 
                                        image={actual.images[0]} 
                                        creationDate={null} 
                                        updateDate={null}/>
                                )
                            })
                    } */}
                </div>
            </div>
        </>
    );
}