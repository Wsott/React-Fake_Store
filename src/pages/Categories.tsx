import { useQuery } from "react-query";
import Navbar from "../components/shared/Navbar";
import useGetData from "../hooks/useGetData";
import style from "../styles/pages.module.css";
import Card from "../components/unique/Card";

const queryKeyCategories = "categories";
const URL = "https://api.escuelajs.co/api/v1/categories";

function FetchWrapper () {
    return useGetData(URL);
}

export default function Categories () {
    const {data, status} = useQuery(queryKeyCategories, FetchWrapper);
    
    return (
        <>
            <Navbar/>
            <div className={style.mainContent}>
                {status == "loading" && <h1>Cargando...</h1>}
                {status == "error" && <h1>Error!</h1>}
                {status == "success" &&
                    data.map((actual: any) => {
                        return (
                            <div className={style.gridCell}>
                                <Card 
                                    id={actual.id} 
                                    name={actual.name} 
                                    image={actual.image} 
                                    creationDate={null} 
                                    updateDate={null}/>
                            </div>
                        )
                    })
                    
                }
            </div>
            {/* <h1>CATEGORIES</h1> */}



            
        </>
    );
}