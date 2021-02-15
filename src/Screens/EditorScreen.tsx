import React, { useState, useRef, useEffect } from 'react';
import ReactFlow, { removeElements, addEdge, MiniMap, Controls, Background, Elements, Edge, Connection, OnLoadParams } from 'react-flow-renderer';
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
  const [NodeId, setNodeId] = useState(0);
  const [modalIsOpen, setIsOpen] = useState(false);

  const onElementsRemove = (elementsToRemove : Elements) =>
    setElements((els: any) => removeElements(elementsToRemove, els));
  const onConnect = (params: Edge | Connection) => setElements((els: any) => addEdge({ ...params, animated: true, style: { color: 'white', stroke: 'white' } }, els));
  const onLoad = (_reactFlowInstance : OnLoadParams) =>
    setReactFlowInstance(_reactFlowInstance);
  
  const onDragOver = (event: any) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  };

  const onDrop = (event: any) => {
    if(elements[0].id.search('1000') !== -1)
      elements.splice(0, 1);      

    event.preventDefault();

    const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
    const type = event.dataTransfer.getData('application/reactflow');
    const position = reactFlowInstance.project({
      x: event.clientX - reactFlowBounds.left,
      y: event.clientY - reactFlowBounds.top,
    });

    let idToInt = parseInt(idNumber)+1;
    setIdNumber(idToInt.toString());

    const newNode = {
      id: idNumber,
      type: type,
      position,
      data: {history: '', title: 'Card'},
    };

    setElements((es: Elements) => es.concat(newNode));
  }

  const onElementClick = (event: any, element: any) => { 
    if(element.id.search('react') === -1)
      setIsOpen(true);
    setNodeId(element.id);
  }

  const onChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setHistory(event.target.value)
  }

  const registerHistory = (NodeId: number) => {
    if(NodeId.toString().search('react') === -1){
      elements.forEach((item: any) => {
        if(item.id === NodeId)
          item.data.history = history;
      })
    }
  }

  useEffect(() => {
    registerHistory(NodeId);
   },
  [history, NodeId])

  const claick = () => {
    console.log(elements);
  }

  const onRequestClose = () => {
    setIsOpen(false);
  }

  return (
    <div className="reactflow-wrapper" ref={reactFlowWrapper}  style={{ height: '100vh', backgroundColor: 'black' }}>
      <ReactFlow 
        onPaneClick={claick}
        connectionLineComponent={ConnectionLine} 
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
              onChange={onChange} 
              title='Titulo'
            />
        <Controls />
        <Background color="#aaa" gap={16} />
      </ReactFlow>   
      <Sidebar />
    </div>
  );
};

export default EditorScreen;