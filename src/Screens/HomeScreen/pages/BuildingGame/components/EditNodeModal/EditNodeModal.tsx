import React, { Fragment, useState } from 'react'
import { Button, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import { BsFillPencilFill, BsEyeFill } from 'react-icons/bs'
import { MyEditor } from './../../../../../components/TextEditor/TextEditor'
import './styles/styles.scss'

const PathTab: React.FC = () => {
    return (
        <Fragment>
            <div className="mb-3">
                <button className="btn btn-outline-primary">
                    Add new
                </button>
            </div>
            <div className="row mb-3">
                <div className="col">
                    <label
                        htmlFor="choiceField"
                        className="form-label"
                    >
                        Choice
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Small"
                        id="choiceField"
                    />
                </div>
                <div className="col">
                    <label
                        htmlFor="cardField"
                        className="form-label"
                    >
                        Card
                    </label>
                    <select
                        className="form-select"
                        placeholder="Small"
                        aria-label="Small"
                        id="cardField"
                    >
                        <option selected>Small</option>
                    </select>
                </div>
            </div>
        </Fragment>
    )
}

const TagTab: React.FC = () => {
    return (
        <Fragment>
            <label
                htmlFor="newTagsField"
                className="form-label"
            >
                New Tags
            </label>
            <select
                className="form-select"
                placeholder="Small"
                id="newTagsField"
                aria-label="Large"
            >
                <option selected>Large</option>
            </select>

        </Fragment>
    )
}

const ColorTab: React.FC = () => {
    return (
        <div className="row">
            <div className="col-8">
                <label htmlFor="colorPallete" className="form-label">Color pallete</label>
                <select name="colorPallete" id="colorPallete" className="form-select">
                    <option selected>Medium</option>
                </select>
            </div>
            <div className="col-4 d-flex align-items-end">
                <button className="btn btn-pallet-1 mx-1 w-25 h-50 rounded-pill" onClick={() => console.log("pallet-1")}></button>
                <button className="btn btn-pallet-2 mx-1 w-25 h-50 rounded-pill" onClick={() => console.log("pallet-2")}></button>
                <button className="btn btn-pallet-3 mx-1 w-25 h-50 rounded-pill" onClick={() => console.log("pallet-3")}></button>
            </div>
        </div>
    )
}

interface IEditNodeModal {
    id: number;
}

const EditNodeModal: React.FC<IEditNodeModal> = (props) => {
    const [getIsStartNode, setIsStartNode] = useState<boolean | undefined>(false);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleSaveChanges = () => handleClose()

    return (
        <Fragment>
            <Button variant="primary" onClick={handleShow} className="p-0 m-0 d-flex justify-content-center align-items-center w-25 h-25">
                <BsFillPencilFill />
            </Button>

            <Modal show={show} onHide={handleClose} size="xl">
                <Modal.Header closeButton>
                    {/* <Modal.Title>{props.id}</Modal.Title> */}
                    <Button className="btn-sm p-1 d-flex justify-content-around align-items-center">
                        <BsEyeFill className="mx-1" />
                        Preview
                    </Button>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <div className="mb-3">
                            <label
                                htmlFor="cardField"
                                className="form-label"
                            >
                                Title
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Small"
                                id="cardField"
                            />
                        </div>
                        <div className="mb-3">
                            <label
                                htmlFor="inputEditGameMarkdown"
                                className="form-label"
                            >
                                Markdown field (without preview)
                            </label>
                            <MyEditor/>
                            {/* <textarea
                                id="inputEditGameMarkdown"
                                className="form-control"
                                placeholder="Lorem ipsum dolor sit amet, consectet ui i iadipiscing elit."
                            /> */}
                        </div>
                        <div className="mb-3">
                            <div className="row">
                                <div className="col">
                                    <div className="form-check form-switch">
                                        <input className="form-check-input" type="checkbox" role="switch" id="switchStartNode" onClick={() => setIsStartNode(!getIsStartNode)} checked={getIsStartNode} />
                                        <label className="form-check-label" htmlFor="switchStartNode">Start Node</label>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="form-check form-switch">
                                        <input className="form-check-input" type="checkbox" role="switch" id="switchEndNode" onClick={() => setIsStartNode(!getIsStartNode)} checked={!getIsStartNode} />
                                        <label className="form-check-label" htmlFor="switchEndNode">End Node</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mb-3">
                            <ul className="nav nav-tabs">
                                <li className="nav-item">
                                    <Link className="nav-link active" id="path-tab" data-bs-toggle="tab" data-bs-target="#path" to="#">Path</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" id="tag-tab" data-bs-toggle="tab" data-bs-target="#tag" to="#">Tags</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" id="color-tab" data-bs-toggle="tab" data-bs-target="#color" to="#">Colors</Link>
                                </li>
                            </ul>

                            <div className="tab-content bg-white" id="editGameModalTabContent">
                                <div className="tab-pane fade" id="path" aria-labelledby="path-tab">
                                    <PathTab />
                                </div>
                                <div className="tab-pane fade" id="tag" aria-labelledby="tag-tab">
                                    <TagTab />
                                </div>
                                <div className="tab-pane fade" id="color" aria-labelledby="color-tab">
                                    <ColorTab />
                                </div>
                            </div>
                        </div>
                        <div className="mb-3">
                            <label
                                htmlFor="bgcDefaultField"
                                className="form-label"
                            >
                                Default Background
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Small"
                                id="bgcDefaultField"
                            />
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleSaveChanges}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </Fragment>
    );
}

export { EditNodeModal }