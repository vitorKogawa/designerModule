import React from 'react'
import { IButtonSidebar } from './interfaces/IButtonSidebar'
import './styles/styles.scss'

const ButtonSidebar: React.FC<IButtonSidebar> = (props) => {
    return (
        <button type="button" className="btn btn-primary btn-lg my-2 w-100">
            { props.label }
        </button>
    )
}

export { ButtonSidebar }