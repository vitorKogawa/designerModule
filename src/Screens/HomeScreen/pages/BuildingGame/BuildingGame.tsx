// import React, { useEffect, useState, DragEvent, MouseEvent } from 'react'
// import { api } from '../../../../services/api';
// // import { Sidebar } from '../../../components/Sidebar/Sidebar'
// import ReactFlow, {
//     ReactFlowProvider,
//     addEdge,
//     Controls,
//     ReactFlowInstance,
//     Connection,
//     Edge,
//     Node,
//     useNodesState,
//     useEdgesState,
//     Background,
//     BackgroundVariant,
//     MiniMap,
// } from 'react-flow-renderer';
// import { DragAndDrop } from '../../../components/DragAndDrop/DragAndDrop';
// import InitialNode from './components/Flow/components/Nodes/InitialNode/InitialNode';
// import CommonNode from './components/Flow/components/Nodes/CommonNode/CommonNode';
// import FinalNode from './components/Flow/components/Nodes/FinalNode/FinalNode';
// import './styles/styles.scss'
// import { IGame } from '../../interfaces/IGame';
// import { FaSave } from 'react-icons/fa'
// import { INode } from './../../interfaces/IGame'

// const onDragOver = (event: DragEvent) => {
//     event.preventDefault();
//     event.dataTransfer.dropEffect = 'move';
// };

// let id = 0;
// const getId = () => `dndnode_${id++}`;

// const nodeTypes = {
//     initialNode: InitialNode,
//     commonNode: CommonNode,
//     finalNode: FinalNode
// };

// const factoryNode = (data: INode) => {
//     return {
//         id: data._id,
//         type: data.startNode === true ? 'InitialNode' : data.endNode === true ? 'FinalNode' : 'CommonNode',
//         data: { label: 'node label' },
//         position: { x: data.position.x, y: data.position.y }
//     } as Node
// }

// const BuildingGame: React.FC = () => {
//     const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowInstance>();
//     const [nodes, setNodes, onNodesChange] = useNodesState([]);
//     const [edges, setEdges, onEdgesChange] = useEdgesState([]);

//     //Pegando o ID do jogo pela URL do navegador
//     let url: URL = new URL(window.location.href)
//     let id_game: string | null = url.searchParams.get('game')

//     //dados do jogo
//     useEffect(() => {
//         api.get<IGame>(`/game/${id_game}`)
//             .then(response => {
//                 console.log(response.data.nodes)
//                 let formatedNodes: Node[] = []
//                 response.data.nodes.map((node: INode) => formatedNodes.push(factoryNode(node)))

//                 // formatedNodes.map(node => setNodes(node))

//                 // response.data.nodes.map((node: INode) => setNodes(factoryNode(node)))
//             })
//             .catch(error => console.error(error))
//     }, [])

//     //pegando conexões entre os nós
//     useEffect(() => {
//         api.get(`/connection/${id_game}`)
//             .then(response => console.log(response.data))
//             .catch(error => console.error(error))
//     }, [])


//     const onConnect = (params: Connection | Edge) => setEdges((eds) => addEdge(params, eds));

//     //Aqui você encontra as configurações inicias do Flow (ex: zoom in / out e outros)
//     const onInit = (rfi: ReactFlowInstance) => {
//         setReactFlowInstance(rfi)
//     }

//     //Eventos disparado logo depois que você solta um NOVO nó no painel
//     const onDrop = (event: DragEvent) => {
//         event.preventDefault();

//         if (reactFlowInstance) {
//             const type = event.dataTransfer.getData('application/reactflow');
//             const position = reactFlowInstance.project({ x: event.clientX, y: event.clientY - 40 });
//             const newNode: Node | INode = {
//                 id: `${id_game}_${Date.now()}`,
//                 type,
//                 position,
//                 data: { label: `${type}` }
//             };

//             setNodes((nds) => nds.concat(newNode));
//         }
//     };

//     const onNodeDrag = (_: MouseEvent, node: Node) => console.log('drag', node)

//     const onNodeDragStart = (_: MouseEvent, node: Node) => console.log('drag start', node)

//     const onNodeDragStop = (_: MouseEvent, node: Node) => console.log('drag stop', node)


//     return (
//         <div className="container-fluid bg-surface min-vh-100">
//             <div className="row">
//                 {/* <div className="col bg-surface min-vh-100">
//                     <Sidebar />
//                 </div> */}
//                 <ReactFlowProvider>
//                     <div className="reactflow-wrapper">
//                         <ReactFlow
//                             nodes={nodes}
//                             edges={edges}
//                             onEdgesChange={onEdgesChange}
//                             // onNodesChange={onNodesChange}
//                             onConnect={onConnect}
//                             onInit={onInit}
//                             onDrop={onDrop}
//                             onDragOver={onDragOver}
//                             nodeTypes={nodeTypes}
//                             onNodeDrag={onNodeDrag}
//                             onNodeDragStart={onNodeDragStart}
//                             onNodeDragStop={onNodeDragStop}
//                         >
//                             <Controls style={{ position: 'absolute', margin: '1em', top: 0, left: 0 }} />
//                             <Background
//                                 variant={'lines' as BackgroundVariant}
//                                 size={0.1}
//                                 color="#fff"
//                                 gap={10}
//                             />
//                             <MiniMap
//                                 nodeStrokeColor={(n: Node): string => {
//                                     if (n.type === 'initialNode') return '#0041d0';
//                                     if (n.type === 'commonNode') return 'bg-surface';
//                                     if (n.type === 'finalNode') return '#ff0072';

//                                     return '#eee';
//                                 }} />

//                             {/* save button - start */}

//                             <div style={{ position: 'absolute', right: 0, bottom: '5.5em', margin: '1em', cursor: 'pointer', zIndex: 5, border: 'none' }}>
//                                 <button onClick={() => console.log(nodes)}>
//                                     <p> {nodes.length} </p>
//                                 </button>
//                             </div>

//                             {/* save button - end */}


//                             <DragAndDrop />
//                         </ReactFlow>
//                     </div>
//                 </ReactFlowProvider>
//             </div>
//         </div>
//     )
// }

// export { BuildingGame }

import React from 'react'

const BuildingGame = () => <h1>Building Game!!!</h1>

export { BuildingGame }