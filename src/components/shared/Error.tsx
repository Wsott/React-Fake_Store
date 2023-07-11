import style from "../../styles/components.module.css"

export default function Error () {
    const messages = [
        "The API got tangled in its own cables. Please try again later.",
        "The API is experiencing a temporary existential crisis. It'll be back soon.",
        "The API's horoscope predicted network connectivity issues. We apologize.",
        "The API is having an existential crisis. It's pondering the meaning of endpoints.",
        "API insists it's a teapot. We're as confused as you."
    ]

    return (
        <div className={style.statusContainer}>
            <img className={style.loader} src="src\assets\error.gif" alt="Something went wrong!" />
            <span className={style.loaderMessage}>{messages[Math.floor(Math.random() * 5)]}</span>
        </div>
    );
}