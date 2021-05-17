import React, { useState, useRef, useEffect } from 'react';
import ReactFlow, { removeElements, addEdge, MiniMap, Controls, Background, Elements, Edge, Connection, OnLoadParams, BackgroundVariant, ArrowHeadType } from 'react-flow-renderer';
import CustomNodeComponent from '../Components/EditorComponents/CustomNodeComponent';
import Sidebar from '../Components/EditorComponents/Sidebar';
import NodeEdit from '../Components/EditorComponents/NodeEdit';
import TopMenu from '../Components/EditorComponents/TopMenu';
import { api_url } from '../public/variables';
import firebase from 'firebase/app';
import "firebase/auth";


const nodeTypes = {
  special: CustomNodeComponent,
};

function EditorScreen(props: any){
  let initialElements = [
    {
      id: "1000",
      type: "input",
      data: { label: "Node 1" },
      position: { x: 10000, y: 100000 }
    }
  ];

  let savedElements:any = [];
  let arrayCheck:any = {
    title: false, 
    desc: false, 
    duration: false, 
    option: false, 
    noLigacao: false, 
    nodeColor: false,
    textColor: false,
    bgColor: false,
  };
  let savedElementsLabels:any = [];
  const reactFlowWrapper = useRef(null as any | null);
  const [checkStatus, setCheckStatus] = useState(arrayCheck)
  const [elements, setElements] = useState(initialElements as any);
  const [idNumber, setIdNumber] = useState('0');
  const [reactFlowInstance, setReactFlowInstance] = useState(null as any | null);
  const [history, setHistory] = useState('');
  const [constHistory, setConstHistory] = useState('');
  const [title, setTitle] = useState('');
  const [constTitle, setConstTitle]= useState('');
  const [option, setOption]= useState('');
  const [nodeColor, setNodeColor]= useState('');
  const [constNodeColor, setConstNodeColor]= useState('');
  const [textColor, setTextColor]= useState('');
  const [constTextColor, setConstTextColor]= useState('');
  const [bgColor, setBgColor]= useState('');
  const [constBgColor, setConstBgColor]= useState('');
  const [noLigacao, setNoLigacao] = useState('');
  const [NodeId, setNodeId] = useState(0);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [checkedStart, setCheckedStart] = useState(false);
  const [checkedEnd, setCheckedEnd] = useState(false);
  const [duration, setDuration] = useState('0');
  const [constDuration, setConstDuration] = useState('0');
  const [reg, setReg] = useState(false);
  // eslint-disable-next-line
  const [tags, setTags] = useState(Array());
  // eslint-disable-next-line
  const [tags1, setTags1] = useState(Array());
  // eslint-disable-next-line
  const [selectedTags, setSelectedTags] = useState(Array());
  const [tagName, setTagName] = useState('');
  const [tagColor, setTagColor] = useState('');
  const [position, setPosition] = useState(null as any | null)
  const [currentNodeInfo, setCurrentNodeInfo] = useState(null as any | null)
  const [currentID, setCurrentID] = useState(null as any | null)
  const [update, setUpdate] = useState(0)
  const [targetID, setTargetID] = useState('');
  const [updateCon, setUpdateCon] = useState(false);
  // eslint-disable-next-line
  const [nextNodes, setNextNodes] = useState(Array());
  const [nodeDragID, setNodeDragID] = useState('');
  const [auxStart, setAuxStart] = useState(false);
  const [auxEnd, setAuxEnd] = useState(false);
  const [auxCardName, setAuxCardName] = useState(Array());
  const [auxCardAlt, setAuxCardAlt] = useState(Array());
  const [count, setCount] = useState(-1);
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);

  const getNodes = async () => {
    const gamesResult = await fetch(api_url+'game/'+urlParams.get('game'), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    return gamesResult;
  }

  const getConnections = async () => {
    const connectionsResult = await fetch(api_url+'connection/'+urlParams.get('game'), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    return connectionsResult;
  }

  useEffect(() => {
    async function populate() {
      const connectionsResult = await getConnections();
      const connRes = await connectionsResult.json();
      const gamesResult = await getNodes();
      const result = await gamesResult.json();
      result.game.nodes.map((item: any, index:any) => {
        item.labels.map((item:any) => {
          savedElementsLabels.push(
            {'name':item.label, 'color': item.color}
          )
        })
        savedElements.push({
          id: item._id,
          type: 'special',
          data: {
            history: item.markdownContent, 
            title: item.name, 
            nodeStart: item.startNode, 
            nodeEnd: item.endNode, 
            duration: item.duration, 
            textColor: item.textColor,
            bgColor: item.backgroundColor,
            nodeColor: item.nodeColor,
            nextNodes: item.nextNodes,
            onEditClick:() => onEditClick(item._id),
            // eslint-disable-next-line
            tagsArray: savedElementsLabels
          },
          position: item.position
        })
        savedElementsLabels = []
      })
      connRes.nodeConnection.map((item:any, index:any) => {
        savedElements.push({
          id: item._id,
          source: item.source,
          target: item.target,
          animated: true,
          arrowHeadType: 'arrowclosed' as ArrowHeadType,
          style: { color: "white", stroke: "white" },
          sourceHandle: "b",
          targetHandle: "a"
        })
      })
      if(savedElements.length !== 0){
        setElements(savedElements);
      }
    }  
    populate()
  }, [update])

  const onElementsRemove = async(elementsToRemove : Elements) => {
    setElements((els: any) => removeElements(elementsToRemove, els));
    await fetch(api_url+'node/delete/'+elementsToRemove[0].id, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        elements: elementsToRemove,
        game: urlParams.get('game')
      })
    });
  } 
  const onConnect = (params: Edge | Connection) => setElements((els: any) => addEdge({ ...params, animated: true, arrowHeadType: 'arrowclosed' as ArrowHeadType, style: { color: 'white', stroke: 'white' } }, els));
  const onLoad = (_reactFlowInstance : OnLoadParams) =>{
    setReactFlowInstance(_reactFlowInstance);
  }
  
  const onDragOver = (event: any) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  };

  useEffect(() => {
    if(currentNodeInfo !== null){
      setIsOpen(true);
    }
  }, [currentNodeInfo])

  const onEditClick = async (id: any) => {
    setSelectedTags([])
    const labelList = await fetch(api_url+'label', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    setCurrentID(id);
    const result = await labelList.json();
    setTags1(result.label);
    let typeId = typeof id;
    if(typeId !== 'object'){
      const nodeResult = await fetch(api_url+'node/'+id, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      const resultNode = await nodeResult.json();
      setCurrentNodeInfo(resultNode);
    }else{
      setCurrentNodeInfo('unsaved');
    }
  }

  const saveTags = async () => {
    try{
      await fetch(api_url+'label/create', {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ label: tagName, value: tagName, color: tagColor === "" ? "#000" : tagColor })
      });
    } catch(err){
        console.log("erro ao criar tag: "+err)
    }
    setTags(tags.concat({"label": tagName, "value": tagName, "color": tagColor === "" ? "#000" : tagColor}))
    onRequestClose();
    setTagColor("#000");
    setTagName("");
  }

  const createNode = (position: any, type: string, origin: number, title:string) => {
    let idToInt = parseInt(idNumber)+1;
    setIdNumber(idToInt.toString());
    const newNode = {
      id: idNumber,
      type: type,
      position,
      data: {
        history: '', 
        title: origin === 0 ? '' : title, 
        nodeStart: false, 
        nodeEnd: false, 
        duration: '0',
        nodeColor: '#000000', 
        textColor: '#000000', 
        backgroundColor: '#000000', 
        onEditClick:onEditClick,
        // eslint-disable-next-line
        tagsArray: Array()
      },
    };
    setElements((es: Elements) => es.concat(newNode));
    if(origin === 1){
      apiSaveNodes(title, false, false, '0', '', Array(), position, nodeColor, textColor, bgColor);
    }else{
      apiSaveNodes('', false, false, '0', '', Array(), position,  nodeColor, textColor, bgColor);
    }
  }

  //Create connection
  useEffect(() => {
      if(updateCon){
        setCount(num => num = num + 1);
      }
  }, [targetID])

  useEffect(() => {
    const createConn = async () => {
      if(updateCon){     
        setNextNodes([...Array({id:targetID, choice:auxCardAlt[count]})]);
        await fetch(api_url+'connection/create', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ 
            _id: 'react' + NodeId.toString() + '-' + targetID, 
            source: NodeId.toString(),
            target: targetID,
            gameId: urlParams.get('game')
          })
        });
        setOption('')
      }
      if(count === auxCardName.length-1){
        setAuxCardName(Array());
        setAuxCardAlt(Array());
        setUpdateCon(false)
      }
    }
    createConn();
    setUpdate(update => update = update + 1)
  }, [count])

  useEffect(() => {
    if(updateCon && nextNodes[0].id !== 'err'){
      apiEditNextNodes(nextNodes);
    }
  }, [nextNodes])

  const onDrop = (event: any) => {
    if(elements.length >= 1)
      if(elements[0].id.search('1000') !== -1)
        elements.splice(0, 1);      

    event.preventDefault();
   
    const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
    const type = event.dataTransfer.getData('application/reactflow');
    const position = reactFlowInstance.project({
      x: event.clientX - reactFlowBounds.left,
      y: event.clientY - reactFlowBounds.top,
    });

    createNode(position, type, 0, '');
  }

  const onElementClick = (event: any, element: any) => { 
    setNodeId(element.id);    
  }

  //Save node history
  useEffect(() => {
    if(NodeId.toString().search('react') === -1){
      elements.forEach((item: any) => {
        if(item.id === NodeId)
          if(history !== ' ')
            item.data.history = history;
      })
    }
    setHistory(' ');
   },
   // eslint-disable-next-line react-hooks/exhaustive-deps
  [history, NodeId])

  //Save node title
  useEffect(() => {
    if(NodeId.toString().search('react') === -1){
      elements.forEach((item: any) => {
        if(item.id === NodeId)
          if(title !== ' ')
            item.data.title = title;
      })
    }
    setTitle(' ');
   },
   // eslint-disable-next-line react-hooks/exhaustive-deps
  [title, NodeId])

  useEffect(() => {
    if(NodeId.toString().search('react') === -1){
      elements.forEach((item: any) => {
        if(item.id === NodeId)
          item.data.nodeColor = nodeColor;
      })
    }
    setNodeColor('#000000');
  },
   // eslint-disable-next-line react-hooks/exhaustive-deps
  [nodeColor, NodeId])

  useEffect(() => {
    if(NodeId.toString().search('react') === -1){
      elements.forEach((item: any) => {
        if(item.id === NodeId)
          item.data.textColor = textColor;
      })
    }
    setTextColor('#000000');
   },
   // eslint-disable-next-line react-hooks/exhaustive-deps
  [textColor, NodeId])

  useEffect(() => {
      if(NodeId.toString().search('react') === -1){
        elements.forEach((item: any) => {
          if(item.id === NodeId)
            item.data.backgroundColor = bgColor;
        })
      }
      setBgColor('#000000');
   },
   // eslint-disable-next-line react-hooks/exhaustive-deps
  [bgColor, NodeId])

  //Save if the node is a start node
  useEffect(() => {
    if(reg){
      if(NodeId.toString().search('react') === -1){
        elements.forEach((item: any) => {
          if(item.id === NodeId)
            item.data.nodeStart = checkedStart;
        })
      }
      setReg(false);
    }
   },
   // eslint-disable-next-line react-hooks/exhaustive-deps
  [checkedStart, NodeId])

  //Save if the node is a end node
  useEffect(() => {
    if(reg){
      if(NodeId.toString().search('react') === -1){
        elements.forEach((item: any) => {
          if(item.id === NodeId)
            item.data.nodeEnd = checkedEnd;
        })
      }
      setReg(false);
    }
   },
   // eslint-disable-next-line react-hooks/exhaustive-deps
  [checkedEnd, NodeId])

  //add tags
  useEffect(() => {
      if(NodeId.toString().search('react') === -1){
        elements.forEach((item: any) => {
          if(item.id === NodeId)
            item.data.tagsArray = selectedTags;
        })
      }
   },
   // eslint-disable-next-line react-hooks/exhaustive-deps
  [selectedTags])

  //Save node duration
  useEffect(() => {
    if(NodeId.toString().search('react') === -1){
      elements.forEach((item: any) => {
        if(item.id === NodeId)
          if(duration !== ' ')
            item.data.duration = duration;
      })
    }
    setDuration(' ')
   },
   // eslint-disable-next-line react-hooks/exhaustive-deps
  [duration, NodeId])

  const onRequestClose = () => {
    setIsOpen(false);
  }

  const onChangeDescription = (event: any) => {
    setHistory(event)
    setConstHistory(event);
    setCheckStatus((oldState:any) => ({...oldState, desc: true}))
  }
  const onChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value)
    setConstTitle(event.target.value)
    setCheckStatus((oldState:any) => ({...oldState,title: true}))
  }

  const onChangeDuration = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDuration(event.target.value)  
    setConstDuration(event.target.value);
    setCheckStatus((oldState:any) => ({...oldState,duration: true}))
  }
  
  const onChangeNoLigacao = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNoLigacao(event.target.value)
    setAuxCardName((oldArray:any) => [...oldArray, event.target.value]);
    setCheckStatus((oldState:any) => ({...oldState,noLigacao: true}))
  }
  const onChangeTagName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTagName(event.target.value)
  }
  const onChangeColor = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTagColor(event.target.value);
  }
  const onChangeOption = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOption(event.target.value);
    setAuxCardAlt((oldArray:any) => [...oldArray, event.target.value])
    setCheckStatus((oldState:any) => ({...oldState,option: true}))
  }
  const onChangeNodeColor = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNodeColor(event.target.value);
    setConstNodeColor(event.target.value);
    setCheckStatus((oldState:any) => ({...oldState,nodeColor: true}))
  }
  const onChangeTextColor = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTextColor(event.target.value);
    setConstTextColor(event.target.value);
    setCheckStatus((oldState:any) => ({...oldState,textColor: true}))
  }
  const onChangeBgColor = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBgColor(event.target.value);
    setConstBgColor(event.target.value);
    setCheckStatus((oldState:any) => ({...oldState,bgColor: true}))
  }
  
  const handleInputChange = (event: any) => {
    setSelectedTags(selectedTags.splice(0, selectedTags.length))
    let x = Array();
    event.map((item:any) => {
      x.push({'label':item.label, 'value': item.label, 'color': item.color});
      setSelectedTags(x);
      return 0
    })
  }

  const onChangeNodeEnd = () => {
    setReg(true);
    setAuxEnd(true);
    setCheckedEnd(!checkedEnd);
  }
  useEffect(() => {
    apiEditEndNode(checkedEnd);
  }, [checkedEnd, currentID])

  const onChangeNodeStart = () => {
    setReg(true);
    setAuxStart(true);
    setCheckedStart(!checkedStart);
  }
  useEffect(() => {
      apiEditStartNode(checkedStart);
  }, [checkedStart, currentID])

  const claick = () => {
    console.log("Elements: ", elements);
    console.log("Tags: ", tags)
    console.log("SelectedTags: ", selectedTags)
  }
  
  const createNodeConnection = () => {
    auxCardName.forEach(no => {
      if(no !== ''){
        let exist = false;
        elements.forEach((element: any) => {
          if(element.id.search('react') === -1){
            if(element.data.title === no){
              exist = true;
              setUpdateCon(true);
              setTargetID(element.id);
            }
          }
        });
        if(!exist){
          const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
          const position = reactFlowInstance.project({
            x: reactFlowBounds.right - window.innerWidth/5 ,
            y: window.innerHeight/2,
          });
          createNode(position, 'special', 1, no);
        }
        setUpdateCon(true);
        setNoLigacao('');
      }
    })
  }

  const apiSaveNodes = async (name:string, startNode:boolean, endNode:boolean, duration:string, markdownContent:string, labels:any, position:any, nodeColor:any, textColor:any, bgColor:any) => {
    try{
      const saved = await fetch(`${api_url}node/create`, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
          name: name, 
          startNode: startNode,
          endNode: endNode,
          duration: duration,
          markdownContent: markdownContent,
          labels: labels,
          id: urlParams.get('game'),
          position: position,
          nodeColor: nodeColor,
          textColor: textColor, 
          backgroundColor: bgColor
        })
      });
        const jsonSaved = await saved.json();
        if(name !== ''){
          setTargetID(jsonSaved.gameNode._id)
          setUpdateCon(true)
        }
    } catch(err){
        console.log("erro ao criar tag: "+err)
    }
    setUpdate(update => update = update + 1)
  }
  const apiEditNextNodes = async (nextNodes:any) => {
    await fetch(`${api_url}node/edit/nextnodes/${currentID}`, {
      method: 'PUT',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 
        nextNodes: nextNodes
      })
    });
    setNextNodes({...Array({id:'err', choice:'err'})});
  }

  const apiEditEndNode = async (endNode:boolean) => {
    await fetch(`${api_url}node/edit/end/${currentID}`, {
      method: 'PUT',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 
        endNode: endNode
      })
    });
    setAuxEnd(false)
  } 

  const apiEditStartNode = async (startNode:boolean) => {
    await fetch(`${api_url}node/edit/start/${currentID}`, {
      method: 'PUT',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 
        startNode: startNode
      })
    });
    setAuxStart(false)
  } 

  const apiEditNodes = async (name:string, duration:string, markdownContent:string, labels:any, nodeColor:any, option: any, textColor:any, bgColor:any) => {
    try{
      await fetch(`${api_url}node/edit/${currentID}`, {
        method: 'PUT',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
          name:  checkStatus.title === false ? currentNodeInfo.gameNode.name : name, 
          duration: checkStatus.duration === false ? currentNodeInfo.gameNode.duration : duration,
          markdownContent: checkStatus.desc === false ? currentNodeInfo.gameNode.markdownContent : markdownContent,
          labels: labels,
          id: urlParams.get('game'),
          nodeColor: checkStatus.nodeColor === false ? currentNodeInfo.gameNode.nodeColor : nodeColor,
          textColor: checkStatus.textColor === false ? currentNodeInfo.gameNode.textColor : textColor,
          backgroundColor: checkStatus.bgColor === false ? currentNodeInfo.gameNode.backgroundColor : bgColor, 
        })
      })
      setCheckStatus({ 
        title: false, 
        desc: false, 
        duration: false, 
        option: false, 
        noLigacao: false, 
        nodeColor: false,
        textColor: false,
        bgColor: false})
    } catch(err){
        console.log("erro ao criar tag: "+err)
    }
    setUpdate(update => update = update + 1);
    setCount(-1);
  }

  const onSaveChanges = async () => {
    await apiEditNodes(constTitle, constDuration, constHistory, selectedTags, constNodeColor, option, constTextColor, constBgColor);
    createNodeConnection();
    onRequestClose();
  }

  const onNodeDrag = (event:any, node:any) => {
    const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
    const pos = reactFlowInstance.project({
      x: event.clientX - reactFlowBounds.left - 50,
      y: event.clientY - reactFlowBounds.top - 58,
    });
    setPosition(pos);
    setNodeDragID(node.id);
  }

  useEffect(() => {
    if(position !== null && nodeDragID !== ''){
      putPosition(position, nodeDragID);
    }
      
  }, [position, nodeDragID]);

  const putPosition = async (position:any, nodeDragID:any) => {
    await fetch(`${api_url}node/edit/position/${nodeDragID}`, {
      method: 'PUT',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 
        position: position
      })
    });
  }
  return (
    <div className="reactflow-wrapper" ref={reactFlowWrapper}  style={{ height: '100vh', backgroundColor: '#010c18' }}>
      <ReactFlow 
        onPaneClick={claick}
        onLoad={onLoad}
        onElementClick={onElementClick} 
        elements={elements} 
        onConnect={onConnect} 
        onElementsRemove={onElementsRemove} 
        onDrop={onDrop}
        onNodeDragStop={onNodeDrag}
        onDragOver={onDragOver}
        nodeTypes={nodeTypes} 
      >
            <MiniMap
              nodeColor={(node) => {
                switch (node.type) {
                  default: return ' #fea18d ';
                }
              }}
            />
            <NodeEdit 
              openModal={modalIsOpen} 
              closeModal={onRequestClose} 
              onChangeDescription={onChangeDescription} 
              onChangeTitle={onChangeTitle}
              onChangeNodeStart={onChangeNodeStart}
              checkedStart={checkedStart}
              onChangeNodeEnd={onChangeNodeEnd}
              checkedEnd={checkedEnd}
              onChangeDuration={onChangeDuration}
              onChangeNoLigacao={onChangeNoLigacao}
              onSaveChanges={onSaveChanges}
              tagOptions={tags1}
              handleInputChange={handleInputChange}
              onChangeOption={onChangeOption}
              onChangeNodeColor={onChangeNodeColor}
              onChangeTextColor={onChangeTextColor}
              onChangeBgColor={onChangeBgColor}
              currentNodeInfo={currentNodeInfo} //currentNodeInfo
            />
            <TopMenu 
              saveTags={saveTags} 
              onChangeTagName={onChangeTagName} 
              onChangeColor={onChangeColor}
              />
        <Controls />
        <Background 
          variant={'lines' as BackgroundVariant | undefined} 
          size={0.1} 
          color="#98c8ff" 
          gap={35} 
        />
      </ReactFlow>   
      <Sidebar />
    </div>
  );
};

export default EditorScreen;