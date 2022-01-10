import React, { ChangeEvent, Fragment, useEffect, useState } from 'react'
import { api } from './../../../../services/api'
import firebase from 'firebase/app'
import { IGame } from '../../interfaces/IGame'
import { useHistory } from 'react-router-dom'
import "firebase/auth"
import './styles/styles.scss'

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
    const [logoImage, setLogoImage] = useState(null as any | null);
    const [gameCreatedId, setGameCreatedId] = useState(null as any | null);


    //fomulário -start
    const handleGameTitle = (event: ChangeEvent<HTMLInputElement>) => setGameTitle(event.target.value)
    const handleGameDescription = (event: ChangeEvent<HTMLTextAreaElement>) => setGameDescription(event.target.value)
    const handleDefaultBackground = (event: ChangeEvent<HTMLInputElement>) => setDefaultBackgroundColor(event.target.value)
    const handleColorPallete = (event: ChangeEvent<HTMLSelectElement>) => setDefaultColorPallete(event.target.value) 
    
    useEffect(() => {
        if(gameCreatedId !== null){
            history.push({
                pathname: '/editor',
                search: '?game='+gameCreatedId,
                state: {
                  gameId: gameCreatedId
                }
              })
        }
        // eslint-disable-next-line
      }, [gameCreatedId]);

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


    const handleSaveGame = async (event: SubmitEvent) => {
        event.preventDefault()
        
        const userID = firebase.auth()
        const formData = new FormData()

        formData.append("title", gameTitle);
        formData.append("description", gameDescription);
        formData.append("default_node_color", nodeColor);
        formData.append("default_text_color", textColor);
        formData.append("template", isTemplate ? 'true' : 'false');
        formData.append("background_color", getDefaultBackgroundColor);
        formData.append("background_image", backgroundImage);
        formData.append("gameImage", logoImage);

        if(userID.currentUser){
            formData.append("userID", userID.currentUser.uid);

            await api.post<IGame>(`/game/create`, formData)
            .then(response => {
                console.log(response.data)
                setGameCreatedId(response.data._id)
                sendMessage(response.data)
            })
            .catch(error => console.error(error))
        }
    }
    //formulário - end
    
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
                            <form>
                                <div className="mb-3">
                                    <input type="file" className="form-control" id="inputGameTitle" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="inputGameTitle" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="inputGameTitle" placeholder="Large" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="gameDescription" className="form-label">Description</label>
                                    <textarea className="form-control" id="gameDescription" />
                                </div>
                                <div className="f-flex flex-row mb-3">
                                    <div className="gameLogo rounded-pill">
                                        {/* <BsJoystick/> */}
                                    </div>
                                    <div className="gameContent d-flex flex-column">
                                        <label htmlFor="defaultColor" className="form-label">Default background</label>
                                        <input type="text" className="form-control" id="defaultColor" placeholder="Medium" />
                                    </div>
                                </div>
                                <div className="mb-3">
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

                                </div>
                            </form>

                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-primary w-100" onClick={() => window.location.href = "/build-game"}>Create a new game!</button>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export { AddNewGameModal }