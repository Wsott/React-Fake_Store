import { useQuery } from "react-query";
import useFetch from "../hooks/useFetch/useFetch";
import style from "../styles/pages.module.css";
import Card from "../components/unique/Card";
import { Link } from "react-router-dom";
import Loading from "../components/shared/Loading";
import Error from "../components/shared/Error";
import { URL, QUERY_KEY_CATEGORIES} from "../functions/GlobalConstants";

function FetchWrapper () {
    return useFetch(URL);
}

export default function Categories () {
    const {data, status} = useQuery(QUERY_KEY_CATEGORIES, FetchWrapper);
    
    return (
        <>
            <div className={style.mainContent}>
                {status == "loading" && <Loading/>}
                {status == "error" && <Error/>}
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
        </>
    );
}