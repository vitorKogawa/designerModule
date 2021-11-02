import React from 'react'
import { BsSearch } from 'react-icons/bs'
import './styles/styles.scss'

const NewReleaseSearchInput: React.FC = () => {
    return (
        <div className="input-group">
            <input
                type="text"
                name="search"
                id="search"
                placeholder="Search Papiro"
                className="form-control"
            />
            <span className="input-group-text">
                <BsSearch />
            </span>
        </div>
    )
}

export { NewReleaseSearchInput }