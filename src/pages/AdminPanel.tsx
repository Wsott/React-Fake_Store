import { useState } from "react"
import AdminProductsList from "./AdminProductsList";
import AdminCategoriesList from "./AdminCategoriesList";
import pageStyle from "../styles/pages.module.css";

export default function AdminPanel () {
    const [primaryView, setPrimaryView] = useState(true);

    return (
        <div>
            <div className={pageStyle.rowOfButtons}>
                <button className={pageStyle.individualButton} onClick={() => {setPrimaryView(true)}}>Show products list</button>
                <button className={pageStyle.individualButton} onClick={() => {setPrimaryView(false)}}>Show categories list</button>
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