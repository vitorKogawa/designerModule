import React, { ChangeEvent, FormEvent, Fragment, useEffect, useState } from 'react'
import { api } from './../../../../services/api'
import firebase from 'firebase/app'
import { IGame } from '../../interfaces/IGame'
import { useHistory } from 'react-router-dom'
import "firebase/auth"
import './styles/styles.scss'
import { extname } from 'path'

const AddNewGameModal: React.FC = () => {
    const history = useHistory();
    const [gameTitle, setGameTitle] = useState<string>("");
    const [gameDescription, setGameDescription] = useState<string>("");
    const [getDefaultBackgroundColor, setDefaultBackgroundColor] = useState<string>("");
    const [getDefaultColorPallete, setDefaultColorPallete] = useState<string>("")
    const [isTemplate, setIsTemplate] = useState<boolean>(false);
    const [nodeColor, setNodeColor] = useState<string>("");
    const [textColor, setTextColor] = useState<string>("");
    
    const [backgroundImage, setBackgroundImage] = useState(null as any | null);
    const [logoImage, setLogoImage] = useState<FileList | null>();
    const [gameCreatedId, setGameCreatedId] = useState(null as any | null);
    const [arrayFiles, setArrayFiles] = useState([])


    const handleGameTitle = (event: ChangeEvent<HTMLInputElement>) => setGameTitle(event.target.value)
    const handleGameDescription = (event: ChangeEvent<HTMLTextAreaElement>) => setGameDescription(event.target.value)
    const handleDefaultBackground = (event: ChangeEvent<HTMLInputElement>) => setDefaultBackgroundColor(event.target.value)
    const handleColorPallete = (event: ChangeEvent<HTMLSelectElement>) => setDefaultColorPallete(event.target.value) 
    const handleInputFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        let files: any = event.target.files
        let newFiles: any = []

        Object.values(files).map((file: any) => newFiles.push(file))
        setArrayFiles(arrayFiles.concat(newFiles))
    }
    
    // useEffect(() => {
    //     if(gameCreatedId !== null){
    //         history.push({
    //             pathname: '/editor',
    //             search: '?game='+gameCreatedId,
    //             state: {
    //               gameId: gameCreatedId
    //             }
    //           })
    //     }
    //     // eslint-disable-next-line
    //   }, [gameCreatedId]);

    const sendMessage = async (game:any) => {
        try{
            console.log(game);
            await api.post('/message/send', game)
            .then(response => response)
            .catch(error => console.error(error))
        } catch(err){
            console.log("erro ao enviar mensagem: "+err)
        }
    }

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault()

        const userID = firebase.auth()
        let formData = new FormData()

        formData.set("title", gameTitle);
        formData.set("description", gameDescription);
        formData.set("default_node_color", nodeColor);
        formData.set("default_text_color", textColor);
        formData.set("template", isTemplate ? 'true' : 'false');
        formData.set("background_color", getDefaultBackgroundColor);
        formData.set("background_image", backgroundImage);
        arrayFiles.map((file: any) => formData.append("image", file.slice(), `${Date.now()}${extname(file.name)}`))

        if(userID.currentUser){
            formData.append("userID", userID.currentUser.uid);

            await api.post('/game/create', formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                }
            })
            .then(response => {
                console.log(response.data)
                setGameCreatedId(response.data._id)
                // sendMessage(response.data)
            })
            .catch(error => console.error(error))
        }
    }
    
    return (
        <Fragment>
            <button type="button" className="btn btn-primary mx-1" data-bs-toggle="modal" data-bs-target="#gameCardModal">
                Add Game
            </button>
            <div className="modal fade" id="gameCardModal" tabIndex={-1} aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="gameCardTitle">Create a New Game</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <input 
                                        type="file"
                                        className="form-control"
                                        id="inputGameTitle"
                                        onChange={handleInputFileChange}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="inputGameTitle" className="form-label">Title</label>
                                    <input 
                                        type="text"
                                        className="form-control"
                                        id="inputGameTitle" 
                                        placeholder="Large"
                                        onChange={handleGameTitle}    
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="gameDescription" className="form-label">Description</label>
                                    <textarea 
                                        className="form-control"
                                        id="gameDescription"
                                        onChange={handleGameDescription}
                                    />
                                </div>
                                <div className="f-flex flex-row mb-3">
                                    <div className="gameLogo rounded-pill">
                                        {/* <BsJoystick/> */}
                                    </div>
                                    <div className="gameContent d-flex flex-column">
                                        <label htmlFor="defaultColor" className="form-label">Default background</label>
                                        <input 
                                            type="text"
                                            className="form-control"
                                            id="defaultColor"
                                            placeholder="Medium"
                                            onChange={handleDefaultBackground}
                                        />
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <div className="row">
                                        <div className="col-8">
                                            <label htmlFor="colorPallete" className="form-label">Color pallete</label>
                                            <select name="colorPallete" id="colorPallete" className="form-select">
                                                <option>Medium</option>
                                            </select>
                                        </div>
                                        <div className="col-4 d-flex align-items-end">
                                            <button className="btn btn-pallet-1 mx-1 w-25 h-50 rounded-pill" onClick={() => console.log("pallet-1")}></button>
                                            <button className="btn btn-pallet-2 mx-1 w-25 h-50 rounded-pill" onClick={() => console.log("pallet-2")}></button>
                                            <button className="btn btn-pallet-3 mx-1 w-25 h-50 rounded-pill" onClick={() => console.log("pallet-3")}></button>
                                        </div>
                                    </div>

                                </div>
                                <div className="modal-footer">
                                    {/* <button type="button" className="btn btn-primary w-100" onClick={() => window.location.href = "/build-game"}>Create a new game!</button> */}
                                    <input type="submit" value="Create a new game!" className="btn btn-primary w-100"/>
                                </div>
                            </form>

                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export { AddNewGameModal }