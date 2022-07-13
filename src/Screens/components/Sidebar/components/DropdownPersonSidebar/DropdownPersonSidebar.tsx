import React from 'react'
import { Accordion } from 'react-bootstrap'
import { BsPerson, BsPersonCircle } from 'react-icons/bs'
import './../../../../../../node_modules/bootstrap/dist/js/bootstrap'
import './styles/styles.scss'

const DropdownPersonSidebar: React.FC<{ username: string }> = (props) => {
    return (
        <Accordion defaultActiveKey="0">
            <Accordion.Item eventKey="1">
                <Accordion.Header>
                    <BsPersonCircle/>
                    { props.username }
                </Accordion.Header>
                <Accordion.Body>
                    <a>Logout</a>
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    )
}

export { DropdownPersonSidebar }