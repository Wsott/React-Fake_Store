// import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { QUERY_KEY_PRODUCTS } from "../functions/GlobalConstants";
// import { ProductData } from "../functions/DataType";
import style from "../styles/components.module.css";
import pageStyle from "../styles/pages.module.css";
import Loading from "../components/shared/Loading";
import { Link, useNavigate } from "react-router-dom";
import ConfirmationDialog from "../components/unique/ConfirmationDialog";
import UserContext from "../context/UserProvider";
import { FetchProductWrapper } from "../functions/Functions";

export default function AdminProductsList () {
    //const [ data, setData ] = useState<ProductData[]>();
    const [ deleteID, setDeleteID ] = useState<number>(0);
    const [ deleteName, setDeleteName ] = useState<string>("");
    const [ dialogVisible, setVisibility ] = useState(false);
    const { role } = useContext(UserContext);
    const navigate = useNavigate();

    const {data} = useQuery(QUERY_KEY_PRODUCTS, FetchProductWrapper);

    // const productsMutation = useMutation(
    //     () => {
    //         return axios.get(URL_PRODUCTS);
    //     },
    //     {
    //         onSuccess: (data) => {
    //             setData(data.data);
    //         }
    //     }
    // )

    useEffect (() => {
        if (role != "admin") {
            navigate("/");
        }

        //productsMutation.mutate();
    }, []);

    function handleDelete (id: number, name: string) {
        setDeleteID(id);
        setDeleteName(name);
        setVisibility(true);
    }

    function updateList () {
        //productsMutation.mutate();
        setVisibility(false);
    }
    
    return (
            
            (dialogVisible) ?
                <ConfirmationDialog name={deleteName} id={deleteID} type={"product"} updateFunction={updateList}/>
            :
                <>
                    <div className={style.centeredTitle}>
                        <h1>List of products</h1>
                    </div>
                    <div className={pageStyle.adminMainContent}>
                            {
                                (data)?
                                    <table className={pageStyle.adminTable}>
                                    <tr className={pageStyle.headerRow}>
                                        <th>
                                            ID
                                        </th>
                                        <th>
                                            Title
                                        </th>
                                        <th>
                                            Price
                                        </th>
                                        <th>
                                            Operations
                                        </th>
                                    </tr>
                                    {
                                        data.map((actual: any, index: number) => {
                                            return (
                                            <tr className={pageStyle.commonRow}>
                                                <td>{actual.id}</td>
                                                <td>{actual.title}</td>
                                                <td>{actual.price}</td>
                                                <td key={index}>
                                                    <Link to={"/products/edit/" + actual.id}>
                                                        <button>
                                                            Edit
                                                        </button>
                                                    </Link>
                                                        <button onClick={() => handleDelete(actual.id, actual.title)}>
                                                            Delete
                                                        </button>
                                                </td>
                                            </tr>
                                            )
                                        })
                                    }
                                </table>
                                :
                                    <Loading/>
                            }
                    </div>
                </>
            
    )
}