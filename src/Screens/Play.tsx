import firebase from 'firebase';
import React, { useReducer, useState } from 'react';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Card from '../Components/GameComponents/Card';
import CardForm from '../Components/GameComponents/CardForm';
import { api_url } from '../public/variables';

function Play(props:any){
    const location:any = useLocation();
    let elements = JSON.parse(location.state.elements);
    let gameID = location.state.gameID;
    const [elemUpdated, setElemUpdated] = useState(Array())
    const [ignored, forceUpdate] = useState(0);
    const [first, setFirst] = useState(0);
    const [nodes, setNodes] = useState(Array());
    const [nextFormNode, setNextFormNode] = useState("");
 //   const [lastNode, setLastNode] = useState(0);

    let nodeList = Array();
    useEffect(() => {
        async function sendMessage(){
            var m = new Date();
            const offsetMs = m.getTimezoneOffset() * 60 * 1000;
            const dateLocal = new Date(m.getTime() - offsetMs);
            const dateAndTimeNow = dateLocal.toISOString().slice(0, 19).replace(/-/g, "/").replace("T", " ");
            try{
                await fetch(api_url+'message/send', {
                    method: 'POST',
                    headers: {
                        "Access-Control-Allow-Origin" : "*", 
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ 
                        gameID: gameID,
                        userID: firebase.auth().currentUser?.uid,
                        dateAndTime: dateAndTimeNow,
                    })
                });
            } catch(err){
                console.log("erro ao enviar mensagem: "+err)
            }
        }
        sendMessage();
    }, [])
    
    const sendMessageCard = async (lastNodeId:string) => {
        try{
            await fetch(api_url+'message/send', {
                method: 'POST',
                headers: {
                    "Access-Control-Allow-Origin" : "*", 
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ 
                    gameID: gameID,
                    userID: firebase.auth().currentUser?.uid,
                    lasNode: lastNodeId
                })
            });
        } catch(err){
            console.log("erro ao enviar mensagem: "+err)
        }
    }

    const onChoiceClick = async (id:any) => {
        setNextFormNode(id);
        setFirst(first => first = first + 1);
        if(elemUpdated !== undefined)
            setElemUpdated(elemUpdated.splice(0, elemUpdated.length))
        let arrAux = Array();
        await elements.map((item:any, index:any) => {
            arrAux.push(item)
            if(item.id === id){
                item.data.show = true;
                arrAux[index].data.show = true;
                if(arrAux.length < 3)
                    sendMessageCard(arrAux[arrAux.length-2].id)
                else
                    sendMessageCard(arrAux[arrAux.length-3].id);
                
                setElemUpdated(arrAux);
                forceUpdate(ignored => ignored = ignored + 1);
            }
        })
    }
    
    return(
        <div>
            {ignored === 0 ? elements.map((element:any, index:any) => {
            if(element.data !== undefined){
                if(element.data.show || index === 0){
                    if(element.data.duration && element.data.duration > 0){
                        console.log("DURATION: ", element.data.duration);
                       
                        let count = 0;
                        let interval = setInterval(() => {
                            console.log(count++);
                            if(count === element.data.duration){
                                onChoiceClick(element.data.nextNodes[1].id);
                                clearInterval(interval);
                                console.log('clear interval');
                            }
                        }, 1000); 
                    }
                    console.log('element: ',element)
                    nodes.push(element.id)
                    nodeList = nodes;
                    if(element.type === 'formType'){
                        return(
                            <CardForm
                                key={index}
                                backgroundColor={element.data.bgColor}
                                choices={nextFormNode}
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
            }
        })
        :
        elemUpdated.map((element:any, index:any) => {
            if(element.data !== undefined){
                if(element.data.show){
                    if(first === 1){
                        nodes.push(element.id);
                        nodeList = nodes;
                    }else{
                        nodes.push(element.id);
                        nodeList = [nodes[nodes.length-2], nodes[nodes.length-1]]
                    }
                    if(element.data.nextNodes.length > 0 && element.data.duration && element.data.duration > 0){
                        console.log("DURATION: ", element.data.duration);
                      /*   let count = 0;
                        let interval = setInterval(() => {
                            console.log(count++);
                            if(count === element.data.duration){
                                onChoiceClick(element.data.nextNodes[1].id);
                                clearInterval(interval);
                                console.log('clear interval');
                            }
                        }, 1000); */
                    }
                    if(element.type === 'formType'){
                        return(
                            <CardForm
                                key={index}
                                backgroundColor={element.data.bgColor}
                                choices={nextFormNode}
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
            }
        }) 
        }
        </div>     
    )
}

export default Play;