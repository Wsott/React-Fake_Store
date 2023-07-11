import { useLocation } from "react-router-dom";

export default function Products () {
    const { state } = useLocation();
    return (
        <>
            <h1>Productos filtrado por: {(state)? state.filter : "no filter"}</h1>
        </>
    );
}