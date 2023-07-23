import axios from "axios";
import { useState, useEffect } from "react";
import { useMutation } from "react-query";
import { Link } from "react-router-dom";
import Loading from "../components/shared/Loading";
import { CategoryData } from "../functions/DataType";
import { URL_CATEGORIES } from "../functions/GlobalConstants";
import style from "../styles/components.module.css";
import pageStyle from "../styles/pages.module.css";
import ConfirmationDialog from "../components/unique/ConfirmationDialog";

export default function AdminCategoriesList () {
    const [ data, setData ] = useState<CategoryData[]>();
    const [ deleteID, setDeleteID ] = useState<number>(0);
    const [ deleteName, setDeleteName ] = useState<string>("");
    const [ dialogVisible, setVisibility ] = useState(false);

    const productsMutation = useMutation(
        () => {
            return axios.get(URL_CATEGORIES);
        },
        {
            onSuccess: (data) => {
                setData(data.data);
            }
        }
    )

    useEffect (() => {
        productsMutation.mutate();
    }, []);

    function handleDelete (id: number, name: string) {
        setDeleteID(id);
        setDeleteName(name);
        setVisibility(true);
    }

    function updateList () {
        productsMutation.mutate();
        setVisibility(false);
    }
    
    return (
        (dialogVisible) ?
                <ConfirmationDialog name={deleteName} id={deleteID} type={"category"} updateFunction={updateList}/>
            :
            <>
                <div className={style.centeredTitle}>
                    <h1>List of categories</h1>
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
                                        Name
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
                                            <td>{actual.name}</td>
                                            <td key={index}>
                                                <Link to={""}>
                                                    <button>
                                                        Edit
                                                    </button>
                                                </Link>
                                                    <button onClick={() => handleDelete(actual.id, actual.name)}>
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