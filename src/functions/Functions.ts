import useFetch from "../hooks/useFetch/useFetch";
import { URL_CATEGORIES, URL_PRODUCTS } from "./GlobalConstants";

export function FetchWrapper () {
    return useFetch(URL_CATEGORIES);
}

export function FetchProductWrapper () {
    return useFetch(URL_PRODUCTS);
}