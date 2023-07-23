import axios from "axios";
import { useState, useEffect } from "react";
import { useMutation } from "react-query";
import { Link } from "react-router-dom";
import Loading from "../components/shared/Loading";
import { CategoryData } from "../functions/DataType";
import { URL_CATEGORIES } from "../functions/GlobalConstants";
import style from "../styles/components.module.css";
import pageStyle from "../styles/pages.module.css";

export default function AdminCategoriesList () {
    const [ data, setData ] = useState<CategoryData[]>();
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
    }, [])
    
    return (
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
                                                <button>
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