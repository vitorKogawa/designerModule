import React from 'react'
import { NewReleaseBar } from '../../../components/NewReleaseBar/NewReleaseBar'
import { Sidebar } from '../../../components/Sidebar/Sidebar'

const BuildingGame: React.FC = () => {
    return (
        <div className="container-fluid bg-surface min-vh-100">
            <div className="row">
                <div className="col bg-surface min-vh-100">
                    <Sidebar />
                </div>

                <div className="col-10 d-flex flex-column bg-primary">

                </div>
            </div>
        </div>
    )
}

export { BuildingGame }