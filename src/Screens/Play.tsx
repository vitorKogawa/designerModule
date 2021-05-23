import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Card from '../Components/GameComponents/Card';

function Play(props:any){
    const location:any = useLocation();
    const elements = JSON.parse(location.state.elements);
    return(
        <div style={{backgroundSize: 'cover', backgroundImage: "url('http://localhost:8080/img2.jpg')", display: 'flex', flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            {elements.map((element:any, index:any) => {
                if(element.data !== undefined){
                    return(
                        <Card 
                            key={index}
                            backgroundColor={element.data.bgColor}
                            history={element.data.history}
                            src={'http://localhost:8080/'+element.data.image}
                            choices={element.data.nextNodes}
                        />  
                    )
                }
  
            }
        )}
        </div>       
    )
}

export default Play;