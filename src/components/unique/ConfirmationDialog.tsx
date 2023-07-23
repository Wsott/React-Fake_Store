import axios from "axios";
import { useMutation } from "react-query";
import { URL_CATEGORIES, URL_PRODUCTS } from "../../functions/GlobalConstants";
import style from "../../styles/components.module.css";
import pageStyle from "../../styles/pages.module.css";

interface DialogData {
    name: string;
    id: number;
    type: string;
    updateFunction: () => void;
}

export default function ConfirmationDialog ( {name, id, type, updateFunction}: DialogData) {
    const deleteProduct = useMutation(
        () => {
            if (type == "product") {
                return axios.delete(URL_PRODUCTS + id);
            }
            else {
                return axios.delete(URL_CATEGORIES + id);
            }
        },
        {
            onSuccess: (data) => {
                updateFunction();
            }
        }
    )

    function handleCancel () {
        updateFunction();
    }

    return (
        <div className={style.centeredContainerDialog}>
            <div className={style.dialogContainer}>
                <p className={style.mainMessage}>DELETE "{name}" WITH ID {id} FROM THE STOCK?</p>
                <div className={pageStyle.rowOfButtons}>
                    <button onClick={() => deleteProduct.mutate()} className={pageStyle.individualButton}>Delete element</button>
                    <button onClick={handleCancel} className={pageStyle.individualButton}>Cancel operation</button>
                </div>
            </div>
        </div>
    )
}