import {CardData as Data} from "../../interfaces/DataType";
import style from "../../styles/components.module.css";

export default function Card (inputData: Data) {
    return (
        <div className={style.cardContainer}>
            <img className={style.cardImage} src={inputData.image} alt={"Image of " + inputData.name} />
            <div className={style.cardDescription}>
                <h3>{inputData.name}</h3>
            </div>
        </div>
    );
}