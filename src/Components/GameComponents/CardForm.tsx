import react, { useEffect, useState } from 'react';
import './GameComponentsStyle/Card.css';

export default function CardForm(props:any){
    var formDefault = [
        {question: "Pergunta1: ", type: "Scale"},
        {question: "Pergunta2: ", type: "Scale"},
        {question: "Pergunta3: ", type: "Alternative", alternatives:[
            {alternative: "alternativa A"},
            {alternative: "Alternativa B"},
            {alternative: "Alternativa C"}
        ]}
    ];
    const [formulario, setFormulario] = useState(formDefault);
    const [formTitle, setFormTitle] = useState("");
   
useEffect(() => {
    async function getForms(){
      const connectionsResult = await fetch('https://analyticsmodule-papiroproject.herokuapp.com/questionnaires/templates/TestePlataforma/LDhkmZP2tkXBTmrB4TNjKQQtXftJBJT337YZVumerK4ensx6Z4afxLy3kuQPJZGFEqW7jnLNYJFYKefbWUhp24MtzGa5T2fDg3Nvnp3DfPXhc27cW7kXZQ3SpJ2XGMxv', {
        method: 'GET',
        headers: {
          "Access-Control-Allow-Origin" : "*", 
          'Content-Type': 'application/json'
        }
      });
      const result = await connectionsResult.json();
      console.log(result[0])
      setFormulario(result[0].questions);
    //  setFormTitle(result.questionnaireTitle)
    }
    getForms();
  }, [])
    return(
        <div style={{backgroundSize: 'contain', backgroundImage: `url(${props.src})`, display: 'flex', flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <div className="containerGameCardForm" style={{backgroundColor: '#c2a767'}}>
                <div className="cardHeader">
                    <span className="cardTitle">{props.title}</span>
                </div>
                <div className="cardBodyForm">
                    <div className="">
                        {formulario.map((item) => {
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
                            <div> <span className="choices" onClick={() => props.onChoiceClick(props.choices)}>Continuar</span><br></br></div>
                        </div>  
                    </div>    
                </div>  
            </div>
        </div>
    )
}