import React from 'react'
import { Link } from "react-router-dom"
import { ISidebarTopic } from "./interfaces/ISidebarTopic"
import './styles/styles.scss'

const SidebarTopic: React.FC<ISidebarTopic> = (props) => {
    return (
        <li className={`nav-item d-flex align-items-center ${props.isActive ? "active" : ""} w-100 my-1 rounded-pill`}>
            {props.icon}
            <Link to={props.path} className="nav-link">
                {props.title}
            </Link>
        </li>
    )
}

export { SidebarTopic }