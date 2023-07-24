import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { useMutation } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { CreateCategoryData } from "../../functions/DataType";
import { URL_CATEGORIES, URL_PRODUCTS } from "../../functions/GlobalConstants";
import Loading from "../shared/Loading";
import style from "../../styles/components.module.css";
import UserContext from "../../context/UserProvider";

export default function AdminCategoryForm () {
    //const {data, status} = useQuery(QUERY_KEY_CATEGORIES, FetchWrapper);
    const { role } = useContext(UserContext);
    const navigate = useNavigate();
    const [categoryData, setCategoryData] = useState<CreateCategoryData|null>(null)
    const {id}: any = useParams();
    
    const registerProductMutation = useMutation(
        (data: CreateCategoryData) => {
            if (categoryData == null) {
                return axios.post(URL_CATEGORIES, data);
            }
            else {
                return axios.put(URL_CATEGORIES + id, data);
            }
        }
    );

    const categoryDataMutation = useMutation(
        (id: string) => {
            return axios.get(URL_CATEGORIES + id);
        },
        {
            onSuccess: (data) => {
                console.log(data);
                const foundCategory: CreateCategoryData = {
                    name: data.data.name,
                    image: data.data.image
                }
                console.log("=> " + foundCategory);
                setCategoryData(foundCategory);
            }
        }
    )

    useEffect(() => {
        if (role != "admin") {
            navigate("/");
        }

        if (typeof(id) == "string") {
            // alert("TENGO QUE ACTUALIZAR: " + typeof(id));
            categoryDataMutation.mutate(id);
        }
        else {
            //alert("NO PASA NADA PORQUE ESTOY CREANDO");
        }
    }, [])

    function handleForm (event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
//const price: number | null = priceValue !== null ? Number(priceValue) : null;

        const name: string = formData.get("name") as string;
        const image: string = formData.get("image") as string;

        const categoryData: CreateCategoryData = {
            name,
            image
        }

        console.log(categoryData);
        registerProductMutation.mutate(categoryData);
        
    }
    
    return (
        <div className={style.centeredContainer}>
            {/* {status == "loading" && <Loading/>}
            {status == "success" && */}
                <>
                
                <form onSubmit={handleForm} className={style.adminProductContainer}>
                    <p className={style.importantText}>Admin panel for categories</p>
                    <label htmlFor="name">Name</label>
                    <input className={style.loginInput} type="text" name="name" id="name" defaultValue={categoryData?.name} />                    
                    <label htmlFor="image">Image</label>
                    <input className={style.loginInput} type="url" name="image" id="image" defaultValue={categoryData?.image} />
                    <button className={style.genericFormButton}>Update data</button>
                </form>
                </>
            {/* } */}
        </div>
    );
}