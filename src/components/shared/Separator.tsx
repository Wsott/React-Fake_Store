import style from "../../styles/components.module.css";

export function Separator () {
    return (
        <div className={style.separator}>
            <hr className={style.separatorLines} />
            <p className={style.separatorDecoration}>O</p>
            <hr className={style.separatorLines} />
        </div>
    );
}