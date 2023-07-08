import { useQuery } from "react-query";
import Navbar from "../components/shared/Navbar";
import useGetData from "../hooks/useGetData";
import style from "../styles/pages.module.css";
import Card from "../components/unique/Card";
import { Link } from "react-router-dom";
import Loading from "../components/shared/Loading";

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
                {status == "loading" && <Loading/>}
                {status == "error" && <h1>Error!</h1>}
                {status == "success" &&
                    data.map((actual: any, index: number) => {
                        return (
                            <Link key={index} to="/products" state={{filter: actual.name}}>
                                <div className={style.gridCell}>
                                    <Card 
                                        id={actual.id} 
                                        name={actual.name} 
                                        image={actual.image} 
                                        creationDate={null} 
                                        updateDate={null}/>
                                </div>
                            </Link>
                        )
                    })
                    
                }
            </div>
            {/* <h1>CATEGORIES</h1> */}



            
        </>
    );
}