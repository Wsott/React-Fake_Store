import { useMutation, useQuery } from "react-query";
import { QUERY_KEY_CATEGORIES, URL_CATEGORIES } from "../../functions/GlobalConstants";
import axios from "axios";
import { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch/useFetch";
import style from "../../styles/components.module.css";

function FetchWrapper () {
    return useFetch(URL_CATEGORIES);
}

export default function CategoriesFilter () {
    const {data, status} = useQuery(QUERY_KEY_CATEGORIES, FetchWrapper);

    
    return (
        <div>
            <div className={style.categoryFilterContainer}>
                <p>Categories</p>
                {status == "success" &&
                    data.map((actual: any, index: number) => {
                        return (
                            <div>
                                <input type="checkbox" name="categoryOption" id="categoryOption" />
                                <label htmlFor="categoryOption">{actual.name}</label>
                            </div>
                            // <p>{actual.name}</p>
                        )
                    })
                    
                }
            </div>
        </div>
    );
}