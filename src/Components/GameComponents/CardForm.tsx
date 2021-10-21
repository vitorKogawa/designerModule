import react, { useEffect } from 'react';
import './GameComponentsStyle/Card.css';

const form = [
    {question: "Pergunta1: ", type: "Scale"},
    {question: "Pergunta2: ", type: "Scale"},
    {question: "Pergunta3: ", type: "Alternative", alternatives:[
        {alternative: "alternativa A"},
        {alternative: "Alternativa B"},
        {alternative: "Alternativa C"}
    ]
    },
    {question: "Pergunta1: ", type: "Scale"},
    {question: "Pergunta2: ", type: "Scale"},
    {question: "Pergunta3: ", type: "Alternative", alternatives:[
        {alternative: "alternativa A"},
        {alternative: "Alternativa B"},
        {alternative: "Alternativa C"}
    ]
    },
    {question: "Pergunta1: ", type: "Scale"},
    {question: "Pergunta2: ", type: "Scale"},
    {question: "Pergunta3: ", type: "Alternative", alternatives:[
        {alternative: "alternativa A"},
        {alternative: "Alternativa B"},
        {alternative: "Alternativa C"}
    ]
    },
    {question: "Pergunta1: ", type: "Scale"},
    {question: "Pergunta2: ", type: "Scale"},
    {question: "Pergunta3: ", type: "Alternative", alternatives:[
        {alternative: "alternativa A"},
        {alternative: "Alternativa B"},
        {alternative: "Alternativa C"}
    ]
    }
]

export default function CardForm(props:any){
    return(
        <div style={{backgroundSize: 'contain', backgroundImage: `url(${props.src})`, display: 'flex', flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <div className="containerGameCardForm" style={{backgroundColor: '#c2a767'}}>
                <div className="cardHeader">
                    <span className="cardTitle">{props.title}</span>
                </div>
                <div className="cardBodyForm">
                    <div className="">
                        {form.map((item) => {
                            if(item.type === "Scale"){
                                return(
                                    <div className="question">
                                        <label className="question_title">{item.question}</label>
                                        <div>
                                            <input type="range" />
                                        </div>
                                    </div>
                                )
                            }else{
                                return(
                                    <div className="question">
                                        <label className="question_title">{item.question}</label>
                                        {item.alternatives?.map(element => {
                                            return(
                                                <div>
                                                    <input type="radio" name="alternative" value={element.alternative}/>
                                                    <label>{element.alternative}</label>                                        
                                                </div>
                                            )
                                        })}       
                                    </div>
                                )
                            }
                        })} 
                    </div> 
                </div>
                <div>
                    <div className="cardFooterForm">
                        <div>
                            {console.log(props.choices)}
                            <div> <span className="choices" onClick={() => props.onChoiceClick(props.choices)}>Continuar</span><br></br></div>
                        </div>  
                    </div>    
                </div>  
            </div>
        </div>
    )
}