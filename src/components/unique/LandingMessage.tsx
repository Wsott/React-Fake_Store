import style from "../../styles/components.module.css";

interface MessageData {
    image: string;
    title: string;
    text: string;
    imageOnLeft: boolean;
}

export default function LandingMessage ( {image, title, text, imageOnLeft = false}: MessageData) {
    return (
        <div className={style.messageContainer}>
            {
            (imageOnLeft)?
                <div className={style.messageSubcontainerLeft}>
                    <img className={style.messageImage} src={image} alt={"Real picture"} />
                    <div className={style.messageTextContainer}>
                        <p className={style.messageTitle}>{title}</p>
                        <p className={style.message}>{text}</p>
                    </div>
                </div>
            :
                <div className={style.messageSubcontainerRight}>
                    <div className={style.messageTextContainer}>
                        <p className={style.messageTitle}>{title}</p>
                        <p className={style.message}>{text}</p>
                    </div>
                    <img className={style.messageImage} src={image} alt={"Real picture"} />                    
                </div>
            }
        </div>
    )
}