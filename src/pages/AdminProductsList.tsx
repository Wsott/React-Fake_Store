import axios from "axios";
import { useEffect, useState } from "react";
import { useMutation } from "react-query";
import { URL_PRODUCTS } from "../functions/GlobalConstants";
import { ProductData } from "../functions/DataType";
import style from "../styles/components.module.css";
import pageStyle from "../styles/pages.module.css";
import Loading from "../components/shared/Loading";
import Card from "../components/unique/Card";
import { Link } from "react-router-dom";

export default function AdminProductsList () {
    const [ data, setData ] = useState<ProductData[]>();
    const productsMutation = useMutation(
        () => {
            return axios.get(URL_PRODUCTS);
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
                <h1>Listado de productos</h1>
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
                                        <td>
                                            <Link to={"/products/edit/" + actual.id}>
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