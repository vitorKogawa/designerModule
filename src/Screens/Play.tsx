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
        <div>
            {ignored === 0 ? elements.map((element:any, index:any) => {
            if(element.data !== undefined){
                if(element.data.show || index === 0){
                    return(
                        <Card 
                            key={index}
                            backgroundColor={element.data.bgColor}
                            history={element.data.compiled_content}
                            src={'http://localhost:8080/'+element.data.image}
                            choices={element.data.nextNodes}
                            title={element.data.title}
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
                    return(
                        <Card 
                            key={index}
                            backgroundColor={element.data.bgColor}
                            history={element.data.compiled_content}
                            src={'http://localhost:8080/'+element.data.image}
                            choices={element.data.nextNodes}
                            title={element.data.title}
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