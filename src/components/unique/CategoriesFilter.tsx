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
    const [ filter, setFilter ] = useState("");
    const [ titleFilter, setTitleFilter ] = useState("");
    const [ priceFilter, setPriceFilter ] = useState("");
    const preSelectedCategory = (preSelected)? preSelected.name : null;
    const [ psf, setPSF] = useState((preSelected)? preSelected.filter : null);

    function handleChange (event: React.ChangeEvent<HTMLInputElement>) {
        if (event.target.checked) {
            setFilter (event.target.value + "&");
        }
    }

    function handleTitleFilter (event: React.ChangeEvent<HTMLInputElement>) {
        setTitleFilter ("title=" + event.target.value + "&");
    }

    function handlePriceFilter (event: React.ChangeEvent<HTMLInputElement>) {
        setPriceFilter ("price_min=1&price_max=" + event.target.value + "&");
    }

    useEffect (() => {
        console.log("?" + filter);
        updateFilter("?" + titleFilter + priceFilter + filter);
        
        if (psf) {
            updateFilter(psf);
            setPSF(null);
        }
    }, [filter, titleFilter, priceFilter] )
    
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
                        )
                    })
                    
                }
                <label htmlFor="nameFilter">Filter by name</label>
                <input onChange={handleTitleFilter} type="text" name="nameFilter" id="nameFilter" />
                <label htmlFor="priceFilter">Filter by price</label>
                <input onChange={handlePriceFilter} type="number" name="priceFilter" id="priceFilter" min={1} defaultValue={1000} step={10}  />
            </div>
        </div>
    );
}