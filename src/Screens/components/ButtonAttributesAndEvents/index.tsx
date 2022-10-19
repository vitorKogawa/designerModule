import { extname } from 'path';
import React, { ChangeEvent, FormEvent, useState, useEffect, Fragment } from 'react'
import { Button, Modal, Tabs, Tab, Form, ButtonGroup, Dropdown } from 'react-bootstrap';
import { SyntheticEvent } from 'react-draft-wysiwyg';
import { BsFillTrashFill, BsPenFill, BsFillExclamationCircleFill } from 'react-icons/bs'
import Swal from 'sweetalert2';
import { api } from '../../../services/api';
import { IAttribute } from '../../HomeScreen/interfaces/IAttributes';
import { IEvents } from '../../HomeScreen/interfaces/IEvents';
import './styles/style.scss'

interface IModalAttributesAndEvents {
    elements: any
}

interface IAttributeOrEvent { attribute?: IAttribute, event?: IEvents, elements: any, attributes: IAttribute[] }

const ModalAttributesAndEvents: React.FC<IModalAttributesAndEvents> = (props) => {
    //modal
    const [lgShow, setLgShow] = useState(false);

    // modal de atributos cadastrados
    const [showModalAttributes, setShowModalAttributes] = useState(false);
    const handleCloseModalAttributes = () => {
        setShowModalAttributes(false)
        setLgShow(true)
    }

    const handleShowModalAttributes = () => {
        setShowModalAttributes(true);
        setLgShow(false)
    }

    //modal de eventos cadastrados
    const [showModalEventos, setShowModalEventos] = useState(false);
    const handleCloseModalEventos = () => {
        setShowModalEventos(false);
        setLgShow(true)
    }

    const handleShowModalEventos = () => {
        setShowModalEventos(true);
        setLgShow(false)
    }

    //tabs
    const [key, setKey] = useState('atributos');
    //variaveis para formulário de cadastro dos atributos [START]
    const [getAttributeName, setAttributeName] = useState<string>("");
    const [getAttributeType, setAttributeType] = useState<string>("");
    const [getAttributeMaxValue, setAttributeMaxValue] = useState<number>(0);
    const [getAttributeDefaultValue, setAttributeDefaultValue] = useState<number>(0);
    const [getIsAttributePlayer, setIsAttributePlayer] = useState<boolean>(false);
    const [getArrayFiles, setArrayFiles] = useState([]) //upload da imagem do icone do atributo.
    const [getAttributes, setAttributes] = useState<IAttribute[]>([])
    const [getEvents, setEvents] = useState<IEvents[]>([])
    //variaveis para formulário de cadastro dos atributos [END]


    //variaveis para formulário de cadastro do evento [START]
    const [getEventName, setEventName] = useState<string>("");
    const [getEventSourceType, setEventSourceType] = useState<string>("")
    const [getEventSourceID, setEventSourceID] = useState<string>("")
    const [getEventOperator, setEventOperator] = useState<string>("")
    const [getEventValue, setEventValue] = useState<number>(0)
    const [getEventTargetType, setEventTargetType] = useState<string>("")
    const [getEventTargetID, setEventTargetID] = useState<string>("")
    const [getEventModifier, setEventModifier] = useState<string>("")
    //variaveis para formulário de cadastro do evento [END]

    const [getDeletedNodes, setDeletedNodes] = useState<any>([])


    //funções para o formulário de cadastro do atributo[START]
    const handleAttributeName = (event: ChangeEvent<HTMLInputElement>) => setAttributeName(event.target.value)
    const handleAttributeType = (event: ChangeEvent<HTMLInputElement>) => setAttributeType(event.target.value)
    const handleAttributeMaxValue = (event: ChangeEvent<HTMLInputElement>) => setAttributeMaxValue(Number(event.target.value))
    const handleAttributeDefaultValue = (event: ChangeEvent<HTMLInputElement>) => setAttributeDefaultValue(Number(event.target.value));
    const handleIsAttributPlayer = (value: boolean) => setIsAttributePlayer(value);
    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        let files: any = event.target.files
        let newFiles: any = []

        Object.values(files).map((file: any) => newFiles.push(file))
        setArrayFiles(getArrayFiles.concat(newFiles))
    }

    //capturando todos os atributos cadastrados no banco
    useEffect(() => {
        const getAllAttributes = async () => await api.get('/attributes')
            .then(response => setAttributes(response.data.attributes))
            .catch(error => console.error(error))

        getAllAttributes()
    }, [])

    //capturando todos os eventos cadastrados no banco
    useEffect(() => {
        const aux: string[] = []
        const getAllEvents = async () => await api.get('/events')
            .then(response => {
                setEvents(response.data.events)

                const source_ids = response.data.events.map((e: IEvents) => e.source_id)
                const target_ids = response.data.events.map((e: IEvents) => e.target_id)
                const ids = source_ids.concat(target_ids)


                ids.map(async (id: string) => await api.get(`/node/${id}`)
                    .then(response => response.data.gameNode === null ? aux.push(id) : "")
                    .catch(error => console.error(error)))

                setDeletedNodes(aux)
            })
            .catch(error => console.error(error))

        getAllEvents()
        setDeletedNodes(aux)
    }, [])


    //enviando dados para o backend
    const handleSubmit_Attributes = async (event: FormEvent) => {
        event.preventDefault()

        let formData = new FormData()

        formData.set('name', getAttributeName);
        formData.set('type', getAttributeType);
        formData.set('max_value', String(getAttributeMaxValue));
        formData.set('default_value', String(getAttributeDefaultValue));
        formData.set('player_attr', String(getIsAttributePlayer));
        getArrayFiles.map((file: any) => formData.append("icon", file.slice(), `${Date.now()}${extname(file.name)}`))

        await api.post('/attributes/create', formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        }).then(response => Math.trunc(response.status / 100) === 2 ? sucessMessage('Uhuuu!!', 'Atributo cadastrado com sucesso!') : errorMessage('Eita!', 'Falha ao cadastrar atributo.')
        ).catch(error => console.error(error))

    }


    const errorMessage = (title: string, text: string) => Swal.fire({
        icon: 'error',
        title,
        text,
        confirmButtonText: 'OK',
        confirmButtonColor: '#F8BA63'
    }).then(result => result.isConfirmed ? setLgShow(false) : '')

    const sucessMessage = (title: string, text: string) => Swal.fire({
        icon: 'success',
        title,
        text,
        confirmButtonText: 'OK',
        confirmButtonColor: '#F8BA63'
    }).then(result => result.isConfirmed ? setLgShow(false) : '')
    //funções para o formulário de cadastro do atributo[END]


    //Eventos para o formulário de cadastro do atributo[START]
    const handleEventName = (event: ChangeEvent<HTMLInputElement>) => setEventName(event.target.value)
    const handleEventSourceType = (event: ChangeEvent<HTMLSelectElement>) => {
        setEventSourceType(event.target.value)
        setEventSourceID(event.target.value)
    }
    const handleEventOperator = (event: ChangeEvent<HTMLInputElement>) => setEventOperator(event.target.value)
    const handleEventValue = (event: ChangeEvent<HTMLInputElement>) => setEventValue(Number(event.target.value))
    const handleEventTargetType = (event: ChangeEvent<HTMLSelectElement>) => {
        setEventTargetType(event.target.value)
        setEventTargetID(event.target.value)
    }
    const handleEventModifier = (event: ChangeEvent<HTMLSelectElement>) => setEventModifier(event.target.value)

    const handleSubmit_Events = async (event: FormEvent) => {
        event.preventDefault()

        const newEvent = {
            name: getEventName,
            source_type: getEventSourceType,
            source_id: getEventSourceID,
            operator: getEventOperator,
            value: String(getEventValue),
            target_type: getEventTargetType,
            target_id: getEventTargetID,
            modifier: String(getEventModifier)
        }

        await api.post('events/create', newEvent)
            .then(response => {
                console.log(response.data, response.status)
            }).catch(error => {
                console.log(error)
            })
    }


    return (
        <React.Fragment>
            <Button
                onClick={() => setLgShow(true)}
                className="btn btn-primary position-absolute bottom-0 end-0 m-2"
                style={{ zIndex: 999, display: props.elements.length >= 1 ? 'block' : 'none' }}
            >
                Atributos {props.elements.length >= 2 ? '/ Eventos' : ''}
            </Button>


            <Modal
                size="xl"
                show={lgShow}
                onHide={() => setLgShow(false)}
                aria-labelledby="modal-atributos-eventos"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="modal-atributos-eventos">
                        Atributos & Eventos
                    </Modal.Title>
                    <Dropdown as={ButtonGroup}>
                        <Button>Mais</Button>

                        <Dropdown.Toggle split id="dropdown-split-basic" />

                        <Dropdown.Menu>
                            <Dropdown.Item onClick={handleShowModalAttributes}>Atributos cadastrados</Dropdown.Item>
                            <Dropdown.Item onClick={handleShowModalEventos}>Eventos cadastrados</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Modal.Header>
                <Modal.Body>

                    <Tabs
                        id="controlled-tab-example"
                        activeKey={key}
                        onSelect={(k: any) => setKey(k)}
                        className="mb-3"
                    >
                        <Tab eventKey="atributos" title="Atributos">
                            <Form onSubmit={handleSubmit_Attributes}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Nome do atributo</Form.Label>
                                    <Form.Control type="text" onChange={handleAttributeName} />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Tipo do atributo</Form.Label>
                                    <Form.Control type="text" onChange={handleAttributeType} />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Valor Máximo do atributo</Form.Label>
                                    <Form.Control type="text" onChange={handleAttributeMaxValue} />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Valor padrão do atributo</Form.Label>
                                    <Form.Control type="text" onChange={handleAttributeDefaultValue} />
                                </Form.Group>

                                {/* <Form.Group className="mb-3">
                                    <Form.Check
                                        type="switch"
                                        id="chbx_attribute_player"
                                        label="É um atributo de jogador ?"
                                        onClick={() => handleIsAttributPlayer(!getIsAttributePlayer)}
                                        checked={getIsAttributePlayer}
                                    />
                                </Form.Group> */}

                                <Form.Group className="mb-3">
                                    <Form.Label>Selecione um ícone para este atributo</Form.Label>
                                    <Form.Control type="file" onChange={handleFileChange} />
                                </Form.Group>


                                <Button variant="primary" type="submit">
                                    Cadastrar Atributo
                                </Button>
                            </Form>
                        </Tab>
                        <Tab eventKey="eventos" title="Eventos">
                            {
                                props.elements.length >= 2 ?
                                    <Form onSubmit={handleSubmit_Events}>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Nome do Evento</Form.Label>
                                            <Form.Control type="text" onChange={handleEventName} />
                                        </Form.Group>

                                        <Form.Group className="mb-3">
                                            <Form.Label>Source Type</Form.Label>
                                            <Form.Select aria-label="Selecione o source type do evento" onChange={handleEventSourceType}>
                                                <option value="">Selecione o nó de origem</option>
                                                {
                                                    props.elements.map((item: any) => <option value={item.id} key={item.id}>{item.id}</option>)
                                                }
                                            </Form.Select>
                                        </Form.Group>

                                        <Form.Group className="mb-3">
                                            <Form.Label>Operador do evento</Form.Label>
                                            <Form.Control type="text" onChange={handleEventOperator} />
                                        </Form.Group>

                                        <Form.Group className="mb-3">
                                            <Form.Label>Valor do evento</Form.Label>
                                            <Form.Control type="text" onChange={handleEventValue} />
                                        </Form.Group>

                                        <Form.Group className="mb-3">
                                            <Form.Label>Target Type</Form.Label>
                                            <Form.Select aria-label="Selecione o target type do evento" onChange={handleEventTargetType}>
                                                <option value="">Selecione o nó de disparo</option>
                                                {
                                                    props.elements.map((item: any) => <option value={item.id} key={item.id}>{item.id}</option>)
                                                }
                                            </Form.Select>
                                        </Form.Group>

                                        <Form.Group className="mb-3">
                                            <Form.Label>Modificador do evento (Atributo a ser afetado)</Form.Label>
                                            <Form.Select aria-label="Selecione o atributo a ser alterado" onChange={handleEventModifier}>
                                                <option value="">Selecione o atributo a ser alterado</option>
                                                {
                                                    getAttributes.map((attr: IAttribute) => <option value={attr._id} key={attr._id}>{attr.name}</option>)
                                                }
                                            </Form.Select>
                                        </Form.Group>

                                        <Button variant="primary" type="submit">
                                            Cadastrar Evento
                                        </Button>
                                    </Form>
                                    :
                                    <h3>É necessário no mínimo 2 nós criados para configuração de um novo Evento</h3>
                            }

                        </Tab>
                    </Tabs>
                </Modal.Body>
            </Modal>

            {/* modal de atributos cadastrados */}
            <Modal show={showModalAttributes} onHide={handleCloseModalAttributes} size="xl" centered>
                <Modal.Header closeButton>
                    <Modal.Title>Atributos cadastrados</Modal.Title>
                </Modal.Header>
                <Modal.Body className="d-flex justify-content-between flex-row">
                    {
                        getAttributes.length > 0 ? getAttributes.map(attribute => <Card attribute={attribute} key={attribute._id} elements={props.elements} attributes={getAttributes}></Card>) : <h3>Nenhum atributo cadastrado.</h3>
                    }
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={handleCloseModalAttributes}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>


            {/* modal de eventos cadastrados */}
            <Modal show={showModalEventos} onHide={handleCloseModalEventos} size="xl" centered>
                <Modal.Header closeButton>
                    <Modal.Title>Eventos cadastrados</Modal.Title>
                </Modal.Header>
                <Modal.Body className="d-flex justify-content-between flex-row">
                    {
                        getEvents.length > 0 ? getEvents.map(event => <Card event={event} key={event._id} elements={props.elements} attributes={getAttributes}></Card>) : <h3>Nenhum evento cadastrado no momento.</h3>
                    }
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={handleCloseModalEventos}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </React.Fragment>
    )
}

const Card: React.FC<IAttributeOrEvent> = (props) => {
    const [showModalEditAttribute, setShowModalEditAttribute] = useState<{ visible: boolean, id: string }>({ visible: false, id: "" })
    const [showModalEditEvent, setShowModalEditEvent] = useState<{ visible: boolean, id: string }>({ visible: false, id: "" })

    //estados para variáveis de edição do atributo
    const [getAttributeName, setAttributeName] = useState<string>("")
    const [getAttributeType, setAttributeType] = useState<string>("")
    const [getAttributeMaxValue, setAttributeMaxValue] = useState<number>(0)
    const [getAttributeDefaultValue, setAttributeDefaultValue] = useState<number>(0)
    const [getArrayFiles, setArrayFiles] = useState([])

    const [getEventName, setEventName] = useState<string>("");
    const [getEventSourceType, setEventSourceType] = useState<string>("")
    const [getEventSourceID, setEventSourceID] = useState<string>("")
    const [getEventOperator, setEventOperator] = useState<string>("")
    const [getEventValue, setEventValue] = useState<number>(0)
    const [getEventTargetType, setEventTargetType] = useState<string>("")
    const [getEventTargetID, setEventTargetID] = useState<string>("")
    const [getEventModifier, setEventModifier] = useState<string>("")

    const handleAttributeName = (event: ChangeEvent<HTMLInputElement>) => setAttributeName(event.target.value)
    const handleAttributeType = (event: ChangeEvent<HTMLInputElement>) => setAttributeType(event.target.value)
    const handleAttributeMaxValue = (event: ChangeEvent<HTMLInputElement>) => setAttributeMaxValue(Number(event.target.value))
    const handleAttributeDefaultValue = (event: ChangeEvent<HTMLInputElement>) => setAttributeDefaultValue(Number(event.target.value));

    const handleEventName = (event: ChangeEvent<HTMLInputElement>) => setEventName(event.target.value)
    const handleEventSourceType = (event: ChangeEvent<HTMLSelectElement>) => {
        setEventSourceType(event.target.value)
        setEventSourceID(event.target.value)
    }
    const handleEventOperator = (event: ChangeEvent<HTMLInputElement>) => setEventOperator(event.target.value)
    const handleEventValue = (event: ChangeEvent<HTMLInputElement>) => setEventValue(Number(event.target.value))
    const handleEventTargetType = (event: ChangeEvent<HTMLSelectElement>) => {
        setEventTargetType(event.target.value)
        setEventTargetID(event.target.value)
    }
    const handleEventModifier = (event: ChangeEvent<HTMLSelectElement>) => setEventModifier(event.target.value)

    const handleSubmit_Events = async (event: FormEvent) => {
        event.preventDefault()

        const newEvent = {
            name: getEventName,
            source_type: getEventSourceType,
            source_id: getEventSourceID,
            operator: getEventOperator,
            value: String(getEventValue),
            target_type: getEventTargetType,
            target_id: getEventTargetID,
            modifier: String(getEventModifier)
        }

        await api.put(`events/${ showModalEditEvent.id }`, newEvent)
            .then(response => {
                console.log(response.data, response.status)
            }).catch(error => {
                console.log(error)
            })
    }

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        let files: any = event.target.files
        let newFiles: any = []

        Object.values(files).map((file: any) => newFiles.push(file))
        setArrayFiles(getArrayFiles.concat(newFiles))
    }

    const handleCloseModalEditAttribute = (id: string) => {
        setShowModalEditAttribute({ visible: false, id })
    }

    const handleCloseModalEditEvent = (id: string) => {
        setShowModalEditEvent({ visible: false, id })
    }

    const onDelete = (id: string, tipo: string) => {
        Swal.fire({
            title: `Certeza que você deseja remover esse ${tipo === "attribute" ? "atributo" : "evento"} ?`,
            text: "Essa ação é irreversível!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sim'
        }).then(async (result) => {
            if (result.isConfirmed) {
                await api.delete(`/${tipo === "attribute" ? "attributes" : "events"}/${id}`)
                    .then(response => Swal.fire(
                        {
                            title: `${tipo === "attribute" ? "Atributo" : "Evento"} removido com sucesso!`,
                            text: 'Atributo foi removido com sucesso!',
                            icon: 'success'
                        }
                    ).then(() => window.location.reload()))
                    .catch(error => Swal.fire({
                        title: `Falha ao remover ${tipo === "attribute" ? "atributo" : "evento"}`,
                        text: 'Falha durante remoção, favor tente mais tarde.',
                        icon: 'error'
                    }))
            }
        })
    }

    const getAttribute = async (id: string) => {
        return await api.get<IAttribute>(`/attributes/${id}`)
            .then(response => {
                setAttributeName(response.data.name)
                setAttributeType(response.data.type)
                setAttributeMaxValue(response.data.max_value)
                setAttributeDefaultValue(response.data.default_value)
            })
            .catch(error => console.error(error))
    }

    const getEvent = async (id: string) => {
        return await api.get<IEvents>(`/events/${id}`)
            .then(response => {
                setEventName(response.data.name)
                setEventSourceType(response.data.source_type)
                setEventSourceID(response.data.source_id)
                setEventTargetType(response.data.target_type)
                setEventTargetID(response.data.target_id)
                setEventOperator(response.data.operator)
                setEventValue(response.data.value)
                setEventModifier(response.data.modifier)
            })
            .catch(error => console.error(error))
    }

    const onEdit = (id: string) => {
        if (props.attribute) {
            setShowModalEditAttribute({ visible: true, id })
            getAttribute(id)
        } else {
            setShowModalEditEvent({ visible: true, id })
            getEvent(id)
        }
    }

    const errorMessage = (title: string, text: string) => Swal.fire({
        icon: 'error',
        title,
        text,
        confirmButtonText: 'OK',
        confirmButtonColor: '#F8BA63'
    })
    .then(() => window.location.reload())


    const sucessMessage = (title: string, text: string) => Swal.fire({
        icon: 'success',
        title,
        text,
        confirmButtonText: 'OK',
        confirmButtonColor: '#F8BA63'
    })
    .then(() => window.location.reload())
    //funções para o formulário de cadastro do atributo[END]


    //enviando dados para o backend
    const handleSubmit_Attributes = async (event: FormEvent) => {
        event.preventDefault()

        let formData = new FormData()

        formData.set('name', getAttributeName);
        formData.set('type', getAttributeType);
        formData.set('max_value', String(getAttributeMaxValue));
        formData.set('default_value', String(getAttributeDefaultValue));
        getArrayFiles.map((file: any) => formData.append("icon", file.slice(), `${Date.now()}${extname(file.name)}`))

        console.log(formData.get("name"), getAttributeType, getAttributeMaxValue, getAttributeDefaultValue, showModalEditAttribute.id)

        await api.put(`/attributes/${ showModalEditAttribute.id }`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        }).then(response => Math.trunc(response.status / 100) === 2 ? sucessMessage('Uhuuu!!', 'Atributo atualizado com sucesso!') : errorMessage('Eita!', 'Falha ao atualizar atributo.')
        ).catch(error => console.error(error))

    }

    return (
        <Fragment>
            {
                props.attribute ?
                    <div className="card-wrapper">
                        <div className="card-body">
                            <p className="card-body-title">{props.attribute?.name}</p>
                            <div className="card-body-img">
                                <img src={props.attribute?.icon ? `http://localhost:3333/home/card/img/attributes/${props.attribute?.icon}` : "http://localhost:3333/home/card/img/attributes/default.png"} alt="" />
                            </div>
                        </div>
                        <div className="card-footer">
                            <button className="btn-trash" onClick={() => onDelete(props.attribute?._id as string, "attribute")}>
                                <BsFillTrashFill />
                            </button>
                            <button className="btn-edit" onClick={() => onEdit(props.attribute?._id as string)}>
                                <BsPenFill />
                            </button>
                        </div>
                    </div>
                    :
                    <div className="card-wrapper">
                        <div className="card-body">
                            <p>{props.event?.name}</p>
                            <p>Nó de origem: {props.event?.source_id} </p>
                            <p>Nó de destino: {props.event?.target_id} </p>
                        </div>
                        <div className="card-footer">
                            <button className="btn-trash" onClick={() => onDelete(props.event?._id as string, "event")}>
                                <BsFillTrashFill />
                            </button>
                            <button className="btn-edit" onClick={() => onEdit(props.event?._id as string)}>
                                <BsPenFill />
                            </button>
                        </div>
                    </div>
            }
            {/* MODAL DE EDIÇÃO DOS ATRIBUTOS */}
            <Modal show={showModalEditAttribute.visible} onHide={handleCloseModalEditAttribute} size="sm" centered>
                <Modal.Header closeButton>
                    <Modal.Title>Edição de atributo</Modal.Title>
                </Modal.Header>
                <Modal.Body className="d-flex justify-content-between flex-row">
                    <Form onSubmit={handleSubmit_Attributes}>
                        <Form.Group className="mb-3">
                            <Form.Label>Nome</Form.Label>
                            <Form.Control type="text" onChange={handleAttributeName} placeholder={getAttributeName} />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Tipo do atributo</Form.Label>
                            <Form.Control type="text" onChange={handleAttributeType} placeholder={getAttributeType}/>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Valor Máximo do atributo</Form.Label>
                            <Form.Control type="text" onChange={handleAttributeMaxValue} placeholder={`${getAttributeMaxValue}`}/>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Valor padrão do atributo</Form.Label>
                            <Form.Control type="text" onChange={handleAttributeDefaultValue} placeholder={`${getAttributeDefaultValue}`}/>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Selecione um ícone para este atributo</Form.Label>
                            <Form.Control type="file" onChange={handleFileChange} />
                        </Form.Group>


                        <Button variant="primary" type="submit">
                            Cadastrar Atributo
                        </Button>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => handleCloseModalEditAttribute(props.attribute?._id as string)}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* MODAL DE EDIÇÃO DOS EVENTOS */}
            <Modal show={showModalEditEvent.visible} onHide={handleCloseModalEditEvent} size="sm" centered>
                <Modal.Header closeButton>
                    <Modal.Title>Edição de evento</Modal.Title>
                </Modal.Header>
                <Modal.Body className="d-flex justify-content-between flex-row">
                    <Form onSubmit={handleSubmit_Events}>
                        <Form.Group className="mb-3">
                            <Form.Label>Nome do Evento</Form.Label>
                            <Form.Control type="text" onChange={handleEventName} placeholder={getEventName}/>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Source Type</Form.Label>
                            <Form.Select aria-label="Selecione o source type do evento" onChange={handleEventSourceType}>
                                <option value="">Selecione o nó de origem</option>
                                {
                                    props.elements.map((item: any) => <option value={item.id} key={item.id}>{item.id}</option>)
                                }
                            </Form.Select>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Operador do evento</Form.Label>
                            <Form.Control type="text" onChange={handleEventOperator} placeholder={getEventOperator}/>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Valor do evento</Form.Label>
                            <Form.Control type="text" onChange={handleEventValue} placeholder={`${getEventValue}`}/>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Target Type</Form.Label>
                            <Form.Select aria-label="Selecione o target type do evento" onChange={handleEventTargetType}>
                                <option value="">Selecione o nó de disparo</option>
                                {
                                    props.elements.map((item: any) => <option value={item.id} key={item.id}>{item.id}</option>)
                                }
                            </Form.Select>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Modificador do evento (Atributo a ser afetado)</Form.Label>
                            <Form.Select aria-label="Selecione o atributo a ser alterado" onChange={handleEventModifier}>
                                <option value="">Selecione o atributo a ser alterado</option>
                                {
                                    props.attributes.map((attr: IAttribute) => <option value={attr._id} key={attr._id}>{attr.name}</option>)
                                }
                            </Form.Select>
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Atualizar Evento
                        </Button>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => handleCloseModalEditEvent(props.event?._id as string)}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </Fragment>
    )
}

export { ModalAttributesAndEvents }