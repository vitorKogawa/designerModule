import React, { useState, useRef, useEffect } from 'react';
import ReactFlow, { removeElements, addEdge, MiniMap, Controls, Background, Elements, Edge, Connection, OnLoadParams, BackgroundVariant, ArrowHeadType } from 'react-flow-renderer';
import { CustomNodeComponent } from '../Components/EditorComponents/CustomNodeComponent';
import CustomNodeForm from '../Components/EditorComponents/CustomNodeForm';
// import Sidebar from '../Components/EditorComponents/Sidebar';
import NodeEdit from '../Components/EditorComponents/NodeEdit';
import TopMenu from '../Components/EditorComponents/TopMenu';
import { api_url } from '../public/variables';
import firebase from 'firebase/app';
import showdown from 'showdown';

import { DragAndDrop } from './components/DragAndDrop/DragAndDrop';
import { ModalAttributesAndEvents } from './components/ButtonAttributesAndEvents';
import { Sidebar } from './components/Sidebar/Sidebar';
import "firebase/auth";
import './editorscreen.scss'
import { IAttribute } from './HomeScreen/interfaces/IAttributes';
import { api } from '../services/api';
import { BsPlay } from 'react-icons/bs'
import { useHistory } from 'react-router-dom';
// import CommonNode from './HomeScreen/pages/BuildingGame/components/Flow/components/Nodes/CommonNode/CommonNode';


const nodeTypes = {
    special: CustomNodeComponent,
    formType: CustomNodeForm
};

function EditorScreen(props: any) {
    const nav_history = useHistory();

    let initialElements = [
        {
            id: "1000",
            type: "input",
            data: { label: "Node 1" },
            position: { x: 10000, y: 100000 }
        }
    ];

    let savedElements: any = [];
    let arrayCheck: any = {
        title: false,
        desc: false,
        duration: false,
        option: false,
        noLigacao: false,
        nodeColor: false,
        textColor: false,
        bgColor: false,
    };
    let savedElementsLabels: any = [];
    let numberPositionY = 500;
    let numberAux = 0;
    const converter = new showdown.Converter();
    const [numberPositionX, setNumberPositionX] = useState(800);
    const reactFlowWrapper = useRef(null as any | null);
    const [checkStatus, setCheckStatus] = useState(arrayCheck)
    const [elements, setElements] = useState<any[]>(initialElements as any);
    const [idNumber, setIdNumber] = useState('0');
    const [reactFlowInstance, setReactFlowInstance] = useState(null as any | null);
    const [history, setHistory] = useState('');
    const [constHistory, setConstHistory] = useState('');
    const [title, setTitle] = useState('');
    const [constTitle, setConstTitle] = useState('');
    const [option, setOption] = useState('');
    const [nodeColor, setNodeColor] = useState('');
    const [constNodeColor, setConstNodeColor] = useState('');
    const [textColor, setTextColor] = useState('');
    const [constTextColor, setConstTextColor] = useState('');
    const [bgColor, setBgColor] = useState('');
    const [constBgColor, setConstBgColor] = useState('');
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
    const [updateCurrentID, setUpdateCurrentID] = useState(false)
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
    const [image, setImage] = useState(null as any | null)
    const [alt1Disabled, setAlt1Disabled] = useState(false);
    const [alt2Disabled, setAlt2Disabled] = useState(false);
    const [card1Disabled, setCard1Disabled] = useState(false);
    const [card2Disabled, setCard2Disabled] = useState(false);
    const [disabledAuxAlt, setDisabledAuxAlt] = useState(true);
    const [disabledAuxCard, setDisabledAuxCard] = useState(true);
    const [theme, setTheme] = useState('');
    const [compiledContent, setCompiledContent] = useState('');
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);


    //controle de estado para modal
    const [modalShow, setModalShow] = useState(false);

    const getNodes = async () => {
        const gamesResult = await fetch(api_url + 'game/' + urlParams.get('game'), {
            method: 'GET',
            headers: {
                "Access-Control-Allow-Origin": "*",
                'Content-Type': 'application/json'
            }
        });
        // console.log(gamesResult)
        return gamesResult;
    }

    const getConnections = async () => {
        const connectionsResult = await fetch(api_url + 'connection/' + urlParams.get('game'), {
            method: 'GET',
            headers: {
                "Access-Control-Allow-Origin": "*",
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
            result.nodes.map((item: any, index: any) => {
                item.labels.map((item: any) => {
                    savedElementsLabels.push(
                        { 'name': item.label, 'color': item.color }
                    )
                })
                savedElements.push({
                    id: item._id,
                    type: item.nodeType,
                    data: {
                        id: item._id,
                        history: item.markdownContent,
                        compiled_content: item.compiled_content,
                        title: item.name,
                        nodeStart: item.startNode,
                        nodeEnd: item.endNode,
                        duration: item.duration,
                        textColor: item.textColor,
                        bgColor: item.backgroundColor,
                        nodeColor: item.nodeColor,
                        nextNodes: item.nextNodes,
                        image: item.nodeImage,
                        theme: item.theme,
                        onEditClick: () => onEditClick(item._id),
                        onFormSaveClick: () => onFormSaveClick(),
                        createNodeConnectionForm: (card: any) => createNodeConnectionForm(card),
                        show: false,
                        // eslint-disable-next-line
                        tagsArray: savedElementsLabels
                    },
                    position: item.position
                })
                savedElementsLabels = []
            })
            connRes.nodeConnection.map((item: any, index: any) => {
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
            if (savedElements.length !== 0) {
                setElements(savedElements);
            }
        }
        function onFormSaveClick() {
            setUpdate(update => update = update + 1)
        }

        populate()
    }, [update])

    const onElementsRemove = async (elementsToRemove: Elements) => {
        setElements((els: any) => removeElements(elementsToRemove, els));
        await fetch(api_url + 'node/delete/' + elementsToRemove[0].id, {
            method: 'DELETE',
            headers: {
                "Access-Control-Allow-Origin": "*",
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                elements: elementsToRemove,
                game: urlParams.get('game')
            })
        });
    }
    const onConnect = (params: Edge | Connection) => setElements((els: any) => addEdge({ ...params, animated: true, arrowHeadType: 'arrowclosed' as ArrowHeadType, style: { color: 'white', stroke: 'white' } }, els));
    const onLoad = (_reactFlowInstance: OnLoadParams) => {
        setReactFlowInstance(_reactFlowInstance);
    }

    const onDragOver = (event: any) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    };

    useEffect(() => {
        if (currentNodeInfo !== null) {
            setIsOpen(true);
        }
    }, [currentNodeInfo])

    const onEditClick = async (id: any) => {
        //abrindo modal
        setModalShow(true)

        setAlt1Disabled(false);
        setAlt2Disabled(false);
        setCard1Disabled(false);
        setCard2Disabled(false);
        setDisabledAuxAlt(true);
        setDisabledAuxCard(true);
        setSelectedTags([])
        const labelList = await fetch(api_url + 'label', {
            method: 'GET',
            headers: {
                "Access-Control-Allow-Origin": "*",
                'Content-Type': 'application/json'
            }
        });
        setCurrentID(id);
        setUpdateCurrentID(true);
        const result = await labelList.json();
        setTags1(result.label);
        let typeId = typeof id;
        if (typeId !== 'object') {
            const nodeResult = await fetch(api_url + 'node/' + id, {
                method: 'GET',
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    'Content-Type': 'application/json'
                }
            });

            const resultNode = await nodeResult.json();
            setCurrentNodeInfo(resultNode);
        } else {
            setCurrentNodeInfo('unsaved');
        }
    }

    const saveTags = async () => {
        try {
            await fetch(api_url + 'label/create', {
                method: 'POST',
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ label: tagName, value: tagName, color: tagColor === "" ? "#000" : tagColor })
            });
        } catch (err) {
            console.log("erro ao criar tag: " + err)
        }
        setTags(tags.concat({ "label": tagName, "value": tagName, "color": tagColor === "" ? "#000" : tagColor }))
        onRequestClose();
        setTagColor("#000");
        setTagName("");
    }

    const createNode = (position: any, type: string, origin: number, title: string) => {
        let idToInt = parseInt(idNumber) + 1;
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
                onEditClick: onEditClick,
                onFormSaveClick: () => setUpdate(update => update = update + 1),
                createNodeConnection: () => createNodeConnection(),
                // eslint-disable-next-line
                tagsArray: Array()
            },
        };
        setElements((es: Elements) => es.concat(newNode));
        if (origin === 1) {
            apiSaveNodes(title, false, false, '0', '', Array(), position, nodeColor, textColor, bgColor, type);
        } else {
            apiSaveNodes('', false, false, '0', '', Array(), position, nodeColor, textColor, bgColor, type);
        }
    }

    //Create connection
    useEffect(() => {
        if (updateCon) {
            setCount(num => num = num + 1);
        }
    }, [targetID])


    useEffect(() => {
        const createConn = async () => {
            console.log("Createconn")
            if (updateCon) {
                console.log("IF createconn")
                console.log(`COUNT => ${count}`)
                console.log(`TargetID => ${targetID}\nauxCardAlt => ${auxCardAlt[count]}`)

                console.log(`Antes: next nodes => ${nextNodes}`)
                setNextNodes([...Array({ id: targetID, choice: auxCardAlt[count] })]);
                console.log(`Depois: next nodes => ${nextNodes}`)
                await fetch(api_url + 'connection/create', {
                    method: 'POST',
                    headers: {
                        "Access-Control-Allow-Origin": "*",
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
            if (count === auxCardName.length - 1) {
                setAuxCardName(Array());
                setAuxCardAlt(Array());
                setUpdateCon(false)
            }
        }
        createConn();
        setUpdate(update => update = update + 1)
    }, [count])

    useEffect(() => {
        if (updateCon && nextNodes[0].id !== 'err') {
            apiEditNextNodes(nextNodes);
        }
    }, [nextNodes])

    useEffect(() => {
        if (selectedTags.length !== 0) {
            apiEditLabels(selectedTags);
        }
    }, [selectedTags])

    const onDrop = (event: any) => {
        console.log("onDrop...")
        if (elements.length >= 1)
            if (elements[0].id.search('1000') !== -1)
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
        if (NodeId.toString().search('react') === -1) {
            elements.forEach((item: any) => {
                if (item.id === NodeId)
                    if (history !== ' ')
                        item.data.history = history;
            })
        }
        setHistory(' ');
    },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [history, NodeId])

    //Save node title
    useEffect(() => {
        if (NodeId.toString().search('react') === -1) {
            elements.forEach((item: any) => {
                if (item.id === NodeId)
                    if (title !== ' ')
                        item.data.title = title;
            })
        }
        setTitle(' ');
    },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [title, NodeId])

    useEffect(() => {
        if (NodeId.toString().search('react') === -1) {
            elements.forEach((item: any) => {
                if (item.id === NodeId)
                    item.data.theme = theme;
            })
        }
        //setNodeColor('#000000');
    },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [theme, NodeId])


    //Save if the node is a start node
    useEffect(() => {
        if (reg) {
            if (NodeId.toString().search('react') === -1) {
                elements.forEach((item: any) => {
                    if (item.id === NodeId) {
                        console.log('start: ', checkedStart)
                        item.data.nodeStart = checkedStart;
                        apiEditStartNode(checkedStart);
                    }
                })
            }
            setReg(false);
        }
    },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [checkedStart, NodeId])

    //Save if the node is a end node
    useEffect(() => {
        if (reg) {
            if (NodeId.toString().search('react') === -1) {
                elements.forEach((item: any) => {
                    if (item.id === NodeId) {
                        console.log(checkedEnd)
                        item.data.nodeEnd = checkedEnd;
                        apiEditEndNode(checkedEnd);
                    }
                })
            }
            setReg(false);
        }
    },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [checkedEnd, NodeId])

    //add tags
    useEffect(() => {
        if (NodeId.toString().search('react') === -1) {
            elements.forEach((item: any) => {
                if (item.id === NodeId)
                    item.data.tagsArray = selectedTags;
            })
        }
    },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [selectedTags])

    //Save node duration
    useEffect(() => {
        if (NodeId.toString().search('react') === -1) {
            elements.forEach((item: any) => {
                if (item.id === NodeId)
                    if (duration !== ' ')
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
        setConstHistory(event.blocks.map((item: any) => item.text).join('\n'));
        setCheckStatus((oldState: any) => ({ ...oldState, desc: true }))
    }

    const onChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log(event.target.value)
        setTitle(event.target.value)
        setConstTitle(event.target.value)
        setCheckStatus((oldState: any) => ({ ...oldState, title: true }))
    }

    const onChangeDuration = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDuration(event.target.value)
        setConstDuration(event.target.value);
        setCheckStatus((oldState: any) => ({ ...oldState, duration: true }))
    }

    const onChangeNoLigacao = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNoLigacao(event.target.value)
        if (event.target.value !== "") {
            setAuxCardName((oldArray: any) => [...oldArray, event.target.value]);
            setCheckStatus((oldState: any) => ({ ...oldState, noLigacao: true }))
        }
    }

    useEffect(() => {
        if (auxCardAlt.length !== 0) {
            if (auxCardName.length === 1 && disabledAuxCard === true) {
                setCard1Disabled(true);
                setDisabledAuxCard(false);
            }
            if (auxCardName.length === 2) {
                setCard2Disabled(true);
                setCard1Disabled(true);
            }
        }
    }, [auxCardName]);

    const onChangeTagName = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTagName(event.target.value)
    }
    const onChangeColor = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTagColor(event.target.value);
    }
    const onChangeOption = (event: React.ChangeEvent<HTMLInputElement>) => {
        setOption(event.target.value);
        if (event.target.value !== "") {
            setAuxCardAlt((oldArray: any) => [...oldArray, event.target.value])
            setCheckStatus((oldState: any) => ({ ...oldState, option: true }))
        }
    }

    useEffect(() => {
        if (auxCardAlt.length !== 0) {
            if (auxCardAlt.length === 1 && disabledAuxAlt === true) {
                console.log(auxCardAlt);
                setAlt1Disabled(true);
                setDisabledAuxAlt(false);
            }
            if (auxCardAlt.length === 2) {
                setAlt2Disabled(true);
                setAlt1Disabled(true);
            }
        }
    }, [auxCardAlt]);

    const handleInputChange = (event: any) => {
        setSelectedTags(selectedTags.splice(0, selectedTags.length))
        let x = Array();
        event.map((item: any) => {
            x.push({ 'label': item.label, 'value': item.label, 'color': item.color });
            setSelectedTags(x);
            return 0
        })
    }

    const onChangeNodeImage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setImage(event.target.files ? event.target.files[0] : event.target.files)
    }

    const onChangeNodeEnd = () => {
        setReg(true);
        setAuxEnd(true);
        setCheckedEnd(!checkedEnd);
    }

    const onChangeNodeStart = () => {
        setReg(true);
        setAuxStart(true);
        setCheckedStart(!checkedStart);
    }

    const onChangeTheme = (event: any) => {
        setTheme(event.value);
    }

    const selectColors = (theme: any) => {
        setCheckStatus((oldState: any) => ({ ...oldState, nodeColor: true }))
        setCheckStatus((oldState: any) => ({ ...oldState, bgColor: true }))
        setCheckStatus((oldState: any) => ({ ...oldState, textColor: true }))
        switch (theme) {
            case 'Chocolate':
                setConstNodeColor('#a1e346')
                setConstBgColor('#689b22')
                setConstTextColor('#73766e')
                break;
            case 'Vanilla':
                setConstNodeColor('#257488')
                setConstBgColor('#9bc7d3')
                setConstTextColor('#1c1c1c')
                break;
        }
    }

    const editColors = async (nodeColor: string, backgroundColor: string, textColor: string) => {
        await fetch(`${api_url}node/edit/colors/${currentID}`, {
            method: 'PUT',
            headers: {
                "Access-Control-Allow-Origin": "*",
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                backgroundColor: backgroundColor,
                textColor: textColor,
                nodeColor: nodeColor
            })
        });
        setAuxEnd(false)
    }

    useEffect(() => {
        if (constNodeColor !== '')
            editColors(constNodeColor, constBgColor, constTextColor);
    }, [constNodeColor])

    const claick = () => {
        console.log("NextNodes: ", nextNodes)
        console.log("Elements: ", elements);
        console.log(typeof elements);
        console.log("Tags: ", tags)
        console.log("SelectedTags: ", selectedTags)
    }

    const createNodeConnectionForm = (card: any) => {
        console.log("CreateNodeConnectionForm...")
        if (card !== '') {
            numberAux = numberAux + 1;
            const position = {
                x: window.innerWidth - numberPositionX,
                y: window.innerHeight - numberPositionY
            };
            createNode(position, 'special', 1, card);
            numberPositionY = numberPositionY - 150;
            if (numberAux % 2 === 0) {
                setNumberPositionX(numberPositionX => numberPositionX = numberPositionX - 250);
            }
            setUpdateCon(true);
            setNoLigacao('');
        }
    }

    const createNodeConnection = () => {
        console.log("CreateConnection... ")
        auxCardName.forEach(no => {
            if (no !== '') {
                let exist = false;
                elements.forEach((element: any) => {
                    if (element.id.search('react') === -1) {
                        if (element.data.title === no) {
                            exist = true;
                            setUpdateCon(true);
                            setTargetID(element.id);
                        }
                    }
                });
                if (!exist) {
                    numberAux = numberAux + 1;
                    const position = reactFlowInstance.project({
                        x: window.innerWidth - numberPositionX,
                        y: window.innerHeight - numberPositionY,
                    });
                    createNode(position, 'special', 1, no);
                    numberPositionY = numberPositionY - 150;
                    if (numberAux % 2 === 0) {
                        setNumberPositionX(numberPositionX => numberPositionX = numberPositionX - 250);
                    }
                }
                setUpdateCon(true);
                setNoLigacao('');
            }
        })
    }

    const sendMessage = async () => {
        try {
            const gamesResult = await getNodes();
            const result = await gamesResult.json();
            console.log(result.game)
            await fetch(api_url + 'message/send', {
                method: 'POST',
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    type: 'game-create-update',
                    game: result.game
                })
            });
        } catch (err) {
            console.log("erro ao enviar mensagem: " + err)
        }
    }

    const apiSaveNodes = async (name: string, startNode: boolean, endNode: boolean, duration: string, markdownContent: string, labels: any, position: any, nodeColor: any, textColor: any, bgColor: any, type: any) => {
        try {
            const saved = await fetch(`${api_url}node/create`, {
                method: 'POST',
                headers: {
                    "Access-Control-Allow-Origin": "*",
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
                    backgroundColor: bgColor,
                    nodeType: type
                })
            });
            const jsonSaved = await saved.json();
            if (name !== '') {
                setTargetID(jsonSaved.gameNode._id)
                setUpdateCon(true)
            }
            // sendMessage();
        } catch (err) {
            console.log("erro ao criar tag: " + err)
        }
        setUpdate(update => update = update + 1)
    }
    const apiEditNextNodes = async (nextNodes: any) => {
        console.log(`API EDIT NEXT NODES => ${nextNodes}`)
        await fetch(`${api_url}node/edit/nextnodes/${currentID}`, {
            method: 'PUT',
            headers: {
                "Access-Control-Allow-Origin": "*",
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nextNodes: nextNodes
            })
        });
        // setNextNodes({ ...Array({ id: 'err', choice: 'err' }) });
    }

    const apiEditEndNode = async (endNode: boolean) => {
        await fetch(`${api_url}node/edit/end/${currentID}`, {
            method: 'PUT',
            headers: {
                "Access-Control-Allow-Origin": "*",
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                endNode: endNode
            })
        });
        setAuxEnd(false)
    }

    const apiEditStartNode = async (startNode: boolean) => {
        await fetch(`${api_url}node/edit/start/${currentID}`, {
            method: 'PUT',
            headers: {
                "Access-Control-Allow-Origin": "*",
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                startNode: startNode
            })
        });
        setAuxStart(false)
    }

    const apiEditLabels = async (labels: any) => {
        await fetch(`${api_url}node/edit/labels/${currentID}`, {
            method: 'PUT',
            headers: {
                "Access-Control-Allow-Origin": "*",
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                labels: labels
            })
        });
    }

    const apiEditImage = async (img: any) => {
        const data = new FormData();
        data.append("nodeImage", img)
        await fetch(`${api_url}node/edit/image/${currentID}`, {
            method: 'PUT',
            headers: {
                "Access-Control-Allow-Origin": "*"
            },
            body: data
        })
    }

    useEffect(() => {
        if (image !== null) {
            apiEditImage(image)
        }

    }, [image])

    const htmlVersion = async (compiledContent: any) => {
        await fetch(`${api_url}node/edit/compiled_content/${currentID}`, {
            method: 'PUT',
            headers: {
                "Access-Control-Allow-Origin": "*",
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                compiled_content: compiledContent
            })
        });
    }

    useEffect(() => {
        if (compiledContent !== '') {
            htmlVersion(compiledContent);
        }
    }, [compiledContent])

    const apiEditNodes = async (name: string, duration: string, markdownContent: string, theme: any) => {
        // setCompiledContent(converter.makeHtml(markdownContent))
        try {
            await fetch(`${api_url}node/edit/${currentID}`, {
                method: 'PUT',
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: checkStatus.title === false ? currentNodeInfo.gameNode.name : name,
                    duration: checkStatus.duration === false ? currentNodeInfo.gameNode.duration : duration,
                    markdownContent: checkStatus.desc === false ? currentNodeInfo.gameNode.markdownContent : markdownContent,
                    id: urlParams.get('game') as any,
                    theme: theme
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
                bgColor: false
            })
        } catch (err) {
            console.log("erro ao criar card: " + err)
        }
        setUpdate(update => update = update + 1);
        setCount(-1);
    }

    const onSaveChanges = async () => {
        selectColors(theme)
        await apiEditNodes(constTitle, constDuration, constHistory, theme);
        createNodeConnection();
        onRequestClose();
    }

    const onNodeDrag = (event: any, node: any) => {
        const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
        const pos = reactFlowInstance.project({
            x: event.clientX - reactFlowBounds.left - 50,
            y: event.clientY - reactFlowBounds.top - 58,
        });
        setPosition(pos);
        setNodeDragID(node.id);
    }

    useEffect(() => {
        if (position !== null && nodeDragID !== '') {
            putPosition(position, nodeDragID);
            setNodeDragID('');
        }
    }, [position, nodeDragID]);

    const putPosition = async (position: any, nodeDragID: any) => {
        await fetch(`${api_url}node/edit/position/${nodeDragID}`, {
            method: 'PUT',
            headers: {
                "Access-Control-Allow-Origin": "*",
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                position: position
            })
        });
    }

    const onClickPlay = () => {
        const url = new URL(window.location.href)
        const gameID = url.searchParams.get("game")

        nav_history.push({
            pathname: '/play',
            search: `?game=${gameID}`
        })

        window.localStorage.setItem("elements", JSON.stringify(elements))
    }

    return (
        <div className="container-fluid min-vh-100">
            <div className="row">
                <div className="col bg-surface min-vh-100">
                    <Sidebar />
                </div>

                <div className="col-10 d-flex bg-surface flex-column m-0 p-0">
                    <div className="btn-play-wrapper">
                        <button className="my-btn-play" onClick={onClickPlay}>
                            <BsPlay />
                            Play
                        </button>
                    </div>
                    <div className="reactflow-wrapper" ref={reactFlowWrapper}>
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
                            <MiniMap className="reactflow-minimap" />
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
                                onChangeNodeImage={onChangeNodeImage}
                                onChangeTheme={onChangeTheme}
                                alt1Disabled={alt1Disabled}
                                alt2Disabled={alt2Disabled}
                                card1Disabled={card1Disabled}
                                card2Disabled={card2Disabled}
                                currentNodeInfo={currentNodeInfo} //currentNodeInfo


                                show={modalShow}
                                onHide={() => setModalShow(false)}
                            />
                            <Controls />
                            <Background
                                variant={'lines' as BackgroundVariant}
                                size={0.1}
                                color="#fff"
                                gap={10}
                            />
                            <DragAndDrop />
                            <div>
                                <ModalAttributesAndEvents elements={elements} />
                            </div>
                        </ReactFlow>
                    </div>
                </div>
            </div>
        </div>
    );
};

// export default EditorScreen;

export { EditorScreen };