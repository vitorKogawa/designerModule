import React from 'react'
import { BsPersonCircle } from 'react-icons/bs'
import './../../../../../../node_modules/bootstrap/dist/js/bootstrap'
import './styles/styles.scss'

const DropdownPersonSidebar: React.FC = () => {
    return (
        <div className="accordion my-2" id="accordionExample">
            <div className="accordion-item">
                <h2 className="accordion-header" id="headingOne">
                    <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                        <BsPersonCircle />
                    </button>
                </h2>
                <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                    <div className="accordion-body">
                        <strong>This is the first item's accordion body.</strong>
                    </div>
                </div>
            </div>
        </div>
    )
}

export { DropdownPersonSidebar }