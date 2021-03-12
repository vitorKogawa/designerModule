import React, { useState, useRef, useEffect } from 'react';
import ReactFlow, { removeElements, addEdge, MiniMap, Controls, Background, Elements, Edge, Connection, OnLoadParams, BackgroundVariant, ArrowHeadType, ConnectionLineType } from 'react-flow-renderer';
import CustomNodeComponent from '../Components/EditorComponents/CustomNodeComponent';
import ConnectionLine from '../Components/EditorComponents/ConnectionLine';
import Sidebar from '../Components/EditorComponents/Sidebar';
import NodeEdit from '../Components/EditorComponents/NodeEdit';

const nodeTypes = {
  special: CustomNodeComponent,
};

function EditorScreen(){
  let initialElements = [
    {
      id: "1000",
      type: "input",
      data: { label: "Node 1" },
      position: { x: 10000, y: 100000 }
    }
  ];

  const reactFlowWrapper = useRef(null as any | null);
  const [elements, setElements] = useState(initialElements as any);
  const [idNumber, setIdNumber] = useState('0');
  const [reactFlowInstance, setReactFlowInstance] = useState(null as any | null);
  const [history, setHistory] = useState('');
  const [title, setTitle] = useState('');
  const [noLigacao, setNoLigacao] = useState('');
  const [NodeId, setNodeId] = useState(0);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [checkedStart, setCheckedStart] = useState(false);
  const [checkedEnd, setCheckedEnd] = useState(false);
  const [duration, setDuration] = useState('0');
  const [reg, setReg] = useState(false);

  const onElementsRemove = (elementsToRemove : Elements) =>
    setElements((els: any) => removeElements(elementsToRemove, els));
  const onConnect = (params: Edge | Connection) => setElements((els: any) => addEdge({ ...params, animated: true, arrowHeadType: 'arrowclosed' as ArrowHeadType, style: { color: 'white', stroke: 'white' } }, els));
  const onLoad = (_reactFlowInstance : OnLoadParams) =>
    setReactFlowInstance(_reactFlowInstance);
  
  const onDragOver = (event: any) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  };

  const onEditClick = (event: any) => {
      setIsOpen(true);
  }

  const createNode = (position: any, type: string, origin: number) => {
    let idToInt = parseInt(idNumber)+1;
    setIdNumber(idToInt.toString());
    console.log(noLigacao + " dadsadasda")
    const newNode = {
      id: idNumber,
      type: type,
      position,
      data: {history: '', title: origin === 0 ? '' : noLigacao, nodeStart: false, nodeEnd: false, duration: '0', onEditClick:onEditClick},
    };
    console.log(newNode)
    setElements((es: Elements) => es.concat(newNode));
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
  [checkedEnd, NodeId])

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
  [duration, NodeId])

  const onRequestClose = () => {
    setIsOpen(false);
  }

  const onChangeDescription = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setHistory(event.target.value)
  }
  const onChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value)
  }

  const onChangeDuration = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDuration(event.target.value)  
  }

  const onChangeNoLigacao = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNoLigacao(event.target.value)
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
    console.log(elements);
  }

  const onSaveChanges = () => {
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
        createConnection(NodeId.toString(), idTarget)
      }
      setNoLigacao('');
    }
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