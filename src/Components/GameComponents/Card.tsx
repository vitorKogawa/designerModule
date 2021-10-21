import react, { useEffect } from 'react';
import './GameComponentsStyle/Card.css';

export default function Card(props:any){
    return(
        <div style={{backgroundSize: 'contain', backgroundImage: `url(${props.src})`, display: 'flex', flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <div className="containerGameCard" style={{backgroundColor: '#c2a767'}}>
                <div className="cardHeader">
                    <span className="cardTitle">{props.title}</span>
                </div>
                <div className="cardBody">
                    <p className='ImgGameContainer' dangerouslySetInnerHTML={{ __html: props.history }}></p>
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
        </div>
    )
}