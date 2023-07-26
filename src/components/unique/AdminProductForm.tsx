import { useMutation, useQuery } from "react-query";
import { QUERY_KEY_CATEGORIES, URL_CREATE_PRODUCT, URL_PRODUCTS } from "../../functions/GlobalConstants";
import { FetchWrapper } from "../../functions/Functions";
import Loading from "../shared/Loading";
import style from "../../styles/components.module.css";
import { CreateProductData } from "../../functions/DataType";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import UserContext from "../../context/UserProvider";

export default function AdminProductForm () {
    const {data, status} = useQuery(QUERY_KEY_CATEGORIES, FetchWrapper);
    const [productData, setProductData] = useState<CreateProductData|null>(null)
    const {id}: any = useParams();
    const { role } = useContext(UserContext);
    const navigate = useNavigate();

    
    const registerProductMutation = useMutation(
        (data: CreateProductData) => {
            if (productData == null) {
                return axios.post(URL_CREATE_PRODUCT, data);
            }
            else {
                return axios.put(URL_CREATE_PRODUCT + id, data);
            }
        },
        {
            onSuccess: () => {
                navigate("/admin-panel");
            }
        }
    );

    const productDataMutation = useMutation(
        (id: string) => {
            return axios.get(URL_PRODUCTS + id);
        },
        {
            onSuccess: (data) => {
                console.log(data);
                const foundProduct: CreateProductData = {
                    title: data.data.title,
                    price: data.data.price,
                    description: data.data.description,
                    categoryId: data.data.category.id,
                    images: data.data.images
                }
                console.log("=> " + foundProduct);
                setProductData(foundProduct);
            }
        }
    )

    useEffect(() => {
        if (role != "admin") {
            navigate("/");
        }

        if (typeof(id) == "string") {
            //alert("TENGO QUE ACTUALIZAR: " + typeof(id));
            productDataMutation.mutate(id);
        }
        else {
            //alert("NO PASA NADA PORQUE ESTOY CREANDO");
        }
    }, [])

    function handleForm (event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
//const price: number | null = priceValue !== null ? Number(priceValue) : null;

        const title: string = formData.get("title") as string;
        const price: number | null = (formData.get("price") != null)? Number(formData.get("price")) : 0;
        const description: string = formData.get("desc") as string;
        const categoryId: number | null = (formData.get("category") != null)? Number(formData.get("category")) : 0;
        const images: Array<string> = new Array(formData.get("image") as string);

        const productData: CreateProductData = {
            title,
            price,
            description,
            categoryId,
            images
        }

        console.log(productData);
        registerProductMutation.mutate(productData);
        
    }
    
    return (
        <div className={style.centeredContainer}>
            {status == "loading" && <Loading/>}
            {status == "success" &&
                <>
                
                <form onSubmit={handleForm} className={style.adminProductContainer}>
                    <p className={style.importantText}>Admin panel for products</p>
                    <label htmlFor="title">Title</label>
                    <input className={style.loginInput} type="text" name="title" id="title" defaultValue={productData?.title} />
                    <div className={style.dualContainer}>
                        <label htmlFor="price">Price</label>
                        <label htmlFor="category">Category</label>
                        <input className={style.loginInput} type="number" name="price" id="price" min={1} defaultValue={productData?.price} />

                        <select className={style.loginInput} name="category" id="category" defaultValue={(productData)? productData?.categoryId : "selectOne"}>
                        <option value={"selectOne"} disabled={true}>Select a category</option>
                        {
                            data.map ((actual: any, index: number) => {
                                return (
                                    <option key={index} value={actual.id}>{actual.name}</option>
                                )
                            })
                        }
                    </select>
                    </div>
                    <label htmlFor="desc">Description</label>
                    <textarea className={style.fixedTextArea} name="desc" id="desc" cols={50} rows={5} defaultValue={productData?.description} />
                    
                    <label htmlFor="image">Image</label>
                    <input className={style.loginInput} type="url" name="image" id="image" defaultValue={productData?.images} />
                    <button className={style.genericFormButton}>Update data</button>
                </form>
                </>
            }
        </div>
    );
}