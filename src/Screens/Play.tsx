import firebase from 'firebase';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Card from '../Components/GameComponents/Card';
import CardForm from '../Components/GameComponents/CardForm';
import { api_url } from '../public/variables';

function Play(props: any){
    // const location:any = useLocation();
    // let elements = JSON.parse(location.state.elements);
    let elements = JSON.parse(window.localStorage.getItem("elements") as any)
    console.log(elements)
    const [nextFormNode, setNextFormNode] = useState("");
    const [elemUpdated, setElemUpdated] = useState(Array());
    const [duration, setDuration] = useState(0);
    const [nextNodeID, setNextNodeID] = useState("");

    useEffect(() => {
        let cont = 0;
        elements.forEach((element:any) => {
            if(element.data !== undefined){
                if(element.data.nodeStart === true){
                    element.data.show = true;
                    cont += 1;
                    setNextNodeID(element.data.nextNodes[1].id)
                    setDuration(element.data.duration)
                }
            }
        });
        if(cont === 0){
            elements[0].data.show = true;
            setNextNodeID(elements[0].data.nextNodes[0].id)
            setDuration(elements[0].data.duration);
        }
        setElemUpdated(elements);
    }, [])

    useEffect(() => {
        if(duration > 0){
            let countDuration = 0;
            let interval = setInterval(() => {
                countDuration += 1;
                console.log(countDuration);
                if(countDuration === duration){
                    clearInterval(interval);
                    onChoiceClick(nextNodeID);
                }
            }, 1000)
            return () => clearInterval(interval);
        }
    }, [duration])

    const onChoiceClick = async (id:any) => {
        setNextFormNode(id);
        await elements.map((item:any, index:any) => {
            if(item.id === id){
                item.data.show = true;
                if(item.data.nextNodes[0] != undefined)
                    setNextNodeID(item.data.nextNodes[0].id)
                setDuration(item.data.duration)
            }
        })
        setElemUpdated(elements)
    }

    const getForm = (id:any) => {
        return fetch(`${api_url}node/${id}`, {
            method: 'GET',
            headers: {
              "Access-Control-Allow-Origin" : "*", 
              'Content-Type': 'application/json'
            }
          }).then(result => result.json());
        
    }

    return(
        <div>
            {elemUpdated.map((element:any, index:any) => {
                if(element.data !== undefined && element.data.show){
                    if(element.type === 'formType'){
                        /* getForm(element.id).then(result => {
                            const formString = result.gameNode.form;

                            formString.map((item:any, index:any) => {
                                console.log(item)
                            })
                         });*/
                        return(
                            <CardForm
                                key={index}
                                backgroundColor={element.data.bgColor}
                                choices={element.data.nextNodes[0] ? element.data.nextNodes[0].id : ""}
                                title={"Formulário"}
                                onChoiceClick={onChoiceClick}
                            /> 
                        )
                    }else{
                        return(
                            <Card 
                                key={index}
                                backgroundColor={element.data.bgColor}
                                history={element.data.compiled_content}
                                src={`${api_url}nodes/`+element.data.image}
                                choices={element.data.nextNodes}
                                title={element.data.title}
                                onChoiceClick={onChoiceClick}
                            />  
                        )
                    }
                }
            })}
        </div>
    )
}
export default Play;