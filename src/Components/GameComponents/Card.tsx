import react from 'react';
import './GameComponentsStyle/Card.css';

export default function Card(props:any){
    return(
        <div className="containerGameCard" style={{backgroundColor: props.backgroundColor}}>
            <p className='history'>{props.history}</p>
            <div className='ImgGameContainer'>
                <img className='ImgGameStyle' alt="imagem" src={props.src}/>
            </div>    
            <div>
                {props.choices.map((item:any, index:any) => {
                    return(
                        <span className="choices" >{item.choice}</span>
                    )
                })}     
            </div>  
        </div>
    )
}
//#c1a767