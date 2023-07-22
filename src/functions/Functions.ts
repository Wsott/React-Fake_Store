import useFetch from "../hooks/useFetch/useFetch";
import { URL_CATEGORIES } from "./GlobalConstants";

export function FetchWrapper () {
    return useFetch(URL_CATEGORIES);
}