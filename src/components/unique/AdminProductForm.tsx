import { useQuery } from "react-query";
import { QUERY_KEY_CATEGORIES } from "../../functions/GlobalConstants";
import { FetchWrapper } from "../../functions/Functions";
import Loading from "../shared/Loading";

export default function AdminProductForm () {
    const {data, status} = useQuery(QUERY_KEY_CATEGORIES, FetchWrapper);
    
    return (
        <div>
            {status == "loading" && <Loading/>}
            {status == "success" &&
                <>
                <p>Add a new product to the store</p>
                <form>
                    <label htmlFor="name">Name</label>
                    <input type="text" name="name" id="name" />
                    <label htmlFor="price">Price</label>
                    <input type="number" name="price" id="price" />
                    <label htmlFor="desc">Description</label>
                    <textarea name="desc" id="desc" cols="50" rows="10" />
                    <label htmlFor="category">Category</label>
                    <select name="category" id="category" defaultValue={"selectOne"}>
                        <option value={"selectOne"} disabled={true}>Select a category</option>
                        {
                            data.map ((actual: any, index: number) => {
                                return (
                                    <option value={actual.id}>{actual.name}</option>
                                )
                            })
                        }
                    </select>
                    <label htmlFor="image">Image</label>
                    <input type="url" name="image" id="image" />
                </form>
                </>
            }
        </div>
    );
}