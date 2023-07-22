import { useQuery } from "react-query";
import { QUERY_KEY_CATEGORIES } from "../../functions/GlobalConstants";
import { FetchWrapper } from "../../functions/Functions";
import Loading from "../shared/Loading";
import style from "../../styles/components.module.css";

export default function AdminProductForm () {
    const {data, status} = useQuery(QUERY_KEY_CATEGORIES, FetchWrapper);
    
    return (
        <div className={style.centeredContainer}>
            {status == "loading" && <Loading/>}
            {status == "success" &&
                <>
                
                <form className={style.adminProductContainer}>
                    <p className={style.importantText}>Admin panel for products</p>
                    <label htmlFor="name">Name</label>
                    <input className={style.loginInput} type="text" name="name" id="name" />
                    <div className={style.dualContainer}>
                        <label htmlFor="price">Price</label>
                        <label htmlFor="category">Category</label>
                        <input className={style.loginInput} type="number" name="price" id="price" />

                        <select className={style.loginInput} name="category" id="category" defaultValue={"selectOne"}>
                        <option value={"selectOne"} disabled={true}>Select a category</option>
                        {
                            data.map ((actual: any, index: number) => {
                                return (
                                    <option value={actual.id}>{actual.name}</option>
                                )
                            })
                        }
                    </select>
                    </div>
                    <label htmlFor="desc">Description</label>
                    <textarea className={style.fixedTextArea} name="desc" id="desc" cols={50} rows={5} />
                    
                    <label htmlFor="image">Image</label>
                    <input className={style.loginInput} type="url" name="image" id="image" />
                    <button className={style.genericFormButton}>Update data</button>
                </form>
                </>
            }
        </div>
    );
}