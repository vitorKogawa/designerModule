import { extname } from 'path';
import React, { ChangeEvent, FormEvent, useState, useEffect } from 'react'
import { Button, Modal, Tabs, Tab, Form } from 'react-bootstrap';
import { SyntheticEvent } from 'react-draft-wysiwyg';
import { BsPlus } from 'react-icons/bs'
import Swal from 'sweetalert2';
import { api } from '../../../services/api';
import { IAttribute } from '../../HomeScreen/interfaces/IAttributes';
import { IEvents } from '../../HomeScreen/interfaces/IEvents';

import './styles/style.scss'

interface IModalAttributesAndEvents {
    elements: any
}

const ModalAttributesAndEvents: React.FC<IModalAttributesAndEvents> = (props) => {
    //modal
    const [lgShow, setLgShow] = useState(false);
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
        const getAllEvents = async () => await api.get('/events')
            .then(response => setEvents(response.data.events))
            .catch(error => console.error(error))

        getAllEvents()
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

                                        <Form.Group className="mb-3">
                                            <Form.Label>Eventos cadastrados (Campo somente de visualização)</Form.Label>
                                            <Form.Select aria-label="Selecione o atributo a ser alterado">
                                                {
                                                    getEvents.map((event: IEvents) => <option value={event.value} key={event.value}>{event.name}</option>)
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

        </React.Fragment>
    )
}

export { ModalAttributesAndEvents }