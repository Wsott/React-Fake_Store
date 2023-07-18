import style from "../../styles/components.module.css"

export default function Loading () {
    return (
        <div className={style.statusContainer}>
            <img className={style.loader} src="/loader.gif" alt="Loading content" />
            <span className={style.loaderMessage}>Loading...</span>
        </div>
    );
}