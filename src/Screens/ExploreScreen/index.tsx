import React from 'react';
import '../../../node_modules/bootstrap/dist/css/bootstrap.css'
import { Sidebar } from './../components/Sidebar/Sidebar'


const ExploreScreen: React.FC = () => {
    return (
        <div className="container-fluid bg-primary min-vh-100">
            <div className="row">
                <div className="col bg-surface min-vh-100">
                    <Sidebar/>
                </div>

                <div className="col-8 d-flex flex-row flex-wrap justify-content-center align-items-center p-0">
                    <h1>Em desenvolvimento...</h1>
                </div>

                <div className="col bg-primary sticky-top min-vh-100 p-1">

                </div>
            </div>
        </div>
    )
}

export { ExploreScreen }