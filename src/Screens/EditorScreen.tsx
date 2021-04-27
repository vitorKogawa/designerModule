import React, { useState, useRef, useEffect } from 'react';
import ReactFlow, { removeElements, addEdge, MiniMap, Controls, Background, Elements, Edge, Connection, OnLoadParams, BackgroundVariant, ArrowHeadType } from 'react-flow-renderer';
import CustomNodeComponent from '../Components/EditorComponents/CustomNodeComponent';
import Sidebar from '../Components/EditorComponents/Sidebar';
import NodeEdit from '../Components/EditorComponents/NodeEdit';
import TopMenu from '../Components/EditorComponents/TopMenu';
import { api_url } from '../public/variables';

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
  let savedElementsLabels:any = [];
  const reactFlowWrapper = useRef(null as any | null);
  const [elements, setElements] = useState(initialElements as any);
  const [idNumber, setIdNumber] = useState('0');
  const [reactFlowInstance, setReactFlowInstance] = useState(null as any | null);
  const [history, setHistory] = useState('');
  const [constHistory, setConstHistory] = useState('');
  const [title, setTitle] = useState('');
  const [constTitle, setConstTitle]= useState('');
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

  useEffect(() => {
    async function getNodes() {
      const gamesResult = await fetch(api_url+'game/'+props.location.state.gameId, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
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
            onEditClick:() => onEditClick(item._id),
            // eslint-disable-next-line
            tagsArray: savedElementsLabels
          },
          position: item.position
        })
      })
      if(savedElements.length !== 0){
        setElements(savedElements);
      }
    }  
    getNodes()
  }, [update])

  const onElementsRemove = (elementsToRemove : Elements) =>
    setElements((els: any) => removeElements(elementsToRemove, els));
  const onConnect = (params: Edge | Connection) => setElements((els: any) => addEdge({ ...params, animated: true, arrowHeadType: 'arrowclosed' as ArrowHeadType, style: { color: 'white', stroke: 'white' } }, els));
  const onLoad = (_reactFlowInstance : OnLoadParams) =>
    setReactFlowInstance(_reactFlowInstance);
  
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

  const createNode = (position: any, type: string, origin: number) => {
    let idToInt = parseInt(idNumber)+1;
    setIdNumber(idToInt.toString());
    const newNode = {
      id: idNumber,
      type: type,
      position,
      data: {
        history: '', 
        title: origin === 0 ? '' : noLigacao, 
        nodeStart: false, 
        nodeEnd: false, 
        duration: '0', 
        onEditClick:onEditClick,
        // eslint-disable-next-line
        tagsArray: Array()
      },
    };
    setElements((es: Elements) => es.concat(newNode));
    if(origin === 1){
      apiSaveNodes('save', noLigacao, false, false, '0', '', Array(), position);
    }else{
      apiSaveNodes('save', '', false, false, '0', '', Array(), position);
    }
  }

  const createConnection = (idSource: string, idTarget: string) => {
    const newConnection = {
      id: 'react' + idNumber,
      source: idSource,
      target: idTarget,
      animated: true, 
      arrowHeadType: 'arrowclosed' as ArrowHeadType,
    };
    setElements((es: Elements) => es.concat(newConnection));

  }

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

    createNode(position, type, 0);
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
            setPosition(item.position);
      })
    }
    setTitle(' ');
   },
   // eslint-disable-next-line react-hooks/exhaustive-deps
  [title, NodeId])

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
  }
  const onChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value)
    setConstTitle(event.target.value)
  }

  const onChangeDuration = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDuration(event.target.value)  
    setConstDuration(event.target.value);
  }

  const onChangeNoLigacao = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNoLigacao(event.target.value)
  }
  const onChangeTagName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTagName(event.target.value)
  }
  const onChangeColor = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTagColor(event.target.value);
  }
  
  const handleInputChange = (event: any) => {
    setSelectedTags(selectedTags.splice(0, selectedTags.length))
    let x: Array<Object> = [];
    event.map((item:any) => {
      x.push({'label':item.label, 'value': item.label, 'color': item.color});
      setSelectedTags(x);
      return 0
    })
  }

  const onChangeNodeEnd = () => {
    setReg(true);
    setCheckedEnd(!checkedEnd)
  }

  const onChangeNodeStart = () => {
    setReg(true);
    setCheckedStart(!checkedStart)
  }

  const claick = () => {
    console.log("Elements: ", elements);
    console.log("Tags: ", tags)
    console.log("SelectedTags: ", selectedTags)
  }
  
  const createNodeConnection = () => {
    if(noLigacao !== ''){
      let exist = false;
      let idTarget = idNumber;
      elements.forEach((element: any) => {
        if(element.id.search('react') === -1){
          if(element.data.title === noLigacao){
            exist = true
            idTarget = element.id;
          }
        }
      });
      if(exist){
        createConnection(NodeId.toString(), idTarget)
      }else{
        const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
        const position = reactFlowInstance.project({
          x: reactFlowBounds.right - window.innerWidth/5 ,
          y: window.innerHeight/2,
        });

        createNode(position, 'special', 1);
        createConnection(NodeId.toString(), idTarget);
      }
      setNoLigacao('');
    }
  }

  const apiSaveNodes = async (reqType:string, name:string, startNode:boolean, endNode:boolean, duration:string, markdownContent:string, labels:any, position:any) => {
    let url = '';
    let method = '';
    if(reqType === 'edit'){
      url = `${api_url}node/edit/${currentID}`;
      method = 'PUT';
    }
    else{
      url = `${api_url}node/create`;
      method = 'POST';
    }
      console.log(labels)
    try{
      await fetch(url, {
        method: method,
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
          id: props.location.state.gameId,
          position: position
          //nodeColor: ,textColor: , backgroundColor:  
        })
      });
    } catch(err){
        console.log("erro ao criar tag: "+err)
    }
    setUpdate(update => update = update + 1)
  }

  const onSaveChanges = async () => {
    createNodeConnection();
    apiSaveNodes('edit', constTitle, checkedStart, checkedEnd, constDuration, constHistory, selectedTags, position);
    onRequestClose();
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
              currentNodeInfo='unsaved' //currentNodeInfo
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