import React from 'react'
import './styles/styles.scss'

const AddNewGameModal: React.FC = () => {
    return (
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
                                <label htmlFor="gameCardCollorPallete" className="form-label">Color pallete</label>
                                <select name="colorPallete" id="colorPallete" className="form-select">
                                    <option selected>Medium</option>
                                </select>
                            </div>
                        </form>

                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-primary" onClick={() => window.location.href = "/build-game"}>Create a new game!</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export { AddNewGameModal }