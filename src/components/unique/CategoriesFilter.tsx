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
    preSelected: any | null;
}

export default function CategoriesFilter ( {updateFilter, preSelected}: FilterComponent ) {
    const {data, status} = useQuery(QUERY_KEY_CATEGORIES, FetchWrapper);
    const [ filter, setFilter ] = useState("?");
    const preSelectedCategory = (preSelected)? preSelected.name : null;
    const [ psf, setPSF] = useState((preSelected)? preSelected.filter : null);

    function handleChange (event: React.ChangeEvent<HTMLInputElement>) {
        if (event.target.checked) {
            setFilter ("?" + event.target.value); //(filter + event.target.value + "&");
        }
        // else {
        //     setFilter (filter.replace(event.target.value + "&", ""));
        // }
    }

    useEffect (() => {
        if (!psf) {
            updateFilter(filter);
        }
        else {
            updateFilter(psf);
            setPSF(null);
        }
    }, [filter] )
    
    return (
        <div>
            <div className={style.categoryFilterContainer}>
                <p>Categories</p>
                {status == "success" &&
                    data.map((actual: any, index: number) => {
                        return (
                            <div key={index}>
                                <input 
                                defaultChecked={actual.name === preSelectedCategory}
                                onChange={handleChange} type="radio" value={"categoryId=" + actual.id} name="categoryOption" id="categoryOption" />
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