import { useLocation } from "react-router-dom";
import Navbar from "../components/shared/Navbar";
import { ProductsData as Data } from "../functions/DataType";

export default function Products () {
    const { state } = useLocation();
    return (
        <>
            <Navbar/>
            <h1>Productos filtrado por: {(state)? state.filter : "no filter"}</h1>
        </>
    );
}