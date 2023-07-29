import { useContext, useEffect, useState } from "react"
import AdminProductsList from "./AdminProductsList";
import AdminCategoriesList from "./AdminCategoriesList";
import pageStyle from "../styles/pages.module.css";
import UserContext from "../context/UserProvider";
import { Link, useNavigate } from "react-router-dom";

export default function AdminPanel () {
    const { role } = useContext(UserContext);
    const navigate = useNavigate();
    const [primaryView, setPrimaryView] = useState(true);

    useEffect (() => {
        if (role != "admin") {
            navigate("/");
        }
    });

    return (
        <div>
            <div className={pageStyle.rowOfButtons}>
                <button className={pageStyle.individualButton} onClick={() => {setPrimaryView(true)}}>Show products list</button>
                <button className={pageStyle.individualButton} onClick={() => {setPrimaryView(false)}}>Show categories list</button>
                <Link to={(primaryView)? "/products/create" : "/categories/create"}>
                    <button className={pageStyle.individualButton}>Register a new {(primaryView)? "product" : "category"}</button>
                </Link>
            </div>
            {
                (primaryView)?
                    <AdminProductsList/>
                :
                    <AdminCategoriesList/>
            }
        </div>
    )
}