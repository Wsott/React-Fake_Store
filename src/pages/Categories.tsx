import { useQuery } from "react-query";
import style from "../styles/pages.module.css";
import Card from "../components/unique/Card";
import { Link } from "react-router-dom";
import Loading from "../components/shared/Loading";
import Error from "../components/shared/Error";
import { QUERY_KEY_CATEGORIES} from "../functions/GlobalConstants";
import { FetchWrapper } from "../functions/Functions";

export default function Categories () {
    const {data, status} = useQuery(QUERY_KEY_CATEGORIES, FetchWrapper);
    
    return (
        <>
            <p className={style.pageTitle}>List of categories</p>
            <div className={style.mainContent}>
                {status == "loading" && <Loading/>}
                {status == "error" && <Error/>}
                {status == "success" &&
                    data.map((actual: any, index: number) => {
                        return (
                            <Link key={index} to="/products" state={{name: actual.name, filter: "?categoryId=" + actual.id}}>
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