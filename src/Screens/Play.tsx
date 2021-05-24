import React, { useReducer, useState } from 'react';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Card from '../Components/GameComponents/Card';

function Play(props:any){
    const location:any = useLocation();
    let elements = JSON.parse(location.state.elements);
    const [elemUpdated, setElemUpdated] = useState(Array())
    const [ignored, forceUpdate] = useReducer(x => x + 1, 0);

    const onChoiceClick = (id:any) =>{
        if(elemUpdated !== undefined)
            setElemUpdated(elemUpdated.splice(0, elemUpdated.length))
        let arrAux = Array();
        elements.map((item:any, index:any) => {
            arrAux.push(item)
            if(item.id === id){
                item.data.show = true;
                arrAux[index].data.show = true;
                setElemUpdated(arrAux);
                forceUpdate();
            }
        })
    }
    
    return(
        <div style={{backgroundSize: 'cover', backgroundImage: "url('http://localhost:8080/img3.jpg')", display: 'flex', flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            {ignored === 0 ? elements.map((element:any, index:any) => {
            if(element.data !== undefined){
                if(element.data.show || index === 0){
                    console.log('entrou ', elements)
                    return(
                        <Card 
                            key={index}
                            backgroundColor={element.data.bgColor}
                            history={element.data.history}
                            src={'http://localhost:8080/'+element.data.image}
                            choices={element.data.nextNodes}
                            onChoiceClick={onChoiceClick}
                        />  
                    )
                }  
            }
        })
        :
        elemUpdated.map((element:any, index:any) => {
            if(element.data !== undefined){
                if(element.data.show){
                    console.log('entrou ', elements)
                    return(
                        <Card 
                            key={index}
                            backgroundColor={element.data.bgColor}
                            history={element.data.history}
                            src={'http://localhost:8080/'+element.data.image}
                            choices={element.data.nextNodes}
                            onChoiceClick={onChoiceClick}
                        />  
                    )
                }  
            }
        }) 
        }
        </div>     
    )
}

export default Play;