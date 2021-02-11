import './CardGameStyle.css';

export const CardGame = (props: any) => {
    return(
        <div className="CardContainer">
            <div className="ImgContainer">
                <img className="ImgStyle" alt="imagem" src={props.src} />
            </div>
            <div className="CardDescription">
                <h2>{props.title}</h2>
                <p>{props.description}</p>
            </div>
        </div>
    );
}