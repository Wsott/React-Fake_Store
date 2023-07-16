import { useQuery } from "react-query";
import { QUERY_KEY_CATEGORIES, URL_CATEGORIES } from "../../functions/GlobalConstants";
import { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch/useFetch";
import style from "../../styles/components.module.css";

function FetchWrapper () {
    return useFetch(URL_CATEGORIES);
}

interface FilterComponent {
    updateFilter: (input: string) => void;
}

export default function CategoriesFilter ( {updateFilter}: FilterComponent ) {
    const {data, status} = useQuery(QUERY_KEY_CATEGORIES, FetchWrapper);
    const [ filter, setFilter ] = useState("?");

    function handleChange (event: React.ChangeEvent<HTMLInputElement>) {
        if (event.target.checked) {
            setFilter (filter + event.target.name + "&");
        }
        else {
            setFilter (filter.replace(event.target.name + "&", ""));
        }
    }

    useEffect (() => {
        updateFilter(filter);
    }, [filter] )
    
    return (
        <div>
            <div className={style.categoryFilterContainer}>
                <p>Categories</p>
                {status == "success" &&
                    data.map((actual: any, index: number) => {
                        return (
                            <div key={index}>
                                <input onChange={handleChange} type="checkbox" name={"categoryId=" + actual.id} id="categoryOption" />
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