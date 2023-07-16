import { useMutation, useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import { QUERY_KEY_PRODUCTS, URL_PRODUCTS } from "../functions/GlobalConstants";
import useFetch from "../hooks/useFetch/useFetch";
import Card from "../components/unique/Card";
import style from "../styles/components.module.css";
import pageStyle from "../styles/pages.module.css";
import CategoriesFilter from "../components/unique/CategoriesFilter";

function FetchWrapper () {
    return useFetch(URL_PRODUCTS);
}

export default function Products () {
    const { state } = useLocation();
    const { data, status } = useQuery(QUERY_KEY_PRODUCTS, FetchWrapper)

    return (
        <>
            <h1>Productos filtrado por: {(state)? state.filter : "no filter"}</h1>
            <div className={pageStyle.sectionedPage}>
                <div className={pageStyle.sideBar}>
                    <CategoriesFilter/>                    
                </div>
                <div className={pageStyle.mainContentOnSectioned}>
                    {
                        status == "success" &&
                            data.map((actual: any, index: number) => {
                                return (
                                    <Card 
                                        id={actual.id} 
                                        name={actual.title} 
                                        image={actual.images[0]} 
                                        creationDate={null} 
                                        updateDate={null}/>
                                )
                            })
                    }
                </div>
            </div>
        </>
    );
}