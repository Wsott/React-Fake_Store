import { useMutation, useQuery } from "react-query";
import { QUERY_KEY_CATEGORIES, URL_CREATE_PRODUCT } from "../../functions/GlobalConstants";
import { FetchWrapper } from "../../functions/Functions";
import Loading from "../shared/Loading";
import style from "../../styles/components.module.css";
import { CreateProductData } from "../../functions/DataType";
import axios from "axios";

export default function AdminProductForm () {
    const {data, status} = useQuery(QUERY_KEY_CATEGORIES, FetchWrapper);
    const registerProductMutation = useMutation(
        (data: CreateProductData) => {
            return axios.post(URL_CREATE_PRODUCT, data);
        }
    )

    function handleForm (event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);

        const title: string = formData.get("title") as string;
        const price: number = formData.get("price") as number;
        const description: string = formData.get("desc") as string;
        const categoryId: number = formData.get("category") as number;
        const images: Array<string> = new Array(formData.get("image") as string);

        const data: CreateProductData = {
            title,
            price,
            description,
            categoryId,
            images
        }

        console.log(data);
        registerProductMutation.mutate(data);
        
    }
    
    return (
        <div className={style.centeredContainer}>
            {status == "loading" && <Loading/>}
            {status == "success" &&
                <>
                
                <form onSubmit={handleForm} className={style.adminProductContainer}>
                    <p className={style.importantText}>Admin panel for products</p>
                    <label htmlFor="title">Title</label>
                    <input className={style.loginInput} type="text" name="title" id="title" />
                    <div className={style.dualContainer}>
                        <label htmlFor="price">Price</label>
                        <label htmlFor="category">Category</label>
                        <input className={style.loginInput} type="number" name="price" id="price" min={1} defaultValue={1} />

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