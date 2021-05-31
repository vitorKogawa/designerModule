import react, { useEffect } from 'react';
import './GameComponentsStyle/Card.css';

export default function Card(props:any){
    return(
        <div className="containerGameCard" style={{backgroundColor: '#c2a767'}}>
            <div className="cardHeader">
                <span className="cardTitle">{props.title}</span>
            </div>
            <div className="cardBody">
                <p className='history'>{props.history}</p>
                <div className='ImgGameContainer'>
                    <img className='ImgGameStyle' alt="imagem" src={props.src}/>
                </div>    
            </div>
            <div className="cardFooter">
                <div>
                    {props.choices.map((item:any, index:any) => {
                        return(
                           <div> <span key={index} className="choices" onClick={() => props.onChoiceClick(item.id)}>{index+1}. {item.choice}</span><br></br></div>
                        )
                    })}     
                </div>  
            </div>
        </div>
    )
}
//#c1a767